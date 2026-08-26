const express = require("express");

const {
  createSession,
  getSessions,
  getSessionById,
  updateSession,
  deleteSession,
} = require("../controllers/sessionController");

const router = express.Router();

// Create a session
router.post("/", createSession);

// Get sessions
// Optional filters:
// /api/sessions?classId=...
// /api/sessions?date=...
// /api/sessions?classId=...&date=...
router.get("/", getSessions);

// Get one session
router.get("/:id", getSessionById);

// Update a session
router.patch("/:id", updateSession);

// Delete a session
router.delete("/:id", deleteSession);

module.exports = router;