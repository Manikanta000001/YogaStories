const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");
const classRoutes = require("./routes/classRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const clientRoutes = require("./routes/clientRoutes");
const announcementRoutes = require("./routes/announcementRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const cashfreeRoutes = require("./routes/cashfreeRoutes");

dotenv.config();

const app = express();


const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "https://yogastories.vercel.app",
  process.env.CLIENT_URL,
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use("/api/classes", classRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/cashfree", cashfreeRoutes);

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Yoga backend is running",
  });
});

const { sendEmail } = require("./services/emailService");

// app.get("/api/test-email", async (req, res) => {
//   const result = await sendEmail({
//     to: process.env.TRAINER_EMAIL,
//     subject: "YogaPT Test Email",
//     html: `
//       <h1>YogaPT Email Test</h1>
//       <p>Resend is successfully connected.</p>
//       <p>This is a test email from the YogaPT backend.</p>
//     `,
//   });

//   res.json(result);
// });

// 404 endpoint
app.use((req, res) => {
 res.sendFile(path.join(__dirname, "public", "404.html"));
});

const startServer = async () => {
  try {
    console.log("Connecting to MongoDB...");

    await connectDB();


    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("\n❌ Backend startup failed");
    console.error("Reason:", error.message);
    
  }
};

startServer();