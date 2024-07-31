import { check, param } from "express-validator";
import prisma from "../prisma/prismaClient";

const addSchoolValidator = [
  check("id")
    .isInt()
    .isLength({ max: 4 })
    .withMessage("id field is required and minimum length is 4")
    .custom(async (value) => {
      try {
        const school = await prisma.school.findFirst({ where: { id: value } });
        if (school) {
          // console.log(school);
          return Promise.reject("id already exist");
        }
      } catch (error) {
        throw Promise.reject("Something Went Wrong");
      }
    })
    .withMessage("id already exist"),
  check("name").trim().notEmpty().withMessage("name field must be required"),
  check("email")
    .trim()
    .isEmail()
    .withMessage("email field must be required")
    .custom(async (value) => {
      try {
        const school = await prisma.school.findFirst({
          where: { email: value },
        });
        if (school) {
          // console.log(school);
          return Promise.reject("email already exist");
        }
      } catch (error) {
        return Promise.reject("Something Went Wrong");
      }
    })
    .withMessage("email already exist"),
  check("phone")
    .trim()
    .isMobilePhone("bn-BD")
    .withMessage("bd-phone field must be required")
    .custom(async (value) => {
      try {
        const school = await prisma.school.findFirst({
          where: { phone: value },
        });
        if (school) {
          // console.log(school);
          return Promise.reject("phone already exist");
        }
      } catch (error) {
        return Promise.reject("Something Went Wrong");
      }
    })
    .withMessage("phone already exist"),
  check("address")
    .trim()
    .notEmpty()
    .withMessage("address field must be required"),
];

const getSchoolValidator = [
  param("id")
    .isInt()
    .withMessage("id must be required")
    .trim()
    .custom(async (value) => {
      try {
        const school = await prisma.school.findUnique({
          where: { id: parseInt(value) },
        });
        // console.log(school);
        if (!school) {
          return Promise.reject("School not found");
        }
      } catch (error) {
        // console.log(error.message);
        return Promise.reject("Something Went Wrong");
      }
    }),
];

export default {
  addSchoolValidator,
  getSchoolValidator,
};
