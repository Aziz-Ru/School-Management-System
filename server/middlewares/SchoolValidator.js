const { check, validationResult, param } = require("express-validator");
const prisma = require("../prisma/prismaClient");
const createError = require("http-errors");
const addSchoolValidator = [
  check("id")
    .trim()
    .isLength({ min: 4 })
    .withMessage("id field is required and minimum length is 4")
    .custom(async (value) => {
      try {
        const school = await prisma.school.findFirst({ where: { id: value } });
        if (school) {
          // console.log(school);
          throw createError("id already exist");
        }
      } catch (error) {
        throw createError("Something Went Wrong");
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
          throw createError("email already exist");
        }
      } catch (error) {
        throw createError("Something Went Wrong");
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
          throw createError("phone number already exist");
        }
      } catch (error) {
        throw createError("Something Went Wrong");
      }
    })
    .withMessage("phone already exist"),
  check("address")
    .trim()
    .notEmpty()
    .withMessage("address field must be required"),
  check("establishAt")
    .trim()
    .isDate()
    .withMessage("establishAt field must be date(year-month-date)"),
];

const deleteSchoolValidator = [
  check("id")
    .notEmpty()
    .withMessage("id must be required")
    .trim()
    .custom(async (value) => {
      try {
        const schoolId = await prisma.school.findUnique({
          where: { id: value },
        });
        console.log(schoolId);
        if (!schoolId) {
          throw createError("School id is not Found");
        }
      } catch (error) {
        console.log(error);
      }
    }),
];

const addSchoolValidatorHandler = (req, res, next) => {
  const error = validationResult(req);
  const mperror = error.mapped();
  if (!error.isEmpty()) {
    return res.status(400).json({ error: mperror });
  }
  next();
};

const deleteSchoolValidatorHandler = (req, res, next) => {
  const error = validationResult(req);
  const mperror = error.mapped();
  if (!error.isEmpty()) {
    return res.status(400).json({ error: mperror });
  }
  next();
};

module.exports = {
  addSchoolValidator,
  deleteSchoolValidator,
  addSchoolValidatorHandler,
  deleteSchoolValidatorHandler,
};
