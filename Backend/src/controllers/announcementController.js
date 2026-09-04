const Announcement = require("../models/Announcement");

// GET /api/announcements
// Admin: get all announcements
const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: announcements.length,
      data: announcements,
    });
  } catch (error) {
    console.error("Error fetching announcements:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch announcements",
    });
  }
};

// GET /api/announcements/:id
const getAnnouncementById = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: "Announcement not found",
      });
    }

    res.status(200).json({
      success: true,
      data: announcement,
    });
  } catch (error) {
    console.error("Error fetching announcement:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch announcement",
    });
  }
};

// GET /api/announcements/active
// Public: announcements currently visible on the website
const getActiveAnnouncements = async (req, res) => {
  try {
    const now = new Date();

    const announcements = await Announcement.find({
      status: "PUBLISHED",
      $or: [
        { scheduledFor: null },
        { scheduledFor: { $lte: now } },
      ],
    }).sort({ publishedAt: -1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: announcements.length,
      data: announcements,
    });
  } catch (error) {
    console.error(
      "Error fetching active announcements:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch active announcements",
    });
  }
};

// POST /api/announcements
const createAnnouncement = async (req, res) => {
  try {
    const {
      title,
      content,
      status,
      scheduledFor,
      author,
    } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
      });
    }

    const announcementStatus = status || "DRAFT";

    if (
      !["DRAFT", "SCHEDULED", "PUBLISHED", "ARCHIVED"].includes(
        announcementStatus
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid announcement status",
      });
    }

    if (announcementStatus === "SCHEDULED" && !scheduledFor) {
      return res.status(400).json({
        success: false,
        message: "Scheduled date is required for scheduled announcements",
      });
    }

    if (
      announcementStatus === "SCHEDULED" &&
      new Date(scheduledFor) <= new Date()
    ) {
      return res.status(400).json({
        success: false,
        message: "Scheduled date must be in the future",
      });
    }

    const announcement = await Announcement.create({
      title,
      content,
      status: announcementStatus,
      scheduledFor:
        announcementStatus === "SCHEDULED" ? scheduledFor : null,
      publishedAt:
        announcementStatus === "PUBLISHED" ? new Date() : null,
      author: author || "Leena Sajja (Admin)",
    });

    res.status(201).json({
      success: true,
      message: "Announcement created successfully",
      data: announcement,
    });
  } catch (error) {
    console.error("Error creating announcement:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to create announcement",
    });
  }
};

// PATCH /api/announcements/:id
const updateAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: "Announcement not found",
      });
    }

    const {
      title,
      content,
      status,
      scheduledFor,
      author,
    } = req.body;

    if (title !== undefined) {
      announcement.title = title;
    }

    if (content !== undefined) {
      announcement.content = content;
    }

    if (author !== undefined) {
      announcement.author = author;
    }

    if (status !== undefined) {
      if (
        !["DRAFT", "SCHEDULED", "PUBLISHED", "ARCHIVED"].includes(status)
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid announcement status",
        });
      }

      announcement.status = status;
    }

    if (scheduledFor !== undefined) {
      announcement.scheduledFor = scheduledFor;
    }

    // Handle status-specific dates
    if (announcement.status === "PUBLISHED") {
      if (!announcement.publishedAt) {
        announcement.publishedAt = new Date();
      }

      announcement.scheduledFor = null;
    }

    if (announcement.status === "DRAFT") {
      announcement.publishedAt = null;
      announcement.scheduledFor = null;
    }

    if (announcement.status === "ARCHIVED") {
      announcement.scheduledFor = null;
    }

    if (announcement.status === "SCHEDULED") {
      if (!announcement.scheduledFor) {
        return res.status(400).json({
          success: false,
          message: "Scheduled date is required",
        });
      }

      if (new Date(announcement.scheduledFor) <= new Date()) {
        return res.status(400).json({
          success: false,
          message: "Scheduled date must be in the future",
        });
      }

      announcement.publishedAt = null;
    }

    const updatedAnnouncement = await announcement.save();

    res.status(200).json({
      success: true,
      message: "Announcement updated successfully",
      data: updatedAnnouncement,
    });
  } catch (error) {
    console.error("Error updating announcement:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to update announcement",
    });
  }
};

// PATCH /api/announcements/:id/status
const updateAnnouncementStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (
      !["DRAFT", "SCHEDULED", "PUBLISHED", "ARCHIVED"].includes(status)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid announcement status",
      });
    }

    const announcement = await Announcement.findById(req.params.id);

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: "Announcement not found",
      });
    }

    if (status === "PUBLISHED") {
      announcement.status = "PUBLISHED";
      announcement.publishedAt = new Date();
      announcement.scheduledFor = null;
    }

    if (status === "DRAFT") {
      announcement.status = "DRAFT";
      announcement.publishedAt = null;
      announcement.scheduledFor = null;
    }

    if (status === "ARCHIVED") {
      announcement.status = "ARCHIVED";
      announcement.scheduledFor = null;
    }

    if (status === "SCHEDULED") {
      if (!announcement.scheduledFor) {
        return res.status(400).json({
          success: false,
          message: "Scheduled date is required",
        });
      }

      if (new Date(announcement.scheduledFor) <= new Date()) {
        return res.status(400).json({
          success: false,
          message: "Scheduled date must be in the future",
        });
      }

      announcement.status = "SCHEDULED";
      announcement.publishedAt = null;
    }

    await announcement.save();

    res.status(200).json({
      success: true,
      message: "Announcement status updated successfully",
      data: announcement,
    });
  } catch (error) {
    console.error(
      "Error updating announcement status:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to update announcement status",
    });
  }
};

// DELETE /api/announcements/:id
const deleteAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: "Announcement not found",
      });
    }

    await Announcement.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Announcement deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting announcement:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to delete announcement",
    });
  }
};

module.exports = {
  getAnnouncements,
  getAnnouncementById,
  getActiveAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  updateAnnouncementStatus,
  deleteAnnouncement,
};