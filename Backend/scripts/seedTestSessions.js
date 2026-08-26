const mongoose = require("mongoose");
require("dotenv").config();

const Session = require("../src/models/Session");

const CLASS_IDS = [
  "6a8c3719df3a61fda4bcae70",
  "6a8df708c9cb16e8a849b80f",
];

const START_DATE = new Date("2026-08-26T00:00:00.000Z");
const END_DATE = new Date("2026-08-31T00:00:00.000Z");

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
    startTime: "17:00",
    endTime: "18:00",
    type: "paid",
    price: 45,
  },
  {
    startTime: "19:00",
    endTime: "20:00",
    type: "paid",
    price: 45,
  },
];
const createSessions = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected");

    const sessions = [];

    for (const classId of CLASS_IDS) {
      for (
        let date = new Date(START_DATE);
        date <= END_DATE;
        date.setUTCDate(date.getUTCDate() + 1)
      ) {
        for (const slot of timeSlots) {
          sessions.push({
            classId,
            date: new Date(date),
            startTime: slot.startTime,
            endTime: slot.endTime,
            type: slot.type,
            price: slot.price,
            capacity: 10,
            bookedCount: 0,
            status: "available",
          });
        }
      }
    }

    const result = await Session.insertMany(sessions);

    console.log(`Created ${result.length} sessions`);

    console.log("Sessions created successfully.");
  } catch (error) {
    console.error("Failed to create sessions:", error);
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB disconnected");
  }
};

createSessions();