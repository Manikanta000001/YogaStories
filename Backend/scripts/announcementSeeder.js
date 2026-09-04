const Announcement = require("../src/models/Announcement");
const connectDB = require("../src/config/db");

const announcements = [
  {
    title: "Sunday Schedule Update",
    content:
      "Please note that this Sunday's morning session will begin at 8:00 AM instead of 7:00 AM. Refreshments will be served after the class.",
    status: "PUBLISHED",
    createdAt: "2026-08-27T10:32:00Z",
    publishedAt: "2026-08-27T10:40:00Z",
    scheduledFor: null,
    author: "Leena Sajja (Admin)",
  },

  {
    title: "Studio Closed — September 2",
    content:
      "The studio will be closed on September 2 for annual maintenance and staff training. Regular sessions will resume the following day.",
    status: "SCHEDULED",
    createdAt: "2026-08-28T09:15:00Z",
    publishedAt: null,
    scheduledFor: "2026-09-02T08:00:00Z",
    author: "Leena Sajja (Admin)",
  },

  {
    title: "New Power Yoga Sessions",
    content:
      "We are excited to launch high-intensity Power Yoga sessions every Tuesday and Thursday evening at 6:30 PM. Bookings open tomorrow!",
    status: "PUBLISHED",
    createdAt: "2026-08-25T14:20:00Z",
    publishedAt: "2026-08-25T15:00:00Z",
    scheduledFor: null,
    author: "Leena Sajja (Admin)",
  },

  {
    title: "Special Weekend Masterclass",
    content:
      "Exclusive 2-hour Deep Stretch & Pranayama masterclass for selected advanced practitioners. Complimentary herbal tea included.",
    status: "DRAFT",
    createdAt: "2026-08-28T11:00:00Z",
    publishedAt: null,
    scheduledFor: null,
    author: "Leena Sajja (Admin)",
  },

  {
    title: "Updated Cancellation Policy",
    content:
      "Please review the updated session cancellation guidelines: cancellations made within 4 hours of class time will count against monthly credits.",
    status: "ARCHIVED",
    createdAt: "2026-08-10T08:00:00Z",
    publishedAt: "2026-08-10T09:00:00Z",
    scheduledFor: null,
    author: "Leena Sajja (Admin)",
  },

  {
    title: "Monsoon Retreat Registration Open",
    content:
      "Join us for our annual 3-day wellness retreat in Rishikesh. Early bird discount applies to bookings confirmed before Sept 10.",
    status: "SCHEDULED",
    createdAt: "2026-08-28T16:45:00Z",
    publishedAt: null,
    scheduledFor: "2026-09-01T10:00:00Z",
    author: "Leena Sajja (Admin)",
  },
];

async function seedAnnouncements() {
  try {
    await connectDB();

    await Announcement.deleteMany({});

    await Announcement.insertMany(announcements);

    console.log("Announcements seeded successfully.");
  } catch (error) {
    console.error("Error seeding announcements:", error.message);
    process.exitCode = 1;
  } finally {
    const mongoose = require("mongoose");

    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }
  }
}

seedAnnouncements();