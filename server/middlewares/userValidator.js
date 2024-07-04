const { body, param } = require("express-validator");
const createError = require("http-errors");
const prisma = require("../prisma/prismaClient");

const getUserValidator = [
  param("userId")
    .notEmpty()
    .withMessage("userId must be required")
    .custom(async (userId) => {
      try {
        const student = await prisma.user.findUnique({
          where: { roll: userId },
        });
        if (!student) {
          return createError(404, "student not found");
        }
        return true;
      } catch (error) {
        return createError(500, "Something went wrong");
      }
    }),
];

const addUserValidator = [
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
  body("admissionYear")
    .isInt({ max: new Date().getFullYear(), min: 1950 })
    .withMessage("admissionYear must be valid"),
  body("role")
    .notEmpty()
    .withMessage("role must be required")
    .isIn(["Student", "Teacher", "Admin"])
    .withMessage("role must be either Student, Teacher or Admin"),
];

const profileValidator = [
  body("dob").isDate().withMessage("dob must be valid"),
  body("address").trim().notEmpty().withMessage("address must be required"),
  body("sex")
    .isIn(["Male", "Female"])
    .withMessage("sex must be Male Or Feamale"),
  body("phone").isMobilePhone("bn-BD").withMessage("phone must be valid"),
  body("imageLink").isURL().withMessage("imageLink must be valid"),
  body("bloodGroup")
    .optional()
    .isIn(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"])
    .withMessage("bloodGroup must be valid"),
];
module.exports = { getUserValidator, addUserValidator };
