import { body, param } from "express-validator";
import prisma from "../prisma/prismaClient";

const getClassValidator = [
  param("classId")
    .isInt({ min: 1, max: 12 })
    .withMessage("id is required")
    .custom(async (value) => {
      try {
        const existClass = await prisma.class.findUnique({
          where: { classId: value },
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
          where: { classId: value },
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
    .isInt({ min: 0 })
    .withMessage("monthlyFee must be a positive number"),
  body("maxStudents")
    .isInt({ min: 0, max: 100 })
    .withMessage("maximum Students must under 100"),
  body("maxCourses")
    .isInt({ min: 0, max: 50 })
    .withMessage("maximum Courses must under 50"),
];

export default {
  addClassValidator,
  getClassValidator,
};
