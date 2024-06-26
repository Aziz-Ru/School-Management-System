const { body, validationResult } = require("express-validator");
const createError = require("http-errors");
const prisma = require("../prisma/prismaClient");

const addClassValidator = [
  body("name")
    .isInt({ min: 1, max: 12 })
    .withMessage("name must be between 1 and 12"),
  body("monthlyFee")
    .isInt({ min: 0 })
    .withMessage("monthlyFee must be a positive number"),
  body("totalStudents")
    .isInt({ min: 0 })
    .withMessage("totalStudents must be a positive number"),
  body("totalTeachers")
    .isInt({ min: 0 })
    .withMessage("totalTeachers must be a positive number"),
  body("totalCourses")
    .isInt({ min: 0 })
    .withMessage("totalCourses must be a positive number"),
];
const updateClassRoomValidator = (req, res, next) => {
  const { name, monthlyFee } = req.body;
  if (name != undefined && typeof name !== "number") {
    return next(createError(400, "name must be a number"));
  } else if (monthlyFee != undefined && typeof monthlyFee !== "number") {
    return next(createError(400, "monthlyFee must be a number"));
  } else if (name < 1 || name > 12) {
    return next(createError(400, "name must be between 1 and 12"));
  } else if (monthlyFee < 0) {
    return next(createError(400, "monthlyFee must be a positive number"));
  }
  next();
};

const addClassValidatorHandler = (req, res, next) => {
  const errors = validationResult(req);
  // console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  addClassValidator,
  addClassValidatorHandler,
  updateClassRoomValidator,
};
