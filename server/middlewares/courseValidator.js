import { body, param } from "express-validator";
import prisma from "../prisma/prismaClient";

const getCourseValidator = [
  param("id")
    .isUUID()
    .withMessage("id must be a valid UUID")
    .custom(async (value) => {
      try {
        const course = await prisma.courses.findUnique({
          where: { id: value },
        });

        if (!course) {
          return Promise.reject("course is not found");
        }
      } catch (error) {
        return Promise.reject("Something went wrong");
      }
    }),
];

const courseAddedValidator = [
  body("name").exists().withMessage("name is required"),

  body("totalMarks")
    .isInt({ max: 100, min: 1 })
    .withMessage("totalMarks must be a number between 1 and 100"),
  body("credit")
    .isInt({ max: 5, min: 1 })
    .withMessage("credit must be a number between 1 and 5"),
];

export default { courseAddedValidator, getCourseValidator };
