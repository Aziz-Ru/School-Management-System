const { body, param } = require("express-validator");
const prisma = require("../prisma/prismaClient");

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

const addStudentValidator = [
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
    .isIn(["Student"])
    .withMessage("role must be either Student, Teacher or Admin"),
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
  body("classId")
    .isInt({ min: 1, max: 12 })
    .withMessage("classId must be valid"),
];

module.exports = { addStudentValidator, getStudentValidator };
