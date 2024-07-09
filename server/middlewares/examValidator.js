const { body } = require("express-validator");

const examValidator = [
  body("classId")
    .isInt({ max: 12, min: 1 })
    .withMessage("Class Id must be a number between 1 and 12"),
];

module.exports = examValidator;
