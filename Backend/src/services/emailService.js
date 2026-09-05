// const { Resend } = require("resend");

// const resend = new Resend(process.env.RESEND_API_KEY);

// const sendEmail = async ({
//   to,
//   subject,
//   html,
// }) => {
//   try {
//     console.log("Sending email...");

//     const { data, error } = await resend.emails.send({
//       from: "YogaPT <bookings@oxduel.site>",
//       to,
//       subject,
//       html,
//     });

//     if (error) {
//       console.error("Resend error:", error);

//       return {
//         success: false,
//         message: "Failed to send email",
//         error,
//       };
//     }

//     console.log("Email sent successfully:", data.id);

//     return {
//       success: true,
//       message: "Email sent successfully",
//       data,
//     };

//   } catch (error) {
//     console.error(
//       "Email service error:",
//       error.message
//     );

//     return {
//       success: false,
//       message: "Failed to send email",
//       error: error.message,
//     };
//   }
// };

// module.exports = {
//   sendEmail,
// };

const { BrevoClient } = require("@getbrevo/brevo");

const brevo = new BrevoClient({
  apiKey: process.env.BREVO_API_KEY,
});

const sendEmail = async ({
  to,
  subject,
  html,
}) => {
  try {
    console.log("Sending email via Brevo...");

    const response = await brevo.transactionalEmails.sendTransacEmail({
      sender: {
        name: "YogaStories",
        email: "vulavapatimanikanta@gmail.com",
      },

      to: [
        {
          email: to,
        },
      ],

      subject,
      htmlContent: html,
    });

    console.log(
      "Email sent successfully via Brevo:",
      response
    );

    return {
      success: true,
      message: "Email sent successfully",
      data: response,
    };

  } catch (error) {
    console.error(
      "Brevo email service error:",
      error.message
    );

    return {
      success: false,
      message: "Failed to send email",
      error: error.message,
    };
  }
};

module.exports = {
  sendEmail,
};