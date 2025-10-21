import express from "express";
import Contact from "../models/Contact.js";
import WorkoutSession from "../models/WorkoutSession.js";
import { isAuthenticated, isAdmin } from "../middleware/auth.js";

const router = express.Router();

// Contact routes
router.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const contact = await Contact.create({
      name,
      email,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get all contacts (Admin only)
router.get("/contacts", isAuthenticated, isAdmin, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      contacts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Update contact status (Admin only)
router.put("/contacts/:id", isAuthenticated, isAdmin, async (req, res) => {
  try {
    const { status } = req.body;

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Contact status updated successfully",
      contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Workout session routes
router.post("/workout-sessions", isAuthenticated, async (req, res) => {
  try {
    const { sessionType, duration, caloriesBurned, notes, trainer } = req.body;

    const session = await WorkoutSession.create({
      userId: req.user._id,
      sessionType,
      duration,
      caloriesBurned,
      notes,
      trainer,
    });

    res.status(201).json({
      success: true,
      message: "Workout session logged successfully",
      session,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get user's workout sessions
router.get("/workout-sessions", isAuthenticated, async (req, res) => {
  try {
    const sessions = await WorkoutSession.find({ userId: req.user._id })
      .sort({ date: -1 })
      .limit(20);

    res.status(200).json({
      success: true,
      sessions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get all workout sessions (Admin only)
router.get("/workout-sessions/all", isAuthenticated, isAdmin, async (req, res) => {
  try {
    const sessions = await WorkoutSession.find()
      .populate("userId", "name email")
      .sort({ date: -1 });

    res.status(200).json({
      success: true,
      sessions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Dashboard stats (Admin only)
router.get("/dashboard/stats", isAuthenticated, isAdmin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });
    const totalContacts = await Contact.countDocuments();
    const newContacts = await Contact.countDocuments({ status: "new" });
    const totalSessions = await WorkoutSession.countDocuments();

    // Get recent users
    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name email membershipType createdAt");

    // Get recent contacts
    const recentContacts = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name email message status createdAt");

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        activeUsers,
        totalContacts,
        newContacts,
        totalSessions,
      },
      recentUsers,
      recentContacts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
