// External import
const express = require("express");
const router = express.Router();
// internal import
const {
  userSignUpController,
  userSignInController,
} = require("../controllers/AuthController");
const { roleHandler } = require("../middlewares/common/roleHandler");

//Authentication
router.get("/:role/sign-up", roleHandler, userSignUpController);
router.post("/:role/sign-in", roleHandler, userSignInController);

module.exports = router;
