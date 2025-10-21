import mongoose from "mongoose";

const workoutSessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  sessionType: {
    type: String,
    required: true,
    enum: ["cardio", "strength", "yoga", "crossfit", "swimming"],
  },
  duration: {
    type: Number, // in minutes
    required: true,
  },
  caloriesBurned: {
    type: Number,
  },
  notes: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  trainer: {
    type: String,
  },
});

export default mongoose.model("WorkoutSession", workoutSessionSchema);
