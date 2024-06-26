const { body, validationResult, param } = require("express-validator");
const createError = require("http-errors");
const prisma = require("../prisma/prismaClient");

const getClassValidator = [
  param("id")
    .exists()
    .withMessage("id is required")
    .custom(async (value) => {
      try {
        const existClass = await prisma.classes.findUnique({
          where: { classId: parseInt(value) },
        });

        if (!existClass) {
          return Promise.reject("Class not found");
        }
      } catch (error) {
        return Promise.reject("Something went wrong");
      }
    }),
];

const addClassValidator = [
  body("classId")
    .isInt({ min: 1, max: 12 })
    .withMessage("classId must be between 1 and 12")
    .custom(async (value) => {
      try {
        const existClass = await prisma.classes.findUnique({
          where: { classId: parseInt(value) },
        });
        if (existClass) {
          return Promise.reject("class already exists");
        }
      } catch (error) {
        return Promise.reject("Something went wrong");
      }
    }),
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

const updateValidator = [
  param("id")
    .isInt({ min: 1, max: 12 })
    .withMessage("id must be between 1 and 12")
    .custom(async (value) => {
      try {
        const existClass = await prisma.classes.findUnique({
          where: { classId: parseInt(value) },
        });
        if (!existClass) {
          return Promise.reject("Class not found");
        }
      } catch (error) {
        return Promise.reject("Something went wrong");
      }
    }),
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

module.exports = {
  addClassValidator,
  updateValidator,
  getClassValidator,
};
