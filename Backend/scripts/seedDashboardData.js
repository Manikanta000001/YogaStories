require("dotenv").config();

const mongoose = require("mongoose");

const Class = require("../src/models/Class");
const Session = require("../src/models/Session");

const MONGO_URI = process.env.MONGODB_URI;

// --------------------------------------------------
// CLASSES TO CREATE
// --------------------------------------------------

const classes = [
  {
    title: "Morning Flow",
    slug: "morning-flow-test",
    description:
      "A gentle morning yoga flow focused on mobility, breathing, and mindful movement.",
    duration: 60,
    level: "Beginner",
    category: "Morning Yoga",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
    benefits: [
      "Improves flexibility",
      "Reduces stress",
      "Builds mobility",
    ],
    price: 500,
    active: true,
  },

  {
    title: "Hatha Yoga Basics",
    slug: "hatha-yoga-basics-test",
    description:
      "A balanced yoga practice combining traditional postures, breathing, and mindful movement.",
    duration: 60,
    level: "Beginner",
    category: "Hatha Yoga",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80",
    benefits: [
      "Improves posture",
      "Builds strength",
      "Enhances balance",
    ],
    price: 0,
    active: true,
  },

  {
    title: "Power Vinyasa",
    slug: "power-vinyasa-test",
    description:
      "An energetic Vinyasa practice combining strength, movement, and breath.",
    duration: 60,
    level: "Intermediate",
    category: "Vinyasa",
    image:
      "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&w=800&q=80",
    benefits: [
      "Builds strength",
      "Improves endurance",
      "Increases flexibility",
    ],
    price: 650,
    active: true,
  },
];

// --------------------------------------------------
// SESSION TIMES
// 3 FREE + 2 PAID
// --------------------------------------------------

const timeSlots = [
  {
    startTime: "07:00",
    endTime: "08:00",
    type: "free",
    price: 0,
  },
  {
    startTime: "09:00",
    endTime: "10:00",
    type: "free",
    price: 0,
  },
  {
    startTime: "11:00",
    endTime: "12:00",
    type: "free",
    price: 0,
  },
  {
    startTime: "16:00",
    endTime: "17:00",
    type: "paid",
    price: 500,
  },
  {
    startTime: "18:00",
    endTime: "19:00",
    type: "paid",
    price: 650,
  },
];

// --------------------------------------------------
// DIFFERENT BOOKING COUNTS
// --------------------------------------------------

const bookedCounts = [0, 2, 5, 8, 10];

// --------------------------------------------------
// DATE HELPER
// SEPTEMBER 1 → SEPTEMBER 15
// --------------------------------------------------

const createDate = (day) => {
  const date = new Date(2026, 8, day);

  date.setHours(0, 0, 0, 0);

  return date;
};

// --------------------------------------------------
// MAIN
// --------------------------------------------------

const seedDashboardData = async () => {
  try {
    if (!MONGO_URI) {
      throw new Error(
        "MONGO_URI is undefined. Check your Backend/.env file."
      );
    }

    await mongoose.connect(MONGO_URI);

    console.log("MongoDB connected.");

    // ------------------------------------------------
    // CREATE CLASSES
    // ------------------------------------------------

    const createdClasses = [];

    for (const classData of classes) {
      const existingClass = await Class.findOne({
        slug: classData.slug,
      });

      if (existingClass) {
        console.log(
          `Class already exists: ${existingClass.title}`
        );

        createdClasses.push(existingClass);
        continue;
      }

      const newClass = await Class.create(classData);

      createdClasses.push(newClass);

      console.log(`Created class: ${newClass.title}`);
    }

    // ------------------------------------------------
    // CREATE SESSIONS
    // SEPT 1 → SEPT 15
    // ------------------------------------------------

    let sessionCount = 0;

    for (let day = 1; day <= 15; day++) {
      const date = createDate(day);

      // Rotate through the 3 classes
      const classData =
        createdClasses[(day - 1) % createdClasses.length];

      for (let i = 0; i < timeSlots.length; i++) {
        const slot = timeSlots[i];

        // Give each session a different capacity
        const capacity = 10;

        // Different booking numbers for testing
        const bookedCount =
          bookedCounts[(day + i) % bookedCounts.length];

        const status =
          bookedCount >= capacity
            ? "filled"
            : "available";

        // Prevent duplicate sessions
        const existingSession = await Session.findOne({
          classId: classData._id,
          date,
          startTime: slot.startTime,
          endTime: slot.endTime,
        });

        if (existingSession) {
          continue;
        }

        await Session.create({
          classId: classData._id,
          date,
          startTime: slot.startTime,
          endTime: slot.endTime,
          type: slot.type,
          price: slot.price,
          capacity,
          bookedCount,
          status,
        });

        sessionCount++;
      }
    }

    console.log("");
    console.log("--------------------------------");
    console.log("Dashboard test data created");
    console.log("--------------------------------");
    console.log(`Classes: ${createdClasses.length}`);
    console.log(`Sessions: ${sessionCount}`);
    console.log("Dates: September 1 - September 15");
    console.log("Slots per day: 5");
    console.log("Free slots per day: 3");
    console.log("Paid slots per day: 2");
    console.log("Capacity: 10");
    console.log("--------------------------------");
  } catch (error) {
    console.error("Failed to seed dashboard data:");
    console.error(error);
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB disconnected.");
  }
};

seedDashboardData();