const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    startTime: {
      type: String,
      required: true,
      trim: true,
    },

    endTime: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["free", "paid"],
      default: "paid",
    },

    price: {
      type: Number,
      default: 0,
      min: 0,
    },

    capacity: {
      type: Number,
      default: 1,
      min: 1,
    },

    bookedCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    status: {
      type: String,
      enum: ["available", "filled", "unavailable"],
      default: "available",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Session", sessionSchema);