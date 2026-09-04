const express = require("express");

const {
  createBooking,
  getBookings,
  getBookingById,
  cancelBooking,
  validateBooking
} = require("../controllers/bookingController");

const router = express.Router();

router.post("/validate", validateBooking);

// Create a booking
router.post("/", createBooking);

// Get all bookings
// Optional filters:
// /api/bookings?status=confirmed
// /api/bookings?clientId=...
// /api/bookings?sessionId=...
router.get("/", getBookings);

// Get one booking
router.get("/:id", getBookingById);

// Cancel a booking
router.patch("/:id/cancel", cancelBooking);

module.exports = router;