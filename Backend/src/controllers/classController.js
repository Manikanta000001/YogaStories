const Class = require("../models/Class");
const Session = require("../models/Session");
const Booking = require("../models/Booking");

// GET /api/classes
const getClasses = async (req, res) => {
  try {
    const classes = await Class.find({ active: true }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: classes.length,
      data: classes,
    });
  } catch (error) {
    console.error("Error fetching classes:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch classes",
    });
  }
};

// GET /api/classes/admin
const getAdminClasses = async (req, res) => {
  try {
    const classes = await Class.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: classes.length,
      data: classes,
    });
  } catch (error) {
    console.error("Error fetching admin classes:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch classes",
    });
  }
};

// GET /api/classes/:id
const getClassById = async (req, res) => {
  try {
    const yogaClass = await Class.findById(req.params.id);

    if (!yogaClass) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }

    res.status(200).json({
      success: true,
      data: yogaClass,
    });
  } catch (error) {
    console.error("Error fetching class:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch class",
    });
  }
};

// POST /api/classes
const createClass = async (req, res) => {
  try {
    const {
      title,
      slug,
      description,
      duration,
      level,
      category,
      image,
      benefits,
      schedule,
    } = req.body;

    if (
  !title ||
  !slug ||
  !description ||
  duration === undefined ||
  !level ||
  !category
) {
  return res.status(400).json({
    success: false,
    message: "All required class fields must be provided",
  });
}

    const existingClass = await Class.findOne({ slug });

    if (existingClass) {
      return res.status(409).json({
        success: false,
        message: "A class with this slug already exists",
      });
    }

    const yogaClass = await Class.create({
      title,
      slug,
      description,
      duration,
      level,
      category,
      image,
      benefits,
      schedule,
    });

    res.status(201).json({
      success: true,
      message: "Class created successfully",
      data: yogaClass,
    });
  } catch (error) {
    console.error("Error creating class:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to create class",
    });
  }
};

// PATCH /api/classes/:id
const updateClass = async (req, res) => {
  try {
    const yogaClass = await Class.findById(req.params.id);

    if (!yogaClass) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }

    const {
      title,
      slug,
      description,
      duration,
      level,
      category,
      image,
      benefits,
      schedule,
      active,
    } = req.body;

    if (title !== undefined) yogaClass.title = title;
    if (slug !== undefined) yogaClass.slug = slug;
    if (description !== undefined) yogaClass.description = description;
    if (duration !== undefined) yogaClass.duration = duration;
    if (level !== undefined) yogaClass.level = level;
    if (category !== undefined) yogaClass.category = category;
    if (image !== undefined) yogaClass.image = image;
    if (benefits !== undefined) yogaClass.benefits = benefits;
    if (schedule !== undefined) yogaClass.schedule = schedule;
    if (active !== undefined) yogaClass.active = active;

    const updatedClass = await yogaClass.save();

    res.status(200).json({
      success: true,
      message: "Class updated successfully",
      data: updatedClass,
    });
  } catch (error) {
    console.error("Error updating class:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to update class",
    });
  }
};

// DELETE /api/classes/:id
const deleteClass = async (req, res) => {
  try {
    const classId = req.params.id;

    const yogaClass = await Class.findById(classId);

    if (!yogaClass) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }

    // Find all sessions belonging to this class
    const sessions = await Session.find({
      classId,
    }).select("_id");

    const sessionIds = sessions.map((session) => session._id);

    // Delete bookings related to this class/session
    await Booking.deleteMany({
      $or: [
        { classId },
        { sessionId: { $in: sessionIds } },
      ],
    });

    // Delete all sessions belonging to this class
    await Session.deleteMany({
      classId,
    });

    // Permanently delete the class
    await Class.findByIdAndDelete(classId);

    res.status(200).json({
      success: true,
      message: "Class, related sessions, and bookings deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting class:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to delete class",
    });
  }
};

module.exports = {
  getClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass,
  getAdminClasses
};