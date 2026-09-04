const express = require("express");

const {
  getAnnouncements,
  getAnnouncementById,
  getActiveAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  updateAnnouncementStatus,
  deleteAnnouncement,
} = require("../controllers/announcementController");

const router = express.Router();

// Public announcements
router.get("/active", getActiveAnnouncements);

// Admin announcements
router.get("/", getAnnouncements);
router.get("/:id", getAnnouncementById);

router.post("/", createAnnouncement);

router.patch("/:id/status", updateAnnouncementStatus);
router.patch("/:id", updateAnnouncement);

router.delete("/:id", deleteAnnouncement);

module.exports = router;