const express = require("express");
const {
  addSavingsGoalController,
  getAllSavingsGoalsController,
  updateSavingsGoalController,
  deleteSavingsGoalController,
} = require("../controllers/savingsGoalController.js");

const router = express.Router();

// Savings Goals Routes
router.route("/addSavingsGoal").post(addSavingsGoalController);
router.route("/getSavingsGoals").get(getAllSavingsGoalsController);
router.route("/updateSavingsGoal/:id").put(updateSavingsGoalController);
router.route("/deleteSavingsGoal/:id").post(deleteSavingsGoalController);

module.exports = router;
