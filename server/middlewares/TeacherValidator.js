const { body, param } = require("express-validator");
const createError = require("http-errors");
const prisma = require("../prisma/prismaClient");

const getTeacherValidator = [
  param("uId")
    .notEmpty()
    .withMessage("userId must be required")
    .custom(async (userId) => {
      try {
        const student = await prisma.user.findUnique({
          where: { uId: userId },
        });
        // console.log(student);
        if (!student) {
          return Promise.reject("Teacher not found");
        }
        return true;
      } catch (error) {
        return Promise.reject("something went wrong");
      }
    }),
];

const addTeacherValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("name must be required")
    .matches(/^[a-zA-Z ]+$/)
    .withMessage("name must be only alphabets"),
  body("email")
    .trim()
    .isEmail()
    .withMessage("email must be valid")
    .custom(async (email) => {
      try {
        const _isExist = await prisma.user.findUnique({
          where: { email },
        });
        if (_isExist) {
          // console.log(_isExist);
          return Promise.reject("email already exist");
        } else {
          return true;
        }
      } catch (error) {
        return Promise.reject("something went wrong");
      }
    })
    .withMessage("email already exist"),
  body("password")
    .isStrongPassword()
    .withMessage(
      "password must be strong and at least 8 characters long and contain at least 1 lowercase, 1 uppercase, 1 number, 1 symbol"
    ),
  body("role")
    .notEmpty()
    .withMessage("role must be required")
    .isIn(["Teacher"])
    .withMessage("role must be Teacher"),
  body("dob").isDate().withMessage("dob must be valid"),
  body("address")
    .optional({ checkFalsy: true })
    .trim()
    .notEmpty()
    .withMessage("address must be required"),
  body("sex")
    .isIn(["Male", "Female"])
    .withMessage("sex must be Male Or Female"),
  body("phone").isMobilePhone("bn-BD").withMessage("phone must be valid"),
  body("imageLink")
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("imageLink must be valid"),
];

module.exports = { addTeacherValidator, getTeacherValidator };
