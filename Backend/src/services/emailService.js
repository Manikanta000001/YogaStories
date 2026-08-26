const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({
  to,
  subject,
  html,
}) => {
  try {
    console.log("Sending email...");

    const { data, error } = await resend.emails.send({
      from: "YogaPT <onboarding@resend.dev>",
      to,
      subject,
      html,
    });

    if (error) {
      console.error("Resend error:", error);

      return {
        success: false,
        message: "Failed to send email",
        error,
      };
    }

    console.log("Email sent successfully:", data.id);

    return {
      success: true,
      message: "Email sent successfully",
      data,
    };

  } catch (error) {
    console.error(
      "Email service error:",
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