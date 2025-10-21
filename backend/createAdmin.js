import mongoose from "mongoose";
import User from "./models/User.js";
import { config } from "dotenv";

// Load environment variables
config({ path: "./config.env" });

const createAdminUser = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: "admin@gym.com" });
    if (existingAdmin) {
      console.log("Admin user already exists");
      return;
    }

    // Create admin user
    const adminUser = await User.create({
      name: "Admin User",
      email: "admin@gym.com",
      password: "admin123",
      role: "admin",
      membershipType: "vip",
      phone: "123-456-7890",
      address: "Admin Address",
    });

    console.log("Admin user created successfully:");
    console.log("Email: admin@gym.com");
    console.log("Password: admin123");
    console.log("Role: admin");

  } catch (error) {
    console.error("Error creating admin user:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
};

createAdminUser();
