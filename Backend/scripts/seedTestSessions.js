const mongoose = require("mongoose");
const Session = require("../src/models/Session");
const Booking = require("../src/models/Booking");
const Class = require("../src/models/Class");
const Client = require("../src/models/Client");

const MONGO_URI = process.env.MONGODB_URI;

// Existing classes
const CLASS_IDS = [
  "6a96b5fc7da6fecd56f70df2", // Morning Flow
  "6a96b5fd7da6fecd56f70df3", // Hatha Yoga Basics
  "6a96b5fd7da6fecd56f70df4", // Power Vinyasa
];

// Existing clients
const CLIENT_IDS = [
  "6a8c475615a7336cf2aa1faa",
  "6a8ea4753c64f4b42b0ee2e4",
  "6a8ea53e3c64f4b42b0ee2ed",
];

const START_DATE = new Date("2026-08-26T00:00:00.000Z");
const END_DATE = new Date("2026-09-15T00:00:00.000Z");

const timeSlots = [
  { startTime: "07:00", endTime: "08:00" },
  { startTime: "08:30", endTime: "09:30" },
  { startTime: "10:00", endTime: "11:00" },
  { startTime: "11:30", endTime: "12:30" },
  { startTime: "17:00", endTime: "18:00" },
  { startTime: "18:30", endTime: "19:30" },
  { startTime: "19:00", endTime: "20:00" },
];

const randomItem = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffle = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const getDates = () => {
  const dates = [];

  const current = new Date(START_DATE);

  while (current <= END_DATE) {
    dates.push(new Date(current));
    current.setUTCDate(current.getUTCDate() + 1);
  }

  return dates;
};

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);

    console.log("MongoDB connected");

    // --------------------------------------------------
    // 1. VERIFY CLASSES
    // --------------------------------------------------

    const classes = await Class.find({
      _id: { $in: CLASS_IDS },
    });

    if (classes.length !== CLASS_IDS.length) {
      throw new Error(
        `Expected ${CLASS_IDS.length} classes, found ${classes.length}`
      );
    }

    console.log(`Found ${classes.length} classes`);

    // --------------------------------------------------
    // 2. VERIFY CLIENTS
    // --------------------------------------------------

    const clients = await Client.find({
      _id: { $in: CLIENT_IDS },
    });

    if (clients.length !== CLIENT_IDS.length) {
      throw new Error(
        `Expected ${CLIENT_IDS.length} clients, found ${clients.length}`
      );
    }

    console.log(`Found ${clients.length} clients`);

    // --------------------------------------------------
    // 3. DELETE OLD DATA
    // --------------------------------------------------

    console.log("Deleting existing bookings...");
    await Booking.deleteMany({});

    console.log("Deleting existing sessions...");
    await Session.deleteMany({});

    console.log("Old sessions and bookings deleted");

    // --------------------------------------------------
    // 4. CREATE SESSIONS
    // --------------------------------------------------

    const dates = getDates();

    const sessionDocuments = [];

    for (const date of dates) {
      for (const classData of classes) {
        // Randomly create 2-4 sessions for each class/day
        const numberOfSessions = randomInt(2, 4);

        const selectedSlots = shuffle(timeSlots).slice(
          0,
          numberOfSessions
        );

        for (const slot of selectedSlots) {
          const isFree = Math.random() < 0.35;

          const price = isFree
            ? 0
            : randomItem([300, 400, 500, 600, 650]);

          const capacity = randomInt(3, 8);

          // Most sessions have no bookings.
          // Some will have 1-3 bookings.
          const shouldHaveBookings = Math.random() < 0.45;

          const bookedCount = shouldHaveBookings
            ? randomInt(1, Math.min(3, capacity))
            : 0;

          // Occasionally create a manually cancelled session.
          const isCancelled = Math.random() < 0.05;

          sessionDocuments.push({
            classId: classData._id,

            date: new Date(date),

            startTime: slot.startTime,
            endTime: slot.endTime,

            type: isFree ? "free" : "paid",

            price,

            capacity,

            // This will be synchronized again after bookings
            // are created.
            bookedCount,

            status: isCancelled
              ? "cancelled"
              : bookedCount >= capacity
              ? "filled"
              : "available",
          });
        }
      }
    }

    const createdSessions = await Session.insertMany(sessionDocuments);

    console.log(`Created ${createdSessions.length} sessions`);

    // --------------------------------------------------
    // 5. CREATE BOOKINGS
    // --------------------------------------------------

    const bookingDocuments = [];

    for (const session of createdSessions) {
      // Cancelled sessions should not have active bookings
      if (session.status === "cancelled") {
        continue;
      }

      // Only some sessions receive bookings
      if (session.bookedCount === 0) {
        continue;
      }

      const shuffledClients = shuffle(clients);

      const numberOfBookings = Math.min(
        session.bookedCount,
        shuffledClients.length
      );

      for (let i = 0; i < numberOfBookings; i++) {
        const client = shuffledClients[i];

        // Determine booking status
        const status =
          Math.random() < 0.75 ? "confirmed" : "pending";

        const isFree = session.type === "free";

        bookingDocuments.push({
          clientId: client._id,

          classId: session.classId,

          sessionId: session._id,

          status,

          paymentStatus: isFree ? "not_required" : "paid",

          paymentMethod: isFree
            ? null
            : randomItem(["card", "upi", "other"]),

          amount: session.price,

          bookedAt: new Date(
            Math.max(
              START_DATE.getTime(),
              session.date.getTime() - randomInt(1, 5) * 86400000
            )
          ),

          cancelledAt: null,
        });
      }
    }

    const createdBookings = await Booking.insertMany(
      bookingDocuments
    );

    console.log(`Created ${createdBookings.length} bookings`);

    // --------------------------------------------------
    // 6. SYNCHRONIZE bookedCount WITH REAL BOOKINGS
    // --------------------------------------------------

    const bookingCounts = await Booking.aggregate([
      {
        $match: {
          status: {
            $in: ["pending", "confirmed"],
          },
        },
      },
      {
        $group: {
          _id: "$sessionId",
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    const countMap = new Map(
      bookingCounts.map((item) => [
        item._id.toString(),
        item.count,
      ])
    );

    for (const session of createdSessions) {
      const realBookedCount =
        countMap.get(session._id.toString()) || 0;

      let status = session.status;

      if (status !== "cancelled") {
        status =
          realBookedCount >= session.capacity
            ? "filled"
            : "available";
      }

      await Session.updateOne(
        { _id: session._id },
        {
          $set: {
            bookedCount: realBookedCount,
            status,
          },
        }
      );
    }

    // --------------------------------------------------
    // 7. SUMMARY
    // --------------------------------------------------

    const finalSessions = await Session.countDocuments();
    const finalBookings = await Booking.countDocuments();

    const cancelledSessions = await Session.countDocuments({
      status: "cancelled",
    });

    const filledSessions = await Session.countDocuments({
      status: "filled",
    });

    const availableSessions = await Session.countDocuments({
      status: "available",
    });

    console.log("\n------------------------------");
    console.log("SEED COMPLETE");
    console.log("------------------------------");
    console.log(`Classes:    ${classes.length}`);
    console.log(`Clients:    ${clients.length}`);
    console.log(`Sessions:   ${finalSessions}`);
    console.log(`Bookings:   ${finalBookings}`);
    console.log(`Available:  ${availableSessions}`);
    console.log(`Filled:     ${filledSessions}`);
    console.log(`Cancelled:  ${cancelledSessions}`);
    console.log("------------------------------\n");

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("SEED ERROR:", error);

    await mongoose.connection.close();
    process.exit(1);
  }
}

seed();