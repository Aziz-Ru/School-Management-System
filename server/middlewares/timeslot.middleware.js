import { body } from "express-validator";

export const timeslotValidator = [
  body("starTime")
    .isInt({ max: 12, min: 1 })
    .withMessage("starTime valid day time"),
  body("endTime")
    .isInt({ max: 12, min: 1 })
    .withMessage("endTime valid day time"),
  body("dayName")
    .isIn(["SAT", "SUN", "MON", "TUE", "WED", "THU", "FRI"])
    .withMessage("Day name like SAT,SUN..."),
  body("abbreviation")
    .isIn(["AM", "PM"])
    .withMessage("AM or PM abbreviation required"),
  body("courseName").isString().withMessage("courseName is required"),
];
