const mongoose = require("mongoose");

const SavingsGoalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  targetAmount: {
    type: Number,
    required: true,
  },
  targetDate: {
    type: Date,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const SavingsGoal = mongoose.model("SavingsGoal", SavingsGoalSchema);

module.exports = SavingsGoal;
