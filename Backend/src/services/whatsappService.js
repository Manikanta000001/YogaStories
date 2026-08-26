const sendWhatsApp = async ({
  phone,
  message,
}) => {
  try {
    console.log("WhatsApp notification requested");

    console.log({
      phone,
      message,
    });

    // WhatsApp provider will be implemented here.
    // Provider will be decided later.

    return {
      success: true,
      message: "WhatsApp notification queued",
    };
  } catch (error) {
    console.error(
      "WhatsApp service error:",
      error.message
    );

    return {
      success: false,
      message: "Failed to send WhatsApp message",
      error: error.message,
    };
  }
};

module.exports = {
  sendWhatsApp,
};