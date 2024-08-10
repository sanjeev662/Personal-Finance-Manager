const SavingsGoal = require("../models/SavingsGoalModel.js");
const Transaction = require("../models/TransactionModel.js");
const User = require("../models/UserSchema.js");

// Add a new savings goal
const addSavingsGoalController = async (req, res) => {
  try {
    const { title, targetAmount, targetDate, userId } = req.body;

    // Validate input
    if (!title || !targetAmount || !targetDate || !userId) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const transactiontotal = await Transaction.find({user: userId});

    const totalTurnOverIncome = transactiontotal
    .filter((item) => item.transactionType === "credit")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
    const totalTurnOverExpense = transactiontotal
    .filter((item) => item.transactionType === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

    totalSaving = totalTurnOverIncome - totalTurnOverExpense;

    // Create the new savings goal
    const newSavingsGoal = new SavingsGoal({
      title,
      targetAmount,
      initialAmount : totalSaving,
      targetDate,
      user: userId,
    });
    await newSavingsGoal.save();

    return res.status(200).json({
      success: true,
      message: "Savings Goal Added Successfully",
      savingsGoal: newSavingsGoal,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "An error occurred while adding the savings goal",
    });
  }
};

// Get all savings goals for a user
const getAllSavingsGoalsController = async (req, res) => {
  try {
    const { userId } = req.query;

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const transactions = await Transaction.find({user: userId});

    const totalTurnOverIncome = transactions
    .filter((item) => item.transactionType === "credit")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
    const totalTurnOverExpense = transactions
    .filter((item) => item.transactionType === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

    let totalSaving = totalTurnOverIncome - totalTurnOverExpense;

    // Find savings goals for the user
    const savingsGoals = await SavingsGoal.findOne({ user: userId });

    return res.status(200).json({
      success: true,
      totalSaving,
      savingsGoals,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching savings goals",
    });
  }
};

// Update a savings goal
const updateSavingsGoalController = async (req, res) => {
  try {
    const savingsGoalId = req.params.id;
    const { title, targetAmount, targetDate } = req.body;

    // Find the savings goal
    const savingsGoal = await SavingsGoal.findById(savingsGoalId);
    if (!savingsGoal) {
      return res.status(404).json({
        success: false,
        message: "Savings goal not found",
      });
    }

    // Update the savings goal
    if (title) savingsGoal.title = title;
    if (targetAmount) savingsGoal.targetAmount = targetAmount;
    if (targetDate) savingsGoal.targetDate = targetDate;

    await savingsGoal.save();

    return res.status(200).json({
      success: true,
      message: "Savings Goal Updated Successfully",
      savingsGoal,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the savings goal",
    });
  }
};

// Delete a savings goal
const deleteSavingsGoalController = async (req, res) => {
  try {
    const savingsGoalId = req.params.id;
    const { userId } = req.body;

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Find and delete the savings goal
    const savingsGoal = await SavingsGoal.findByIdAndDelete(savingsGoalId);
    if (!savingsGoal) {
      return res.status(404).json({
        success: false,
        message: "Savings goal not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Savings Goal Deleted Successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the savings goal",
    });
  }
};

module.exports = {
  addSavingsGoalController,
  getAllSavingsGoalsController,
  updateSavingsGoalController,
  deleteSavingsGoalController,
};
