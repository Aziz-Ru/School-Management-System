// External import
const express = require("express");
const {
  userSignUpController,
  userSignInController,
} = require("../controllers/AuthController");
const router = express.Router();

// internal import

//login
router.get("/:role/sign-up", userSignUpController);
router.post("/:role/sign-in", userSignInController);

module.exports = router;

/*
const express = require("express");
const router = express.Router();
router.get("/", () => {});
router.post("/", () => {});
router.put("/", () => {});
router.delete("/", () => {});
module.exports = router;
*/
