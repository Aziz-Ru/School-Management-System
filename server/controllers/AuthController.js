// internal import
const prisma = require("../prisma/script");

function userSignUpController(req, res) {
  const { role } = req.params;
  if(role=='student'){
    
  }
  res.send({ role: role });
}

function userSignInController(req, res) {
  const { role } = req.params;
  if (role == "student") {
  }

  res.send({ role: role });
}

module.exports = {
  userSignUpController,
  userSignInController,
};
