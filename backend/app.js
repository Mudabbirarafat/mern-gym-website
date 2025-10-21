import express from "express";
import { config } from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { sendEmail } from "./utils/sendEmail.js";
import authRoutes from "./routes/auth.js";
import apiRoutes from "./routes/api.js";

const app = express();
const router = express.Router();

// Load environment variables
config({ path: "./config.env" });

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    console.log("App will continue running without database connection");
    console.log("To fix: Install MongoDB locally or update MONGODB_URI in config.env");
  });

// Use CORS properly
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "MERN Gym Website API is running!",
    endpoints: {
      auth: "/api/auth",
      api: "/api",
      contact: "/send/mail"
    }
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", apiRoutes);

// Legacy contact route for backward compatibility
router.post("/send/mail", async (req, res, next) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return next(
      res.status(400).json({
        success: false,
        message: "Please provide all details",
      })
    );
  }
  try {
    await sendEmail({
      email: "sk4001677@gmail.com",
      subject: "GYM WEBSITE CONTACT",
      message,
      userEmail: email,
    });
    res.status(200).json({
      success: true,
      message: "Message Sent Successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

app.use(router);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
