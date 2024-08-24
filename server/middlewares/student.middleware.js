import { body, param } from "express-validator";
import prisma from "../prisma/prismaClient";

const getStudentValidator = [
  param("uId")
    .notEmpty()
    .withMessage("uid must be required")
    .custom(async (id) => {
      try {
        const student = await prisma.user.findUnique({
          where: { uId: id },
        });
        // console.log(student);
        if (!student) {
          return Promise.reject("student not found");
        }
        return true;
      } catch (error) {
        return Promise.reject("something went wrong");
      }
    }),
];

export const addStudentValidator = [
  body("auto").isBoolean().withMessage("auto field must be required"),
  body("studentId")
    .optional({ checkFalsy: true })
    .trim()
    .notEmpty()
    .withMessage("studentId must be required"),
  body("password")
    .isStrongPassword({ minLength: 6 })
    .withMessage(
      "password must be strong and at least 6 characters long and contain at least 1 lowercase, 1 uppercase, 1 number, 1 symbol"
    ),
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("name must be required")
    .matches(/^[a-zA-Z ]+$/)
    .withMessage("name must be only alphabets"),
  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("name must be required")
    .matches(/^[a-zA-Z ]+$/)
    .withMessage("name must be only alphabets"),
  body("email").trim().isEmail().withMessage("email must be valid"),
  body("dob").isDate().withMessage("dob must be valid"),
  body("sex")
    .isIn(["Male", "Female"])
    .withMessage("sex must be Male or Female"),
  body("phone").isMobilePhone("bn-BD").withMessage("phone must be valid"),
  body("imageLink")
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("imageLink must be valid"),
];
