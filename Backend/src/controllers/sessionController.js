const Session = require("../models/Session");
const Class = require("../models/Class");

// POST /api/sessions
const createSession = async (req, res) => {
  try {
    const {
      classId,
      date,
      startTime,
      endTime,
      type,
      price,
      capacity,
    } = req.body;

    // Required fields
    if (!classId || !date || !startTime || !endTime) {
      return res.status(400).json({
        success: false,
        message: "classId, date, startTime and endTime are required",
      });
    }

    // Check whether the class exists
    const yogaClass = await Class.findById(classId);

    if (!yogaClass) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }

    // Free session must have zero price
    if (type === "free" && Number(price) > 0) {
      return res.status(400).json({
        success: false,
        message: "A free session cannot have a price",
      });
    }

    // Paid session should have a valid price
    if (type === "paid" && Number(price) <= 0) {
      return res.status(400).json({
        success: false,
        message: "A paid session must have a price greater than 0",
      });
    }

    // Check for duplicate session
    const existingSession = await Session.findOne({
      classId,
      date: new Date(date),
      startTime,
      endTime,
    });

    if (existingSession) {
      return res.status(409).json({
        success: false,
        message: "A session already exists for this class and time",
      });
    }

    const session = await Session.create({
      classId,
      date,
      startTime,
      endTime,
      type: type || "paid",
      price: type === "free" ? 0 : price,
      capacity: capacity || 1,
    });

    res.status(201).json({
      success: true,
      message: "Session created successfully",
      data: session,
    });
  } catch (error) {
    console.error("Error creating session:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to create session",
    });
  }
};


// GET /api/sessions
const getSessions = async (req, res) => {
  try {
    const { classId, date } = req.query;

    const filter = {};

    if (classId) {
      filter.classId = classId;
    }

    if (date) {
      filter.date = new Date(date);
    }

    const sessions = await Session.find(filter)
      .populate("classId", "title slug")
      .sort({
        date: 1,
        startTime: 1,
      });

    res.status(200).json({
      success: true,
      count: sessions.length,
      data: sessions,
    });
  } catch (error) {
    console.error("Error fetching sessions:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch sessions",
    });
  }
};


// GET /api/sessions/:id
const getSessionById = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id).populate(
      "classId",
      "title slug description"
    );

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    res.status(200).json({
      success: true,
      data: session,
    });
  } catch (error) {
    console.error("Error fetching session:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch session",
    });
  }
};


// PATCH /api/sessions/:id
const updateSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    const {
      date,
      startTime,
      endTime,
      type,
      price,
      capacity,
      status,
    } = req.body;

    if (type === "free" && price !== undefined && Number(price) > 0) {
      return res.status(400).json({
        success: false,
        message: "A free session cannot have a price",
      });
    }

    if (type === "paid" && price !== undefined && Number(price) <= 0) {
      return res.status(400).json({
        success: false,
        message: "A paid session must have a price greater than 0",
      });
    }

    if (date !== undefined) session.date = date;
    if (startTime !== undefined) session.startTime = startTime;
    if (endTime !== undefined) session.endTime = endTime;
    if (type !== undefined) session.type = type;

    if (type === "free") {
      session.price = 0;
    } else if (price !== undefined) {
      session.price = price;
    }

    if (capacity !== undefined) {
      if (capacity < session.bookedCount) {
        return res.status(400).json({
          success: false,
          message: "Capacity cannot be lower than booked count",
        });
      }

      session.capacity = capacity;
    }

    if (status !== undefined) {
      session.status = status;
    }

    const updatedSession = await session.save();

    res.status(200).json({
      success: true,
      message: "Session updated successfully",
      data: updatedSession,
    });
  } catch (error) {
    console.error("Error updating session:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to update session",
    });
  }
};


// DELETE /api/sessions/:id
const deleteSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    await Session.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Session deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting session:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to delete session",
    });
  }
};


module.exports = {
  createSession,
  getSessions,
  getSessionById,
  updateSession,
  deleteSession,
};