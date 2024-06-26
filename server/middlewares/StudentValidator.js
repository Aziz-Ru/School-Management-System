const { body } = require("express-validator");
const createError = require("http-errors");
const prisma = require("../prisma/prismaClient");
const addStudentValidator = [
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
  body("sex")
    .notEmpty()
    .withMessage("sex must be required")
    .trim()
    .custom((value) => {
      if (value !== "male" && value !== "female") {
        throw new Error("sex should be either male or female");
      } else {
        return true;
      }
    })
    .withMessage("sex should be either male or female"),
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
  body("classId")
    .isInt({ min: 1, max: 12 })
    .withMessage("classId must be between 1 and 12")
    .custom(async (value) => {
      try {
        const existClass = await prisma.classes.findUnique({
          where: { classId: parseInt(value) },
        });
        if (!existClass) {
          return Promise.reject("class doesn't exists");
        }
      } catch (error) {
        // console.log(error.message);
        return Promise.reject("Something went wrong");
      }
    }),
];

module.exports = { addStudentValidator };
