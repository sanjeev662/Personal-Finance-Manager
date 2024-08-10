const express = require("express");
const {
  loginControllers,
  registerControllers,
} = require("../controllers/userController.js");

const router = express.Router();

router.route("/register").post(registerControllers);

router.route("/login").post(loginControllers);

module.exports = router;
