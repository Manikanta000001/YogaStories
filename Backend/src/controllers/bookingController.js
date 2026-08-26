const mongoose = require("mongoose");

const Booking = require("../models/Booking");
const Client = require("../models/Client");
const Session = require("../models/Session");
const Class = require("../models/Class");
const {
    sendBookingConfirmation,
} = require("../services/notificationService");
// POST /api/bookings
const createBooking = async (req, res) => {
    const dbSession = await mongoose.startSession();

    try {
        const {
            name,
            email,
            phone,
            sessionId,
            paymentMethod,
        } = req.body;

        // -----------------------------
        // 1. Validate request
        // -----------------------------

        if (!name || !email || !phone || !sessionId) {
            return res.status(400).json({
                success: false,
                message: "Name, email, phone and sessionId are required",
            });
        }

        let createdBooking;

        // -----------------------------
        // 2. Start transaction
        // -----------------------------

        await dbSession.withTransaction(async () => {

            // -----------------------------
            // 3. Find session
            // -----------------------------

            const selectedSession = await Session.findById(
                sessionId
            ).session(dbSession);

            if (!selectedSession) {
                throw new Error("SESSION_NOT_FOUND");
            }

            // -----------------------------
            // 4. Find class
            // -----------------------------

            const yogaClass = await Class.findById(
                selectedSession.classId
            ).session(dbSession);

            if (!yogaClass || !yogaClass.active) {
                throw new Error("CLASS_NOT_AVAILABLE");
            }

            // -----------------------------
            // 5. Find or create client
            // -----------------------------

            let client = await Client.findOne({
                email: email.toLowerCase().trim(),
            }).session(dbSession);

            if (!client) {
                const clients = await Client.create(
                    [{
                        name,
                        email,
                        phone,
                    }, ], {
                        session: dbSession,
                    }
                );

                client = clients[0];
            } else {
                client.name = name;
                client.phone = phone;

                await client.save({
                    session: dbSession,
                });
            }

            // -----------------------------
            // 6. Check duplicate booking
            // -----------------------------

            const existingBooking = await Booking.findOne({
                clientId: client._id,
                sessionId: selectedSession._id,
                status: {
                    $in: ["pending", "confirmed"],
                },
            }).session(dbSession);

            if (existingBooking) {
                throw new Error(
                    `DUPLICATE_BOOKING:${existingBooking._id}`
                );
            }

            // -----------------------------
            // 7. Check session status
            // -----------------------------

            if (selectedSession.status === "unavailable") {
                throw new Error("SESSION_UNAVAILABLE");
            }

            // -----------------------------
            // 8. Atomically reserve slot
            // -----------------------------

            const updatedSession =
                await Session.findOneAndUpdate({
                    _id: sessionId,
                    status: "available",

                    $expr: {
                        $lt: [
                            "$bookedCount",
                            "$capacity",
                        ],
                    },
                }, {
                    $inc: {
                        bookedCount: 1,
                    },
                }, {
                    returnDocument: "after",
                    session: dbSession,
                });

            if (!updatedSession) {
                throw new Error("SESSION_FULL");
            }

            // -----------------------------
            // 9. Determine payment
            // -----------------------------

            const isFreeSession =
                updatedSession.type === "free";

            const amount = isFreeSession ?
                0 :
                updatedSession.price;

            const paymentStatus = isFreeSession ?
                "not_required" :
                "pending";

            const bookingStatus = isFreeSession ?
                "confirmed" :
                "pending";

            // -----------------------------
            // 10. Mark session filled
            // -----------------------------

            if (
                updatedSession.bookedCount >=
                updatedSession.capacity
            ) {
                updatedSession.status = "filled";

                await updatedSession.save({
                    session: dbSession,
                });
            }

            // -----------------------------
            // 11. Create booking
            // -----------------------------

            const bookings = await Booking.create(
                [{
                    clientId: client._id,
                    classId: yogaClass._id,
                    sessionId: updatedSession._id,

                    status: bookingStatus,

                    paymentStatus,

                    paymentMethod: isFreeSession ?
                        null : paymentMethod || null,

                    amount,
                }, ], {
                    session: dbSession,
                }
            );

            createdBooking = bookings[0];
        });

        // -----------------------------
        // 12. Populate after transaction
        // -----------------------------

        const populatedBooking =
            await Booking.findById(
                createdBooking._id
            )
            .populate(
                "clientId",
                "name email phone"
            )
            .populate(
                "classId",
                "title slug"
            )
            .populate(
                "sessionId",
                "date startTime endTime type price"
            );

        // -----------------------------
        // 13. Response
        // -----------------------------
        await sendBookingConfirmation({
            booking: populatedBooking,
        });
        res.status(201).json({
            success: true,
            message: populatedBooking.paymentStatus ===
                "not_required" ?
                "Free session booked successfully" : "Booking created successfully",
            data: populatedBooking,
        });

    } catch (error) {

        console.error(
            "Error creating booking:",
            error.message
        );

        // -----------------------------
        // Handle known errors
        // -----------------------------

        if (
            error.message ===
            "SESSION_NOT_FOUND"
        ) {
            return res.status(404).json({
                success: false,
                message: "Session not found",
            });
        }

        if (
            error.message ===
            "CLASS_NOT_AVAILABLE"
        ) {
            return res.status(404).json({
                success: false,
                message: "Class is not available",
            });
        }

        if (
            error.message ===
            "SESSION_UNAVAILABLE"
        ) {
            return res.status(400).json({
                success: false,
                message: "This session is currently unavailable",
            });
        }

        if (
            error.message ===
            "SESSION_FULL"
        ) {
            return res.status(400).json({
                success: false,
                message: "This session is already full",
            });
        }

        if (
            error.message.startsWith(
                "DUPLICATE_BOOKING:"
            )
        ) {
            const bookingId =
                error.message.split(":")[1];

            return res.status(409).json({
                success: false,
                message: "You already have a booking for this session",
                data: {
                    bookingId,
                },
            });
        }

        // -----------------------------
        // MongoDB transaction error
        // -----------------------------

        res.status(500).json({
            success: false,
            message: "Failed to create booking",
        });

    } finally {
        await dbSession.endSession();
    }
};


