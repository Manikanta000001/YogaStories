const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    content: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["DRAFT", "SCHEDULED", "PUBLISHED", "ARCHIVED"],
      default: "DRAFT",
    },

    scheduledFor: {
      type: Date,
      default: null,
    },

    publishedAt: {
      type: Date,
      default: null,
    },

    author: {
      type: String,
      default: "Leena Sajja (Admin)",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

announcementSchema.index({ status: 1, scheduledFor: 1 });
announcementSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Announcement", announcementSchema);