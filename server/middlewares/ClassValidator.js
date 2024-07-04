const { body, param } = require("express-validator");
const prisma = require("../prisma/prismaClient");

const getClassValidator = [
  param("classId")
    .isInt({ min: 1, max: 12 })
    .withMessage("id is required")
    .custom(async (value) => {
      // console.log(value);
      try {
        const existClass = await prisma.class.findUnique({
          where: { classId: parseInt(value) },
        });

        if (!existClass) {
          return Promise.reject("Class not found");
        } else {
          return false;
        }
      } catch (error) {
        console.log(error.message);
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
        const existClass = await prisma.class.findUnique({
          where: { classId: parseInt(value) },
        });
        if (existClass) {
          return Promise.reject("class already exists");
        } else {
          return true;
        }
      } catch (error) {
        return Promise.reject("Something went wrong");
      }
    }),
  body("monthlyFee")
    .optional()
    .isInt({ min: 0 })
    .withMessage("monthlyFee must be a positive number"),
  body("totalStudents")
    .optional()
    .isInt({ min: 0 })
    .withMessage("totalStudents must be a positive number"),
  body("totalCourses")
    .optional()
    .isInt({ min: 0 })
    .withMessage("totalCourses must be a positive number"),
];

module.exports = {
  addClassValidator,
  getClassValidator,
};
