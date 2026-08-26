const express = require("express");

const {
  getClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass,
} = require("../controllers/classController");

const router = express.Router();

// Get all active classes
router.get("/", getClasses);

// Get one class
router.get("/:id", getClassById);

// Create a class
router.post("/", createClass);

// Update a class
router.patch("/:id", updateClass);

// Delete a class
router.delete("/:id", deleteClass);

module.exports = router;