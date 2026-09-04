const {
    CASHFREE_BASE_URL,
    CASHFREE_CLIENT_ID,
    CASHFREE_CLIENT_SECRET,
} = require("../config/cashfree");

const createOrder = async (req, res) => {
    try {
        const {
            amount,
            name,
            email,
            phone
        } = req.body;
        if (!amount || amount <= 0) {
            return res.status(400).json({
                success: false,
                message: "Valid amount is required",
            });
        }

        const orderId = `yogapt_${Date.now()}`;

        const response = await fetch(`${CASHFREE_BASE_URL}/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-version": "2025-01-01",
                "x-client-id": CASHFREE_CLIENT_ID,
                "x-client-secret": CASHFREE_CLIENT_SECRET,
            },
            body: JSON.stringify({
                order_id: orderId,
                order_amount: Number(amount),
                order_currency: "INR",

                customer_details: {
                    customer_id: `yogapt_${Date.now()}`,
                    customer_name: name,
                    customer_email: email,
                    customer_phone: phone,
                },

                order_meta: {
                    return_url: `${process.env.CLIENT_URL}/?cashfree_order_id={order_id}`,
                },
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Cashfree API error:", data);

            return res.status(response.status).json({
                success: false,
                message: "Cashfree order creation failed",
                error: data,
            });
        }

        res.status(201).json({
            success: true,
            message: "Cashfree order created successfully",
            order: data,
        });
    } catch (error) {
        console.error("Cashfree order creation error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to create Cashfree order",
            error: error.message,
        });
    }
};

const verifyPayment = async (req, res) => {
    try {
        const {
            order_id
        } = req.body;

        if (!order_id) {
            return res.status(400).json({
                success: false,
                message: "order_id is required",
            });
        }

        const response = await fetch(
            `${CASHFREE_BASE_URL}/orders/${order_id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-version": "2025-01-01",
                    "x-client-id": CASHFREE_CLIENT_ID,
                    "x-client-secret": CASHFREE_CLIENT_SECRET,
                },
            }
        );

        const data = await response.json();

        if (!response.ok) {
            console.error("Cashfree verification error:", data);

            return res.status(response.status).json({
                success: false,
                message: "Failed to verify Cashfree order",
                error: data,
            });
        }

        if (data.order_status !== "PAID") {
            return res.status(400).json({
                success: false,
                message: "Payment has not been completed",
                order_status: data.order_status,
            });
        }

        return res.status(200).json({
            success: true,
            message: "Cashfree payment verified successfully",
            order_status: data.order_status,
            order_id: data.order_id,
        });
    } catch (error) {
        console.error("Cashfree verification error:", error);

        return res.status(500).json({
            success: false,
            message: "Payment verification failed",
            error: error.message,
        });
    }
};

module.exports = {
    createOrder,
    verifyPayment
};