// GET /api/bookings
const getBookings = async (req, res) => {
    try {
        const {
            status,
            clientId,
            sessionId,
        } = req.query;

        const filter = {};

        if (status) {
            filter.status = status;
        }

        if (clientId) {
            filter.clientId = clientId;
        }

        if (sessionId) {
            filter.sessionId = sessionId;
        }

        const bookings = await Booking.find(filter)
            .populate("clientId", "name email phone")
            .populate("classId", "title slug")
            .populate(
                "sessionId",
                "date startTime endTime type price"
            )
            .sort({
                createdAt: -1,
            });

        res.status(200).json({
            success: true,
            count: bookings.length,
            data: bookings,
        });
    } catch (error) {
        console.error(
            "Error fetching bookings:",
            error.message
        );

        res.status(500).json({
            success: false,
            message: "Failed to fetch bookings",
        });
    }
};


// GET /api/bookings/:id
const getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate("clientId", "name email phone")
            .populate("classId", "title slug")
            .populate(
                "sessionId",
                "date startTime endTime type price"
            );

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found",
            });
        }

        res.status(200).json({
            success: true,
            data: booking,
        });
    } catch (error) {
        console.error(
            "Error fetching booking:",
            error.message
        );

        res.status(500).json({
            success: false,
            message: "Failed to fetch booking",
        });
    }
};


// PATCH /api/bookings/:id/cancel
const cancelBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(
            req.params.id
        );

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found",
            });
        }

        if (booking.status === "cancelled") {
            return res.status(400).json({
                success: false,
                message: "Booking is already cancelled",
            });
        }

        if (booking.status === "completed") {
            return res.status(400).json({
                success: false,
                message: "Completed bookings cannot be cancelled",
            });
        }

        const selectedSession = await Session.findById(
            booking.sessionId
        );

        booking.status = "cancelled";
        booking.cancelledAt = new Date();

        await booking.save();

        if (selectedSession) {
            if (selectedSession.bookedCount > 0) {
                selectedSession.bookedCount -= 1;
            }

            if (
                selectedSession.status === "filled" &&
                selectedSession.bookedCount <
                selectedSession.capacity
            ) {
                selectedSession.status = "available";
            }

            await selectedSession.save();
        }

        res.status(200).json({
            success: true,
            message: "Booking cancelled successfully",
            data: booking,
        });
    } catch (error) {
        console.error(
            "Error cancelling booking:",
            error.message
        );

        res.status(500).json({
            success: false,
            message: "Failed to cancel booking",
        });
    }
};


module.exports = {
    createBooking,
    getBookings,
    getBookingById,
    cancelBooking,
};