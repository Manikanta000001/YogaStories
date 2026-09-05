const {
  sendEmail
} = require("./emailService");
const {
  sendWhatsApp
} = require("./whatsappService");


// ========================================
// BOOKING CONFIRMATION
// ========================================

const sendBookingConfirmation = async ({
  booking
}) => {
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
     
 <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="light" />
  <meta name="supported-color-schemes" content="light" />
  <title>Your Yoga Session is Confirmed - YogaStories</title>
  <style type="text/css">
    /* Resets and Client Fixes */
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
    table { border-collapse: collapse !important; }
    body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: #F4F1EA; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
    
    /* Responsive email styling */
    .booking-id {
      display: inline-block;
      font-size: 11px !important;
      line-height: 16px !important;
      max-width: 100%;
      word-break: break-all !important;
      overflow-wrap: anywhere !important;
      white-space: normal !important;
    }

    .hero-image {
      display: block !important;
      width: 100% !important;
      max-width: 480px !important;
      height: auto !important;
      margin: 0 auto 6% auto !important;
      border-radius: 40px !important;
    }

    @media screen and (max-width: 620px) {
      body {
        background-color: #FAF8F5 !important;
        width: 100% !important;
        min-width: 100% !important;
      }

      .email-container {
        width: 100% !important;
        max-width: 100% !important;
        border-radius: 0 !important;
        border: 0 !important;
        box-shadow: none !important;
      }

      .mobile-padding {
        padding-left: 16px !important;
        padding-right: 16px !important;
      }

      .hero-title {
        font-size: 25px !important;
        line-height: 32px !important;
      }

      .hero-image {
        width: 100% !important;
        max-width: 100% !important;
        height: auto !important;
        margin: 0 auto 16px auto !important;
        border-radius: 22px !important;
      }

      .col-half {
        display: block !important;
        width: 100% !important;
        max-width: 100% !important;
        box-sizing: border-box !important;
      }

      .mobile-gap {
        display: block !important;
        width: 100% !important;
        height: 10px !important;
        padding: 0 !important;
      }

      .mobile-stack {
        display: block !important;
        width: 100% !important;
      }

      .card-header-main,
      .card-header-status,
      .booking-meta-left,
      .booking-meta-right {
        display: block !important;
        width: 100% !important;
        max-width: 100% !important;
        box-sizing: border-box !important;
        text-align: left !important;
      }

      .card-header-status {
        padding-top: 10px !important;
      }

      .card-header-status table {
        margin: 0 !important;
      }

      .booking-meta-right {
        padding-top: 12px !important;
      }

      .mobile-card {
        border-radius: 14px !important;
      }

      .mobile-tip-title {
        font-size: 14px !important;
        line-height: 20px !important;
      }

      .mobile-tip-copy {
        font-size: 13px !important;
        line-height: 19px !important;
      }

      .mobile-footer {
        padding-left: 16px !important;
        padding-right: 16px !important;
        padding-bottom: 28px !important;
      }

      .social-cell {
        padding-left: 6px !important;
        padding-right: 6px !important;
      }

      .footer-links {
        font-size: 12px !important;
        line-height: 22px !important;
      }

      .footer-legal {
        font-size: 10px !important;
        line-height: 17px !important;
      }

      .wave-divider {
        height: 24px !important;
      }
    }

    @media screen and (max-width: 390px) {
      .mobile-padding {
        padding-left: 14px !important;
        padding-right: 14px !important;
      }

      .hero-title {
        font-size: 23px !important;
        line-height: 30px !important;
      }

      .hero-image {
        border-radius: 18px !important;
      }

      .booking-id {
        font-size: 10px !important;
        line-height: 15px !important;
      }

      .mobile-footer {
        padding-left: 14px !important;
        padding-right: 14px !important;
      }
    }

    @media screen and (max-width: 340px) {
      .mobile-padding {
        padding-left: 12px !important;
        padding-right: 12px !important;
      }

      .hero-title {
        font-size: 21px !important;
        line-height: 28px !important;
      }

      .card-header-main span:last-child {
        font-size: 16px !important;
        line-height: 22px !important;
      }
    }

</style>
</head>
<body style="margin: 0; padding: 0; background-color: #F4F1EA; color: #2B3A33; -webkit-font-smoothing: antialiased;">
  <!-- Hidden Preheader text -->
  <div style="display: none; font-size: 1px; color: #F4F1EA; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
    Namaste ${client.name}, your ${yogaClass.title} session with {{instructorName}} is confirmed for ${formattedDate}. View full booking details inside.
    &#847; &zwnj; &nbsp; &#8199; &shy;
  </div>

  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #F4F1EA; min-height: 100vh;">
    <tr>
      <td align="center" >

        <!-- Container (Max 600px width) -->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" class="email-container" style="max-width: 600px; background-color: #FAF8F5; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 30px rgba(43, 58, 51, 0.08); border: 1px solid #EBE5DB;">

          <tr>
            <td align="center" style="padding: 34px 20px 16px 20px; background-color: #FAF8F5;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" valign="middle">
                    <!-- Brand Icon: Minimalist Yoga Lotus SVG -->
                    <img
  src="https://yogastories.vercel.app/favicon.png"
  width="34"
  height="34"
  alt="YogaStories"
  style="display:block; border:0; outline:none; text-decoration:none;"
/>
                  </td>
                  <td valign="middle" style="padding-left: 10px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 22px; font-weight: 700; letter-spacing: 0.8px; color: #2B3A33;">
                    Yoga<span style="color: #4A7A64;">Stories</span>
                  </td>
                </tr>
              </table>
              <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 2.5px; color: #8A978F; margin-top: 4px; font-weight: 500;">
                Mind &bull; Body &bull; Balance
              </div>
            </td>
          </tr>

          <tr>
            <td align="center" class="mobile-padding" style="padding: 16px 36px 4px 36px;">
              <!-- Status Pill Badge -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 14px;">
                <tr>
                  <td style="background-color: #E6EFEA; padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: 600; color: #2D5A47; letter-spacing: 0.5px; text-transform: uppercase;">
                    &#10003;&nbsp; Session Confirmed
                  </td>
                </tr>
              </table>

              <!-- Main Heading -->
              <h1 class="hero-title" style="margin: 0 0 10px 0; font-size: 28px; line-height: 36px; font-weight: 700; color: #1E2D26; letter-spacing: -0.3px;">
                Your yoga session is confirmed!
              </h1>
              <p style="margin: 0 auto; max-width: 440px; font-size: 15px; line-height: 23px; color: #5C6B63;">
                Namaste <strong style="color: #2B3A33;">${client.name}</strong>. Your mat is unrolled and your spot has been reserved. We are excited to support you on your wellness journey.
              </p>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding: 18px 20px 0 20px;">
              <div style="max-width: 480px; margin: 0 auto;">
  <img class="hero-image"
                    src="https://yogastories.vercel.app/YogaPose.png"
                    alt="Yoga meditation"
                    width="520"
                    style="
                      display: block;
                      width: 100%;
                      max-width: 520px;
                      height: auto;
                      border: 0;
                      margin-top: auto;
                      margin-bottom: 6%;
                      margin-left: 0;
                      margin-right: 0;
                      border-radius: 40px;
                    "
                  />
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding: 0; line-height: 0; font-size: 0;">
              <!-- Fluid Wave SVG divider connecting hero to booking body -->
              <svg width="100%" height="38" viewBox="0 0 600 38" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg" style="display: block;">
                <path d="M0 12C95 28 185 36 295 24C410 12 510 16 600 28V38H0V12Z" fill="#F4EDE4" />
                <path d="M0 24C120 36 210 32 315 20C420 8 505 14 600 22V38H0V24Z" fill="#EFE8DE" />
              </svg>
            </td>
          </tr>

          <tr>
            <td class="mobile-padding" style="padding: 24px 36px 16px 36px; background-color: #EFE8DE;">
              <!-- Outer Card Box -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" class="mobile-card" style="background-color: #FFFFFF; border-radius: 18px; border: 1px solid #E3D9CC; box-shadow: 0 4px 16px rgba(43, 58, 51, 0.05); overflow: hidden;">
                
                <!-- Card Header -->
                <tr>
                  <td style="background-color: #365C4B; padding: 18px 24px;">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td align="left" valign="middle" class="card-header-main">
                          <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 1.8px; color: #B3D1C2; font-weight: 600; display: block;">Session Reservation</span>
                          <span style="font-size: 18px; font-weight: 700; color: #FFFFFF; letter-spacing: -0.2px;">${yogaClass.title}</span>
                        </td>
                        <td align="right" valign="middle" class="card-header-status">
                          <!-- Payment Status Tag -->
                          <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="background-color: rgba(255,255,255,0.18);  border-radius: 20px; padding: 5px 12px; font-size: 12px; color: #FFFFFF; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                                &#9679;&nbsp;${booking.paymentStatus}
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Card Key-Value Grid -->
                <tr>
                  <td style="padding: 22px 24px 8px 24px;">
                    
                    <!-- Row 1: Date & Time -->
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 14px;">
                      <tr>
                        <!-- Date Block -->
                        <td width="48%" class="col-half" valign="top" style="background-color: #F8F6F2; border-radius: 12px; padding: 12px 14px; border: 1px solid #EFEAE0;">
                          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                              <td width="28" valign="top">
                                <!-- Calendar SVG -->
                             <img
  src="https://img.icons8.com/material-outlined/48/4A7A64/calendar.png"
  width="22"
  height="22"
  alt="Date"
  style="display:block; border:0; outline:none; text-decoration:none;"
/>
                              </td>
                              <td valign="top" style="padding-left: 8px;">
                                <div style="font-size: 11px; text-transform: uppercase; color: #7B8A82; font-weight: 600; letter-spacing: 0.5px;">Date</div>
                                <div style="font-size: 14px; font-weight: 700; color: #1E2D26; margin-top: 2px;">${formattedDate}</div>
                              </td>
                            </tr>
                          </table>
                        </td>

                        <td width="4%" class="col-half mobile-gap" style="font-size: 1px; line-height: 1px;">&nbsp;</td>

                        <!-- Time Block -->
                        <td width="48%" class="col-half" valign="top" style="background-color: #F8F6F2; border-radius: 12px; padding: 12px 14px; border: 1px solid #EFEAE0;">
                          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                              <td width="28" valign="top">
                                <!-- Clock SVG -->
                              <img
  src="https://img.icons8.com/material-outlined/48/4A7A64/clock.png"
  width="22"
  height="22"
  alt="Time"
  style="display:block; border:0; outline:none; text-decoration:none;"
/>
                              </td>
                              <td valign="top" style="padding-left: 8px;">
                                <div style="font-size: 11px; text-transform: uppercase; color: #7B8A82; font-weight: 600; letter-spacing: 0.5px;">Time</div>
                                <div style="font-size: 14px; font-weight: 700; color: #1E2D26; margin-top: 2px;">${session.startTime} &ndash; ${session.endTime}</div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <!-- Row 2: Instructor & Customer -->
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 14px;">
                      <tr>
                        <!-- Instructor Block -->
                        <td width="48%" class="col-half" valign="top" style="background-color: #F8F6F2; border-radius: 12px; padding: 12px 14px; border: 1px solid #EFEAE0;">
                          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                              <td width="28" valign="top">
                                <!-- Teacher/User SVG -->
            <img
  src="https://img.icons8.com/material-outlined/48/4A7A64/user.png"
  width="22"
  height="22"
  alt="Instructor"
  style="display:block; border:0; outline:none; text-decoration:none;"
/>
                              </td>
                              <td valign="top" style="padding-left: 8px;">
                                <div style="font-size: 11px; text-transform: uppercase; color: #7B8A82; font-weight: 600; letter-spacing: 0.5px;">Instructor</div>
                                <div style="font-size: 14px; font-weight: 700; color: #1E2D26; margin-top: 2px;">Leena Sajja</div>
                              </td>
                            </tr>
                          </table>
                        </td>

                        <td width="4%" class="col-half mobile-gap" style="font-size: 1px; line-height: 1px;">&nbsp;</td>

                        <!-- Customer Block -->
                        <td width="48%" class="col-half" valign="top" style="background-color: #F8F6F2; border-radius: 12px; padding: 12px 14px; border: 1px solid #EFEAE0;">
                          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                              <td width="28" valign="top">
                                <!-- Lotus icon -->
<img
  src="https://yogastories.vercel.app/favicon.png"
  width="22"
  height="22"
  alt="Practitioner"
  style="display:block; border:0; outline:none; text-decoration:none;"
/>
                              </td>
                              <td valign="top" style="padding-left: 8px;">
                                <div style="font-size: 11px; text-transform: uppercase; color: #7B8A82; font-weight: 600; letter-spacing: 0.5px;">Practitioner</div>
                                <div style="font-size: 14px; font-weight: 700; color: #1E2D26; margin-top: 2px;">${client.name}</div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <!-- Divider within card -->
                    <div style="border-top: 1px dashed #DCD4C7; margin: 4px 0 14px 0;"></div>

                    <!-- Row 3: Booking ID & Amount Paid -->
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 8px;">
                      <tr>
                        <td align="left" valign="middle" class="booking-meta-left">
                          <span style="font-size: 11px; text-transform: uppercase; color: #7B8A82; font-weight: 600; letter-spacing: 0.6px; display: block;">Booking Reference</span>
                          <span class="booking-id" style="font-size: 13px; font-family: 'SF Mono', Consolas, Monaco, monospace; color: #365C4B; font-weight: 600;">#${booking._id}</span>
                        </td>
                        <td align="right" valign="middle" class="booking-meta-right">
                          <span style="font-size: 11px; text-transform: uppercase; color: #7B8A82; font-weight: 600; letter-spacing: 0.6px; display: block;">Total Paid</span>
                          <span style="font-size: 18px; font-weight: 800; color: #23382D;">₹${booking.amount}</span>
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>

                <!-- CTA Action row inside card container -->
            

              </table>
            </td>
          </tr>

          <tr>
            <td style="padding: 0; line-height: 0; font-size: 0; background-color: #EFE8DE;">
              <svg width="100%" height="32" viewBox="0 0 600 32" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg" style="display: block;">
                <path d="M0 0C120 18 240 26 360 16C460 7 540 12 600 24V32H0V0Z" fill="#FAF8F5" />
              </svg>
            </td>
          </tr>

          <tr>
            <td class="mobile-padding" style="padding: 12px 36px 28px 36px; background-color: #FAF8F5;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" style="padding-bottom: 16px;">
                    <span style="font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: #9A7B66; font-weight: 700; display: block;">Preparing For Your Practice</span>
                    <h3 style="margin: 4px 0 0 0; font-size: 18px; color: #1E2D26; font-weight: 700;">Arrive Centered &amp; Ready</h3>
                  </td>
                </tr>
                <tr>
                  <td>
                    <!-- 3 Mindful Steps / Tips -->
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                      <!-- Tip 1 -->
                      <tr>
                        <td width="42" valign="top" style="padding: 8px 0;">
                          <div style="width: 32px; height: 32px; border-radius: 50%; background-color: #EBF3EF; text-align: center; line-height: 32px; color: #365C4B; font-weight: 700; font-size: 13px;">
                            1
                          </div>
                        </td>
                        <td valign="top" style="padding: 8px 0 14px 6px;">
                          <div class="mobile-tip-title" style="font-size: 14px; font-weight: 700; color: #2B3A33;">Arrive 5–10 minutes early</div>
                          <div class="mobile-tip-copy" style="font-size: 13px; color: #64736C; line-height: 19px; margin-top: 2px;">Take a moment to disconnect from screens, settle into your mat, and calm your breath.</div>
                        </td>
                      </tr>
                      <!-- Tip 2 -->
                      <tr>
                        <td width="42" valign="top" style="padding: 8px 0;">
                          <div style="width: 32px; height: 32px; border-radius: 50%; background-color: #F8EFE9; text-align: center; line-height: 32px; color: #C28D75; font-weight: 700; font-size: 13px;">
                            2
                          </div>
                        </td>
                        <td valign="top" style="padding: 8px 0 14px 6px;">
                          <div class="mobile-tip-title" style="font-size: 14px; font-weight: 700; color: #2B3A33;">Wear comfortable layers</div>
                          <div class="mobile-tip-copy" style="font-size: 13px; color: #64736C; line-height: 19px; margin-top: 2px;">Wear breathable apparel and keep a water bottle and a warm layer nearby for Savasana.</div>
                        </td>
                      </tr>
                      <!-- Tip 3 -->
                      <tr>
                        <td width="42" valign="top" style="padding: 8px 0;">
                          <div style="width: 32px; height: 32px; border-radius: 50%; background-color: #EBF3EF; text-align: center; line-height: 32px; color: #365C4B; font-weight: 700; font-size: 13px;">
                            3
                          </div>
                        </td>
                        <td valign="top" style="padding: 8px 0 8px 6px;">
                          <div class="mobile-tip-title" style="font-size: 14px; font-weight: 700; color: #2B3A33;">Honor your body</div>
                          <div class="mobile-tip-copy" style="font-size: 13px; color: #64736C; line-height: 19px; margin-top: 2px;">Yoga is a personal exploration, not a competition. Listen to your body and rest whenever needed.</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding: 0; line-height: 0; font-size: 0; background-color: #FAF8F5;">
              <svg width="100%" height="42" viewBox="0 0 600 42" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg" style="display: block;">
                <path d="M0 18C140 34 260 12 390 28C470 38 540 24 600 14V42H0V18Z" fill="#20332B" />
              </svg>
            </td>
          </tr>

          <tr>
            <td class="mobile-padding mobile-footer" style="background-color: #20332B; padding: 20px 36px 36px 36px; text-align: center;">
              
              <!-- Footer YogaStories logo and tagline -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center" style="margin: 0 auto 16px auto;">
                <tr>
                  <td align="center" valign="middle">
<img
  src="https://yogastories.vercel.app/favicon.png"
  width="24"
  height="24"
  alt="YogaStories"
  style="display:block; border:0; outline:none; text-decoration:none;"
/>
                  </td>
                  <td valign="middle" style="padding-left: 8px; font-size: 18px; font-weight: 700; color: #FAF8F5; letter-spacing: 0.5px;">
                    Yoga<span style="color: #8EB7A3;">Stories</span>
                  </td>
                </tr>
              </table>

              <!-- Social Media SVG Icons -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center" style="margin: 0 auto 20px auto;">
                <tr>
                  <!-- Instagram -->
                  <td class="social-cell" style="padding: 0 8px;">
                    <a href="https://yogapt.example.com" target="_blank" style="text-decoration: none; display: inline-block;">
<img
  src="https://img.icons8.com/material-outlined/48/E2EBE5/instagram.png"
  width="30"
  height="30"
  alt="Instagram"
  style="display:block; border:0; outline:none; text-decoration:none;"
/>
                    </a>
                  </td>
                  <!-- Facebook -->
                  <td class="social-cell" style="padding: 0 8px;">
                    <a href="https://yogapt.example.com" target="_blank" style="text-decoration: none; display: inline-block;">
<img
  src="https://img.icons8.com/material-outlined/48/E2EBE5/facebook.png"
  width="30"
  height="30"
  alt="Facebook"
  style="display:block; border:0; outline:none; text-decoration:none;"
/>
                    </a>
                  </td>
                  <!-- Youtube / Video Classes -->
                  <td class="social-cell" style="padding: 0 8px;">
                    <a href="https://yogapt.example.com" target="_blank" style="text-decoration: none; display: inline-block;">
<img
  src="https://img.icons8.com/material-outlined/48/E2EBE5/youtube.png"
  width="30"
  height="30"
  alt="YouTube"
  style="display:block; border:0; outline:none; text-decoration:none;"
/>
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Footer Navigation Links -->
              <p class="footer-links" style="margin: 0 0 14px 0; font-size: 13px; color: #9FB5A9; line-height: 20px;">
                <a href="{{bookingUrl}}" style="color: #D6E3DC; text-decoration: none; font-weight: 500;">Manage Booking</a>
                &nbsp;&bull;&nbsp;
                <a href="https://yogapt.example.com/classes" style="color: #D6E3DC; text-decoration: none; font-weight: 500;">Class Schedule</a>
                &nbsp;&bull;&nbsp;
                <a href="https://yogapt.example.com/help" style="color: #D6E3DC; text-decoration: none; font-weight: 500;">Support</a>
              </p>

              <!-- Footer Legal / Unsubscribe Note -->
              <p class="footer-legal" style="margin: 0; font-size: 11px; color: #738C7F; line-height: 18px;">
                You received this email because you booked a class on YogaStories.<br/>
                &copy; 2026 YogaStories Inc. All rights reserved. Peace, wellness, and mindful practice.
              </p>

            </td>
          </tr>

        </table>
        <!-- End Container -->

      </td>
    </tr>
  </table>
</body>
</html>
      
      
      
      `,
    });


    // ========================================
    // TRAINER EMAIL
    // ========================================

    await sendEmail({
      to: process.env.TRAINER_EMAIL,

      subject: `New Yoga Booking - ${yogaClass.title}`,

      html: `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="color-scheme" content="light" />
    <meta name="supported-color-schemes" content="light" />
    <title>Admin Notification: New Yoga Booking - YogaStories</title>
    <style type="text/css">
      /* Email resets and client normalization */
      body,
      table,
      td,
      a {
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }
      table,
      td {
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
      }
      img {
        -ms-interpolation-mode: bicubic;
        border: 0;
        outline: none;
        text-decoration: none;
      }
      table {
        border-collapse: collapse !important;
      }
      body {
        height: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
        width: 100% !important;
        background-color: #f4f1ea;
        font-family:
          -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
          Arial, sans-serif;
      }

      /* Highly responsive email adaptation */
      @media screen and (max-width: 620px) {
        body {
          background-color: #faf8f5 !important;
        }
        body > table > tbody > tr > td {
          padding-top: 0 !important;
          padding-bottom: 0 !important;
        }

        .email-container {
          width: 100% !important;
          max-width: 100% !important;
          border-radius: 0 !important;
          border: 0 !important;
          box-shadow: none !important;
        }

        .mobile-padding {
          padding-left: 16px !important;
          padding-right: 16px !important;
        }

        .hero-title {
          font-size: 24px !important;
          line-height: 31px !important;
        }

        .col-half {
          display: block !important;
          width: 100% !important;
          max-width: 100% !important;
          box-sizing: border-box !important;
        }

        .mobile-gap {
          display: block !important;
          width: 100% !important;
          height: 12px !important;
        }

        .booking-id-mono {
          display: block !important;
          width: 100% !important;
          box-sizing: border-box !important;
          font-size: 10px !important;
          line-height: 15px !important;
          word-break: break-all !important;
          overflow-wrap: anywhere !important;
          white-space: normal !important;
        }

        .peace-illustration {
          height: 125px !important;
        }

        .mobile-card {
          border-radius: 14px !important;
        }

        .mobile-card-padding {
          padding-left: 16px !important;
          padding-right: 16px !important;
        }

        .mobile-header-stack {
          display: block !important;
          width: 100% !important;
        }

        .mobile-header-status {
          display: block !important;
          width: 100% !important;
          padding-top: 10px !important;
          text-align: left !important;
        }

        .mobile-header-status table {
          margin-left: 0 !important;
        }

        .mobile-tight {
          padding-top: 12px !important;
          padding-bottom: 12px !important;
        }

        .mobile-small {
          font-size: 13px !important;
          line-height: 19px !important;
        }

        .mobile-label {
          font-size: 10px !important;
        }

        .mobile-value {
          font-size: 13px !important;
          line-height: 18px !important;
        }

        .mobile-footer {
          padding-bottom: 28px !important;
        }
      }

      @media screen and (max-width: 390px) {
        .mobile-padding {
          padding-left: 14px !important;
          padding-right: 14px !important;
        }

        .hero-title {
          font-size: 22px !important;
          line-height: 29px !important;
        }

        .mobile-card-padding {
          padding-left: 14px !important;
          padding-right: 14px !important;
        }

        .peace-illustration {
          height: 112px !important;
        }

        .booking-id-mono {
          font-size: 9px !important;
          line-height: 14px !important;
        }
      }
    </style>
  </head>
  <body
    style="
      margin: 0;
      padding: 0;
      background-color: #f4f1ea;
      color: #2b3a33;
      -webkit-font-smoothing: antialiased;
    "
  >
    <!-- Inbox Preheader Preview -->
    <div
      style="
        display: none;
        font-size: 1px;
        color: #f4f1ea;
        line-height: 1px;
        max-height: 0px;
        max-width: 0px;
        opacity: 0;
        overflow: hidden;
      "
    >
      [New Booking] ${client.name} has reserved ${yogaClass.title} on
      ${formattedDate} (${session.startTime} - ${session.endTime}). &#847;
      &zwnj; &nbsp; &#8199; &shy;
    </div>

    <table
      role="presentation"
      border="0"
      cellpadding="0"
      cellspacing="0"
      width="100%"
      style="background-color: #f4f1ea; min-height: 100vh"
    >
      <tr>
        <td align="center" style="padding: 24px 0">
          <table
            role="presentation"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            class="email-container"
            style="
              max-width: 600px;
              background-color: #faf8f5;
              border-radius: 24px;
              overflow: hidden;
              box-shadow: 0 10px 30px rgba(43, 58, 51, 0.08);
              border: 1px solid #ebe5db;
            "
          >
            <!-- Brand Header -->
            <tr>
              <td
                align="center"
                style="padding: 34px 20px 14px 20px; background-color: #faf8f5"
              >
                <table
                  role="presentation"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                >
                  <tr>
                    <td align="center" valign="middle">
                      <!-- Brand Icon: Minimalist Yoga Lotus SVG -->
                      <img
                        src="https://yogastories.vercel.app/favicon.png"
                        width="34"
                        height="34"
                        alt="YogaStories"
                        style="
                          display: block;
                          border: 0;
                          outline: none;
                          text-decoration: none;
                        "
                      />
                    </td>
                    <td
                      valign="middle"
                      style="
                        padding-left: 10px;
                        font-family:
                          -apple-system, BlinkMacSystemFont,
                          &quot;Segoe UI&quot;, Roboto, sans-serif;
                        font-size: 22px;
                        font-weight: 700;
                        letter-spacing: 0.8px;
                        color: #2b3a33;
                      "
                    >
                      Yoga<span style="color: #4a7a64">Stories</span>
                    </td>
                  </tr>
                </table>
                <div
                  style="
                    font-size: 11px;
                    text-transform: uppercase;
                    letter-spacing: 2.2px;
                    color: #8a978f;
                    margin-top: 5px;
                    font-weight: 600;
                  "
                >
                  Trainer &amp; Admin Portal
                </div>
              </td>
            </tr>

            <!-- Notification Hero / Status Badge -->
            <tr>
              <td
                align="center"
                class="mobile-padding"
                style="padding: 14px 36px 8px 36px"
              >
                <!-- New Booking Status Badge -->
                <table
                  role="presentation"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  style="margin-bottom: 14px"
                >
                  <tr>
                    <td
                      style="
                        background-color: #e6efea;
                        padding: 6px 16px;
                        border-radius: 20px;
                        font-size: 12px;
                        font-weight: 700;
                        color: #23523e;
                        letter-spacing: 0.6px;
                        text-transform: uppercase;
                      "
                    >
                      <span
                        style="
                          display: inline-block;
                          width: 7px;
                          height: 7px;
                          background-color: #365c4b;
                          border-radius: 50%;
                          margin-right: 6px;
                          vertical-align: middle;
                        "
                      ></span
                      >New Booking Received
                    </td>
                  </tr>
                </table>

                <!-- Main Heading -->
                <h1
                  class="hero-title"
                  style="
                    margin: 0 0 10px 0;
                    font-size: 28px;
                    line-height: 36px;
                    font-weight: 700;
                    color: #1e2d26;
                    letter-spacing: -0.3px;
                  "
                >
                  New Yoga Booking
                </h1>
                <p
                  style="
                    margin: 0 auto;
                    max-width: 470px;
                    font-size: 15px;
                    line-height: 23px;
                    color: #5c6b63;
                  "
                >
                  A new client booking has just been confirmed. Please check the
                  session schedule, payment status, and client profile details
                  below.
                </p>
              </td>
            </tr>

            <!-- Joy & Peace Emblem: Harmonious Wellness, Rising Sun & Zen Florals -->
            <tr>
              <td align="center" style="padding: 10px 20px 4px 20px">
                <div style="max-width: 460px; margin: 0 auto">
                  <img
                    src="https://images.unsplash.com/vector-1759549084865-81ea1a663fec?auto=format&fit=crop&fm=jpg&q=80&w=1200"
                    alt="Yoga meditation"
                    width="520"
                    style="
                      display: block;
                      width: 100%;
                      max-width: 520px;
                      height: auto;
                      border: 0;
                      margin-top: auto;
                      margin-bottom: 6%;
                      margin-left: 0;
                      margin-right: 0;
                      border-radius: 40px;
                    "
                  />
                </div>
              </td>
            </tr>

            <!-- Fluid Wave SVG Transition 1 -->

            <!-- Core Session Card Section -->
            <tr>
              <td
                class="mobile-padding"
                style="padding: 24px 36px 20px 36px; background-color: #efe8de"
              >
                <!-- Card 1: Session Details & Financial Overview -->
                <table
                  role="presentation"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  width="100%"
                  class="mobile-card"
                  style="
                    background-color: #ffffff;
                    border-radius: 18px;
                    border: 1px solid #e3d9cc;
                    box-shadow: 0 4px 16px rgba(43, 58, 51, 0.05);
                    overflow: hidden;
                    margin-bottom: 20px;
                  "
                >
                  <!-- Card Header -->
                  <tr>
                    <td style="background-color: #365c4b; padding: 18px 24px">
                      <table
                        role="presentation"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        width="100%"
                      >
                        <tr>
                          <td
                            class="mobile-header-stack"
                            align="left"
                            valign="middle"
                          >
                            <span
                              style="
                                font-size: 11px;
                                text-transform: uppercase;
                                letter-spacing: 1.8px;
                                color: #b3d1c2;
                                font-weight: 600;
                                display: block;
                              "
                              >Booked Class</span
                            >
                            <span
                              style="
                                font-size: 18px;
                                font-weight: 700;
                                color: #ffffff;
                                letter-spacing: -0.2px;
                              "
                              >${yogaClass.title}</span
                            >
                          </td>
                          <td
                            class="mobile-header-status"
                            align="right"
                            valign="middle"
                          >
                            <!-- Payment Status Tag -->
                            <table
                              role="presentation"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                            >
                              <tr>
                                <td
                                  style="
                                    background-color: rgba(255, 255, 255, 0.2);
                                    border-radius: 20px;
                                    padding: 5px 12px;
                                    font-size: 11px;
                                    color: #ffffff;
                                    font-weight: 700;
                                    text-transform: uppercase;
                                    letter-spacing: 0.5px;
                                    white-space: nowrap;
                                  "
                                >
                                  &#9679;&nbsp;${booking.paymentStatus}
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Session Grid -->
                  <tr>
                    <td style="padding: 20px 24px 16px 24px">
                      <!-- Session Date & Time Row -->
                      <table
                        role="presentation"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        width="100%"
                        style="margin-bottom: 14px"
                      >
                        <tr>
                          <!-- Session Date Block -->
                          <td
                            width="48%"
                            class="col-half"
                            valign="top"
                            style="
                              background-color: #f8f6f2;
                              border-radius: 12px;
                              padding: 14px 14px;
                              border: 1px solid #efeae0;
                            "
                          >
                            <table
                              role="presentation"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              width="100%"
                            >
                              <tr>
                                <td width="26" valign="top">
                                  <!-- Calendar Icon SVG -->
                                  <img
                                    src="https://img.icons8.com/material-outlined/48/4A7A64/calendar.png"
                                    width="22"
                                    height="22"
                                    alt="Calendar"
                                    style="
                                      display: block;
                                      border: 0;
                                      outline: none;
                                      text-decoration: none;
                                    "
                                  />
                                </td>
                                <td valign="top" style="padding-left: 10px">
                                  <div
                                    style="
                                      font-size: 11px;
                                      text-transform: uppercase;
                                      color: #7b8a82;
                                      font-weight: 600;
                                      letter-spacing: 0.5px;
                                    "
                                  >
                                    Session Date
                                  </div>
                                  <div
                                    style="
                                      font-size: 14px;
                                      font-weight: 700;
                                      color: #1e2d26;
                                      margin-top: 3px;
                                    "
                                  >
                                    ${formattedDate}
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>

                          <td
                            width="4%"
                            class="col-half mobile-gap"
                            style="font-size: 1px; line-height: 1px"
                          >
                            &nbsp;
                          </td>

                          <!-- Time Slot Block -->
                          <td
                            width="48%"
                            class="col-half"
                            valign="top"
                            style="
                              background-color: #f8f6f2;
                              border-radius: 12px;
                              padding: 14px 14px;
                              border: 1px solid #efeae0;
                            "
                          >
                            <table
                              role="presentation"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              width="100%"
                            >
                              <tr>
                                <td width="26" valign="top">
                                  <!-- Clock Icon SVG -->
                                  <img
                                    src="https://img.icons8.com/material-outlined/48/4A7A64/clock.png"
                                    width="22"
                                    height="22"
                                    alt="Time"
                                    style="
                                      display: block;
                                      border: 0;
                                      outline: none;
                                      text-decoration: none;
                                    "
                                  />
                                </td>
                                <td valign="top" style="padding-left: 10px">
                                  <div
                                    style="
                                      font-size: 11px;
                                      text-transform: uppercase;
                                      color: #7b8a82;
                                      font-weight: 600;
                                      letter-spacing: 0.5px;
                                    "
                                  >
                                    Time Slot
                                  </div>
                                  <div
                                    style="
                                      font-size: 14px;
                                      font-weight: 700;
                                      color: #1e2d26;
                                      margin-top: 3px;
                                    "
                                  >
                                    ${session.startTime} &ndash;
                                    ${session.endTime}
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>

                      <!-- Financial & Payment Summary Block -->
                      <table
                        role="presentation"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        width="100%"
                        style="
                          background-color: #faf8f5;
                          border-radius: 12px;
                          padding: 14px 16px;
                          border: 1px solid #ebe5db;
                          margin-bottom: 4px;
                        "
                      >
                        <tr>
                          <td
                            class="mobile-header-stack"
                            align="left"
                            valign="middle"
                            style="padding: 8px"
                          >
                            <span
                              style="
                                font-size: 11px;
                                text-transform: uppercase;
                                color: #7b8a82;
                                font-weight: 600;
                                letter-spacing: 0.5px;
                                display: block;
                              "
                              >Booking Amount</span
                            >
                            <span
                              style="
                                font-size: 20px;
                                font-weight: 800;
                                color: #23382d;
                                margin-top: 2px;
                                display: block;
                              "
                              >₹${booking.amount}</span
                            >
                          </td>
                          <td
                            class="mobile-header-stack"
                            align="right"
                            valign="middle"
                          >
                            <span
                              style="
                                font-size: 11px;
                                padding-right: 10px;
                                text-transform: uppercase;
                                color: #7b8a82;
                                font-weight: 600;
                                letter-spacing: 0.5px;
                                display: block;
                              "
                              >Payment Status</span
                            >
                            <span
                              style="
                                font-size: 13px;
                                padding-right: 10px;
                                padding-bottom: 10px;
                                font-weight: 700;
                                color: #2e5242;
                                text-transform: capitalize;
                                margin-top: 3px;
                                display: block;
                              "
                              >${booking.paymentStatus}</span
                            >
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>

                <!-- Card 2: Client Profile & System ID -->
                <table
                  role="presentation"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  width="100%"
                  class="mobile-card"
                  style="
                    background-color: #ffffff;
                    border-radius: 18px;
                    border: 1px solid #e3d9cc;
                    box-shadow: 0 4px 16px rgba(43, 58, 51, 0.05);
                    overflow: hidden;
                  "
                >
                  <tr>
                    <td
                      style="
                        padding: 16px 22px 10px 22px;
                        border-bottom: 1px solid #f0eae1;
                        background-color: #faf8f5;
                      "
                    >
                      <span
                        style="
                          font-size: 11px;
                          text-transform: uppercase;
                          letter-spacing: 1.5px;
                          color: #7b8a82;
                          font-weight: 700;
                        "
                        >Client Contact Details</span
                      >
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 18px 22px">
                      <!-- Client Name -->
                      <table
                        role="presentation"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        width="100%"
                        style="margin-bottom: 12px"
                      >
                        <tr>
                          <td width="28" valign="top">
                            <!-- User Icon SVG -->
                            <img
                              src="https://img.icons8.com/material-outlined/48/4A7A64/user.png"
                              width="20"
                              height="20"
                              alt="Client"
                              style="
                                display: block;
                                border: 0;
                                outline: none;
                                text-decoration: none;
                              "
                            />
                          </td>
                          <td valign="top" style="padding-left: 8px">
                            <div
                              style="
                                font-size: 11px;
                                text-transform: uppercase;
                                color: #8a978f;
                                font-weight: 600;
                                letter-spacing: 0.4px;
                              "
                            >
                              Client Name
                            </div>
                            <div
                              style="
                                font-size: 14px;
                                font-weight: 700;
                                color: #1e2d26;
                                margin-top: 2px;
                              "
                            >
                              ${client.name}
                            </div>
                          </td>
                        </tr>
                      </table>

                      <!-- Client Email -->
                      <table
                        role="presentation"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        width="100%"
                        style="margin-bottom: 12px"
                      >
                        <tr>
                          <td width="28" valign="top">
                            <!-- Mail Envelope SVG -->
                            <img
                              src="https://img.icons8.com/material-outlined/48/4A7A64/mail.png"
                              width="20"
                              height="20"
                              alt="Email"
                              style="
                                display: block;
                                border: 0;
                                outline: none;
                                text-decoration: none;
                              "
                            />
                          </td>
                          <td valign="top" style="padding-left: 8px">
                            <div
                              style="
                                font-size: 11px;
                                text-transform: uppercase;
                                color: #8a978f;
                                font-weight: 600;
                                letter-spacing: 0.4px;
                              "
                            >
                              Email Address
                            </div>
                            <div
                              style="
                                font-size: 14px;
                                font-weight: 600;
                                color: #2b3a33;
                                margin-top: 2px;
                              "
                            >
                              <a
                                href="mailto:${client.email}"
                                style="
                                  color: #2d5a47;
                                  text-decoration: none;
                                  word-break: break-all;
                                "
                                >${client.email}</a
                              >
                            </div>
                          </td>
                        </tr>
                      </table>

                      <!-- Client Phone -->
                      <table
                        role="presentation"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        width="100%"
                        style="margin-bottom: 14px"
                      >
                        <tr>
                          <td width="28" valign="top">
                            <!-- Phone SVG -->
                            <img
                              src="https://img.icons8.com/material-outlined/48/4A7A64/phone.png"
                              width="20"
                              height="20"
                              alt="Phone"
                              style="
                                display: block;
                                border: 0;
                                outline: none;
                                text-decoration: none;
                              "
                            />
                          </td>
                          <td valign="top" style="padding-left: 8px">
                            <div
                              style="
                                font-size: 11px;
                                text-transform: uppercase;
                                color: #8a978f;
                                font-weight: 600;
                                letter-spacing: 0.4px;
                              "
                            >
                              Phone Number
                            </div>
                            <div
                              style="
                                font-size: 14px;
                                font-weight: 600;
                                color: #2b3a33;
                                margin-top: 2px;
                              "
                            >
                              <a
                                href="tel:${client.phone}"
                                style="color: #2d5a47; text-decoration: none"
                                >${client.phone}</a
                              >
                            </div>
                          </td>
                        </tr>
                      </table>

                      <!-- MongoDB ObjectId Reference (Small Monospace, Full ID display with clean wrap) -->
                      <div
                        style="
                          border-top: 1px dashed #e3d9cc;
                          padding-top: 12px;
                          margin-top: 6px;
                        "
                      >
                        <span
                          style="
                            font-size: 10px;
                            text-transform: uppercase;
                            letter-spacing: 0.6px;
                            color: #8a978f;
                            font-weight: 700;
                            display: block;
                            margin-bottom: 4px;
                          "
                          >MongoDB System Identifier</span
                        >
                        <div
                          class="booking-id-mono"
                          style="
                            font-family:
                              &quot;SF Mono&quot;, Menlo, Consolas, Monaco,
                              monospace;
                            font-size: 12px;
                            line-height: 18px;
                            color: #365c4b;
                            background-color: #f4f1ea;
                            border-radius: 8px;
                            padding: 7px 10px;
                            word-break: break-all;
                            overflow-wrap: anywhere;
                            border: 1px solid #ebe5db;
                          "
                        >
                          ${booking._id}
                        </div>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Operational Alert Notice Card -->
            <tr>
              <td
                class="mobile-padding"
                style="padding: 12px 36px 24px 36px; background-color: #faf8f5"
              >
                <table
                  role="presentation"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  width="100%"
                  style="background-color: #FAF3EB; border-radius: 14px; solid #ECDCCB; border-left: 4px solid #C28D75; padding: 15px 18px;"
                >
                  <tr>
                    <td width="30" valign="top">
                      <!-- Alert / Notification Bell SVG -->
                      <img
                        src="https://img.icons8.com/ios-filled/50/C28D75/appointment-reminders.png"
                        width="22"
                        height="22"
                        alt="Alert"
                        style="
                          display: block;
                          border: 0;
                          padding-top: 8px;
                          padding-left: 15px;
                          outline: none;
                          text-decoration: none;
                        "
                      />
                    </td>
                    <td valign="top" style="padding-left: 12px">
                      <div
                        style="
                          font-size: 13px;
                          font-weight: 700;
                          color: #734531;
                          letter-spacing: 0.3px;
                          text-transform: uppercase;
                        "
                      >
                        Stay Alert &bull; Trainer Action Required
                      </div>
                      <div
                        style="
                          font-size: 12px;
                          color: #69564b;
                          line-height: 18px;
                          margin-top: 4px;
                        "
                      >
                        Please stay alert and ensure you are ready ahead of
                        time. Check your session timetable, prepare your studio
                        space or virtual link at least
                        <strong>10–15 minutes prior</strong>, and be ready to
                        welcome the client promptly.
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Fluid Wave SVG Transition 3 (to Dark Footer) -->

            <!-- Dark Forest Green Footer -->
            <tr>
              <td
                class="mobile-padding"
                style="
                  background-color: #20332b;
                  padding: 22px 36px 36px 36px;
                  text-align: center;
                "
              >
                <!-- Footer Logo -->
                <table
                  role="presentation"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  align="center"
                  style="margin: 0 auto 12px auto"
                >
                  <tr>
                    <td align="center" valign="middle">
                      <img
                        src="https://yogastories.vercel.app/favicon.png"
                        width="22"
                        height="22"
                        alt="YogaStories"
                        style="
                          display: block;
                          border: 0;
                          outline: none;
                          text-decoration: none;
                        "
                      />
                    </td>
                    <td
                      valign="middle"
                      style="
                        padding-left: 8px;
                        font-size: 17px;
                        font-weight: 700;
                        color: #faf8f5;
                        letter-spacing: 0.5px;
                      "
                    >
                      Yoga<span style="color: #8eb7a3">Stories</span>
                    </td>
                  </tr>
                </table>

                <!-- Footer Details -->
                <p
                  style="
                    margin: 0 0 8px 0;
                    font-size: 12px;
                    color: #9fb5a9;
                    line-height: 18px;
                  "
                >
                  Internal Notification &bull; Confidential Trainer &amp;
                  Administrator Dispatch
                </p>
                <p
                  style="
                    margin: 0;
                    font-size: 11px;
                    color: #738c7f;
                    line-height: 17px;
                  "
                >
                  &copy; 2026 YogaStories Platform. All rights reserved. Automated
                  Brevo Transactional Service.
                </p>
              </td>
            </tr>
          </table>
          <!-- End Main Centered Container -->
        </td>
      </tr>
    </table>
  </body>
</html>

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

const sendBookingCancellation = async ({
  booking
}) => {
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