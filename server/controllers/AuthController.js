// internal import
// const prisma = require("./prisma/script");

function userSignUpController(req, res) {
  res.status(201).json({ message: "Account Create" });
}
function userSignInController(req, res) {}

module.exports = {
  userSignUpController,
  userSignInController,
};
