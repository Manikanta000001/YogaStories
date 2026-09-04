const Booking = require("../models/Booking");
const Session = require("../models/Session");
const Client = require("../models/Client");
const Class = require("../models/Class");

const getDashboard = async (req, res, next) => {
    try {
        const now = new Date();

        // Start/end of today
        const startOfToday = new Date(now);
        startOfToday.setHours(0, 0, 0, 0);

        const endOfToday = new Date(now);
        endOfToday.setHours(23, 59, 59, 999);

        // --------------------------------------------------
        // BASIC STATS
        // --------------------------------------------------

        const [
            totalClasses,
            activeClasses,
            totalClients,
            totalBookings,
            pendingBookings,
        ] = await Promise.all([
            Class.countDocuments(),
            Class.countDocuments({
                active: true
            }),
            Client.countDocuments({
                active: true
            }),
            Booking.countDocuments(),
            Booking.countDocuments({
                status: "pending"
            }),
        ]);

        // --------------------------------------------------
        // BOOKING OVERVIEW
        // --------------------------------------------------

        const [
            confirmedBookings,
            cancelledBookings,
            paidBookings,
            freeBookings,
        ] = await Promise.all([
            Booking.countDocuments({
                status: "confirmed"
            }),
            Booking.countDocuments({
                status: "cancelled"
            }),
            Booking.countDocuments({
                paymentStatus: "paid"
            }),
            Booking.countDocuments({
                amount: 0
            }),
        ]);


        // --------------------------------------------------
        // REVENUE OVERVIEW
        // --------------------------------------------------

        const startOfCurrentMonth = new Date(
            now.getFullYear(),
            now.getMonth(),
            1
        );

        const startOfPreviousMonth = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            1
        );

        const startOfNextMonth = new Date(
            now.getFullYear(),
            now.getMonth() + 1,
            1
        );

        const [currentMonthRevenue, previousMonthRevenue] =
        await Promise.all([
            Booking.aggregate([{
                    $match: {
                        paymentStatus: "paid",
                        createdAt: {
                            $gte: startOfCurrentMonth,
                            $lt: startOfNextMonth,
                        },
                    },
                },
                {
                    $group: {
                        _id: null,
                        total: {
                            $sum: "$amount"
                        },
                    },
                },
            ]),

            Booking.aggregate([{
                    $match: {
                        paymentStatus: "paid",
                        createdAt: {
                            $gte: startOfPreviousMonth,
                            $lt: startOfCurrentMonth,
                        },
                    },
                },
                {
                    $group: {
                        _id: null,
                        total: {
                            $sum: "$amount"
                        },
                    },
                },
            ]),
        ]);

        const currentRevenue = currentMonthRevenue[0] ?.total || 0;
        const previousRevenue = previousMonthRevenue[0] ?.total || 0;

        let growthRate = null;

        if (previousRevenue > 0) {
            growthRate =
                ((currentRevenue - previousRevenue) / previousRevenue) * 100;
        }
        // --------------------------------------------------
        // TODAY'S SESSIONS
        // --------------------------------------------------

        const todaysSessions = await Session.find({
                date: {
                    $gte: startOfToday,
                    $lte: endOfToday,
                },
            })
            .populate("classId", "title")
            .sort({
                startTime: 1
            })
            .lean();

        const todayCapacity = todaysSessions.reduce(
            (result, session) => {
                result.total += session.capacity || 0;
                result.booked += session.bookedCount || 0;
                return result;
            }, {
                total: 0,
                booked: 0,
            }
        );

        todayCapacity.available =
            todayCapacity.total - todayCapacity.booked;

        // --------------------------------------------------
        // UPCOMING SESSIONS
        // --------------------------------------------------

        const upcomingSessions = await Session.find({
                date: {
                    $gt: endOfToday,
                },
            })
            .populate("classId", "title")
            .sort({
                date: 1,
                startTime: 1
            })
            .limit(10)
            .lean();

        // --------------------------------------------------
        // RECENT BOOKINGS
        // --------------------------------------------------

        const recentBookings = await Booking.find()
            .populate("clientId", "name email phone")
            .populate("classId", "title")
            .populate("sessionId", "date startTime endTime")
            .sort({
                createdAt: -1
            })
            .limit(8)
            .lean();

        // --------------------------------------------------
        // RESPONSE
        // --------------------------------------------------

        res.status(200).json({
            success: true,

            stats: {
                totalClasses,
                activeClasses,
                totalClients,
                totalBookings,
                pendingBookings,
            },
            bookingOverview: {
                confirmed: confirmedBookings,
                cancelled: cancelledBookings,
                paid: paidBookings,
                free: freeBookings,
            },

            revenue: {
                currentMonth: currentRevenue,
                previousMonth: previousRevenue,
                growthRate,
            },

            today: {
                sessions: todaysSessions,
                capacity: todayCapacity,
            },

            upcomingSessions,

            recentActivity: recentBookings,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getDashboard,
};