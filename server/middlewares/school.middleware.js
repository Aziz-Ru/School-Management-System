import { check } from "express-validator";

export const addSchoolValidator = [
  check("name").trim().notEmpty().withMessage("name field must be required"),
  check("email").trim().isEmail().withMessage("email field must be required"),
  check("phone")
    .trim()
    .isMobilePhone("bn-BD")
    .withMessage("phone field must be required"),
  check("address")
    .trim()
    .notEmpty()
    .withMessage("address field must be required"),
  check("message")
    .optional({ checkFalsy: true })
    .trim()
    .notEmpty()
    .withMessage("message field must be required"),
  check("schoolCode")
    .trim()
    .notEmpty()
    .withMessage("schoolCode must be required"),
  check("EIIN").trim().notEmpty().withMessage("schoolCode must be required"),
  check("imageURL")
    .optional()
    .trim()
    .isURL()
    .withMessage("image url must be valid"),
];
