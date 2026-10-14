import mongoose from "mongoose";
import User from "./models/User.js";
import { config } from "dotenv";

// Load environment variables
config({ path: "./config.env" });

const createAdminUser = async () => {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) {
    console.error("Set ADMIN_EMAIL and ADMIN_PASSWORD in config.env first");
    process.exit(1);
  }

  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      console.log("Admin user already exists");
      return;
    }

    // Create admin user
    const adminUser = await User.create({
      name: "Admin User",
      email,
      password,
      role: "admin",
      membershipType: "vip",
      phone: "123-456-7890",
      address: "Admin Address",
    });

    console.log("Admin user created successfully:");
    console.log(`Email: ${email}`);
    console.log("Role: admin");

  } catch (error) {
    console.error("Error creating admin user:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
};

createAdminUser();
