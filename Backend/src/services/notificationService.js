const { sendEmail } = require("./emailService");
const { sendWhatsApp } = require("./whatsappService");


// ========================================
// BOOKING CONFIRMATION
// ========================================

const sendBookingConfirmation = async ({ booking }) => {
  try {
    const client = booking.clientId;
    const yogaClass = booking.classId;
    const session = booking.sessionId;

    const formattedDate = new Date(
      session.date
    ).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });


    // ========================================
    // CLIENT EMAIL
    // ========================================

    await sendEmail({
      to: client.email,

      subject: `Booking Confirmed - ${yogaClass.title}`,

      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">

          <h2>Yoga Session Confirmed 🧘</h2>

          <p>Hi ${client.name},</p>

          <p>
            Your yoga session has been successfully booked.
          </p>

          <hr />

          <h3>${yogaClass.title}</h3>

          <p>
            <strong>Date:</strong> ${formattedDate}
          </p>

          <p>
            <strong>Time:</strong>
            ${session.startTime} - ${session.endTime}
          </p>

          <p>
            <strong>Amount:</strong>
            ₹${booking.amount}
          </p>

          <p>
            <strong>Booking ID:</strong>
            ${booking._id}
          </p>

          <hr />

          <p>
            Thank you for choosing Leena Sajja Yoga.
          </p>

          <p>
            We look forward to seeing you.
          </p>

        </div>
      `,
    });


    // ========================================
    // TRAINER EMAIL
    // ========================================

    await sendEmail({
      to: process.env.TRAINER_EMAIL,

      subject: `New Yoga Booking - ${yogaClass.title}`,

      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">

          <h2>New Yoga Booking</h2>

          <p>A new booking has been received.</p>

          <hr />

          <h3>Client Details</h3>

          <p>
            <strong>Name:</strong>
            ${client.name}
          </p>

          <p>
            <strong>Email:</strong>
            ${client.email}
          </p>

          <p>
            <strong>Phone:</strong>
            ${client.phone}
          </p>

          <hr />

          <h3>Session Details</h3>

          <p>
            <strong>Class:</strong>
            ${yogaClass.title}
          </p>

          <p>
            <strong>Date:</strong>
            ${formattedDate}
          </p>

          <p>
            <strong>Time:</strong>
            ${session.startTime} - ${session.endTime}
          </p>

          <p>
            <strong>Amount:</strong>
            ₹${booking.amount}
          </p>

          <p>
            <strong>Booking ID:</strong>
            ${booking._id}
          </p>

        </div>
      `,
    });


    // ========================================
    // WHATSAPP
    // ========================================

    await sendWhatsApp({
      phone: client.phone,

      message: `
Hi ${client.name},

Your yoga booking is confirmed.

Class: ${yogaClass.title}
Date: ${formattedDate}
Time: ${session.startTime} - ${session.endTime}
Amount: ₹${booking.amount}

Booking ID: ${booking._id}

Thank you for choosing Leena Sajja Yoga.
      `.trim(),
    });


    return {
      success: true,
    };

  } catch (error) {

    console.error(
      "Booking notification error:",
      error.message
    );

    return {
      success: false,
      message: error.message,
    };
  }
};


// ========================================
// BOOKING CANCELLATION
// ========================================

const sendBookingCancellation = async ({ booking }) => {
  try {
    const client = booking.clientId;
    const yogaClass = booking.classId;
    const session = booking.sessionId;

    const formattedDate = new Date(
      session.date
    ).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });


    // CLIENT EMAIL

    await sendEmail({
      to: client.email,

      subject: `Booking Cancelled - ${yogaClass.title}`,

      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">

          <h2>Yoga Booking Cancelled</h2>

          <p>Hi ${client.name},</p>

          <p>
            Your following yoga booking has been cancelled.
          </p>

          <hr />

          <h3>${yogaClass.title}</h3>

          <p>
            <strong>Date:</strong> ${formattedDate}
          </p>

          <p>
            <strong>Time:</strong>
            ${session.startTime} - ${session.endTime}
          </p>

          <p>
            <strong>Booking ID:</strong>
            ${booking._id}
          </p>

          <hr />

          <p>
            You can book another session whenever you are ready.
          </p>

        </div>
      `,
    });


    // WHATSAPP

    await sendWhatsApp({
      phone: client.phone,

      message: `
Hi ${client.name},

Your yoga booking has been cancelled.

Class: ${yogaClass.title}
Date: ${formattedDate}
Time: ${session.startTime} - ${session.endTime}

You can book another session whenever you are ready.
      `.trim(),
    });


    return {
      success: true,
    };

  } catch (error) {

    console.error(
      "Cancellation notification error:",
      error.message
    );

    return {
      success: false,
      message: error.message,
    };
  }
};


module.exports = {
  sendBookingConfirmation,
  sendBookingCancellation,
};