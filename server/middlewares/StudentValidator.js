const { body, validationResult } = require("express-validator");
const createError = require("http-errors");
const addStudentValidator = [
  body("roll")
    .notEmpty()
    .withMessage("roll must be required")
    .isString()
    .withMessage("roll must be string")
    .trim(),
  body("name")
    .notEmpty()
    .withMessage("name must be required")
    .isString()
    .withMessage("name must be string")
    .trim(),
  body("email")
    .notEmpty()
    .withMessage("email must be required")
    .trim()
    .isEmail()
    .withMessage("email must be valid"),
  body("password")
    .isStrongPassword()
    .withMessage(
      "password must be strong and at least 8 characters long and contain at least 1 lowercase, 1 uppercase, 1 number, 1 symbol"
    ),
  body("sex").notEmpty().withMessage("sex must be required").trim(),
  body("dob")
    .notEmpty()
    .withMessage("date of birth must be required")
    .isDate()
    .withMessage("dob must be valid date"),
  body("phone")
    .isMobilePhone("bn-BD")
    .withMessage("phone must be valid bangladeshi phone number"),
  body("imageLink")
    .notEmpty()
    .withMessage("imageLink must be required")
    .trim()
    .isURL()
    .withMessage("imageLink must be valid URL"),
  body("address")
    .notEmpty()
    .withMessage("address must be required")
    .isString()
    .withMessage("address must be string")
    .trim(),
  body("classroomId").isInt().withMessage("classId must be integer"),
];

const addStudentValidatorHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { addStudentValidator, addStudentValidatorHandler };
