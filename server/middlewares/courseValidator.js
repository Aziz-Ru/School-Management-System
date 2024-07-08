const { body, param } = require("express-validator");
const prisma = require("../prisma/prismaClient");

const getCourseValidator = [
  param("courseCode")
    .exists()
    .withMessage("courseCode is required")
    .custom(async (value) => {
      try {
        const course = await prisma.courses.findUnique({
          where: { courseCode: value },
        });
        if (!course) {
          return Promise.reject("courseCode not found");
        }
      } catch (error) {
        return Promise.reject("Something went wrong");
      }
    }),
];

const courseAddedValidator = [
  body("courseName").exists().withMessage("courseName is required"),
  body("courseCode")
    .exists()
    .withMessage("courseCode is required")
    .custom(async (value) => {
      try {
        const course = await prisma.courses.findUnique({
          where: { courseCode: value },
        });
        if (course) {
          return Promise.reject("courseCode already exists");
        }
      } catch (error) {
        return Promise.reject("Something went wrong");
      }
    }),
  body("totalMarks")
    .optional()
    .isInt({ max: 100, min: 1 })
    .withMessage("totalMarks must be a number between 1 and 100"),
  body("credit")
    .optional()
    .isInt({ max: 3, min: 1 })
    .withMessage("credit must be a number between 1 and 3"),
  body("classId")
    .isInt({ max: 12, min: 1 })
    .withMessage("classId must be a number"),
];

module.exports = { courseAddedValidator, getCourseValidator };
