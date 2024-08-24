import { check } from "express-validator";

export const addNoticeValidator = [
  check("title").trim().notEmpty().withMessage("title must required"),
  check("content").trim().notEmpty().withMessage("content must required"),
  check("date")
    .trim()
    .isDate({ format: "YYYY/MM/DD", })
    .withMessage("date must be valid date"),
];
