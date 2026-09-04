const Client = require("../models/Client");
const Booking = require("../models/Booking");
const Session = require("../models/Session");

// GET /api/clients/admin
const getAdminClients = async (req, res) => {
    try {
        const clients = await Client.find()
            .sort({ createdAt: -1 })
            .lean();

        const clientIds = clients.map((client) => client._id);

        const bookings = await Booking.find({
            clientId: { $in: clientIds },
        })
            .populate(
                "sessionId",
                "date startTime endTime type price status"
            )
            .populate(
                "classId",
                "title"
            )
            .sort({
                createdAt: -1,
            })
            .lean();

        const now = new Date();

        const getSessionDateTime = (session) => {
            if (!session?.date || !session?.startTime) {
                return null;
            }

            const date = new Date(session.date);

            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");

            return new Date(
                `${year}-${month}-${day}T${session.startTime}`
            );
        };

        const clientData = clients.map((client) => {
            const clientBookings = bookings.filter(
                (booking) =>
                    String(booking.clientId) === String(client._id)
            );

            const validBookings = clientBookings.filter(
                (booking) => booking.status !== "cancelled"
            );

            const upcomingBookings = validBookings
                .filter((booking) => {
                    const sessionDateTime =
                        getSessionDateTime(booking.sessionId);

                    return (
                        sessionDateTime &&
                        sessionDateTime > now
                    );
                })
                .sort((a, b) => {
                    const dateA =
                        getSessionDateTime(a.sessionId);

                    const dateB =
                        getSessionDateTime(b.sessionId);

                    return (
                        dateA.getTime() -
                        dateB.getTime()
                    );
                });

            const completedBookings = validBookings.filter(
                (booking) => {
                    const sessionDateTime =
                        getSessionDateTime(booking.sessionId);

                    return (
                        sessionDateTime &&
                        sessionDateTime <= now
                    );
                }
            );

            const firstBookingDate =
                clientBookings.length > 0
                    ? clientBookings.reduce(
                          (earliest, booking) => {
                              const bookingDate =
                                  new Date(
                                      booking.createdAt
                                  );

                              return bookingDate <
                                  earliest
                                  ? bookingDate
                                  : earliest;
                          },
                          new Date(
                              clientBookings[0].createdAt
                          )
                      )
                    : null;

            const lastBookingDate =
                clientBookings.length > 0
                    ? clientBookings.reduce(
                          (latest, booking) => {
                              const bookingDate =
                                  new Date(
                                      booking.createdAt
                                  );

                              return bookingDate >
                                  latest
                                  ? bookingDate
                                  : latest;
                          },
                          new Date(
                              clientBookings[0].createdAt
                          )
                      )
                    : null;

            const totalSpent =
                validBookings.reduce(
                    (total, booking) => {
                        if (
                            booking.paymentStatus ===
                            "paid"
                        ) {
                            return (
                                total +
                                (booking.amount || 0)
                            );
                        }

                        return total;
                    },
                    0
                );

            return {
                id: client._id,
                name: client.name,
                email: client.email,
                phone: client.phone,
                active: client.active,

                firstBookingDate,
                lastBookingDate,

                bookingCount:
                    upcomingBookings.length +
                    completedBookings.length,

                upcomingBookings: upcomingBookings.map(
                    (booking) => ({
                        id: booking._id,
                        className:
                            booking.classId?.title || "Unknown Class",
                        sessionId:
                            booking.sessionId?._id,
                        date:
                            booking.sessionId?.date,
                        startTime:
                            booking.sessionId?.startTime,
                        endTime:
                            booking.sessionId?.endTime,
                        type:
                            booking.sessionId?.type,
                        price:
                            booking.sessionId?.price || 0,
                        bookingStatus:
                            booking.status,
                        paymentStatus:
                            booking.paymentStatus,
                        amount:
                            booking.amount || 0,
                    })
                ),

                completedBookings:
                    completedBookings.map(
                        (booking) => ({
                            id: booking._id,
                            className:
                                booking.classId?.title ||
                                "Unknown Class",
                            sessionId:
                                booking.sessionId?._id,
                            date:
                                booking.sessionId?.date,
                            startTime:
                                booking.sessionId?.startTime,
                            endTime:
                                booking.sessionId?.endTime,
                            type:
                                booking.sessionId?.type,
                            price:
                                booking.sessionId?.price ||
                                0,
                            bookingStatus:
                                booking.status,
                            paymentStatus:
                                booking.paymentStatus,
                            amount:
                                booking.amount || 0,
                        })
                    ),

                totalSpent,
            };
        });

        res.status(200).json({
            success: true,
            count: clientData.length,
            data: clientData,
        });
    } catch (error) {
        console.error(
            "Error fetching admin clients:",
            error.message
        );

        res.status(500).json({
            success: false,
            message: "Failed to fetch clients",
        });
    }
};
// PATCH /api/clients/:id
const updateClientStatus = async (req, res) => {
    try {
        const { active } = req.body;

        if (typeof active !== "boolean") {
            return res.status(400).json({
                success: false,
                message: "Active status must be a boolean",
            });
        }

        const client = await Client.findByIdAndUpdate(
            req.params.id,
            { active },
            {  returnDocument: "after", runValidators: true }
        );

        if (!client) {
            return res.status(404).json({
                success: false,
                message: "Client not found",
            });
        }

        res.status(200).json({
            success: true,
            message: active
                ? "Client activated successfully"
                : "Client deactivated successfully",
            data: client,
        });
    } catch (error) {
        console.error(
            "Error updating client status:",
            error.message
        );

        res.status(500).json({
            success: false,
            message: "Failed to update client status",
        });
    }
};

module.exports = {
    getAdminClients,
    updateClientStatus
};