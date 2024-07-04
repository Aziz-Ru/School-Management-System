const { body } = require("express-validator");

const addTeacherValidator = [
  body("name")
    .optional({ checkFalsy: true })
    .trim()
    .notEmpty()
    .withMessage("name must be required")
    .matches(/^[a-zA-Z ]+$/)
    .withMessage("name must be only alphabets"),
];

module.exports = { addTeacherValidator };
