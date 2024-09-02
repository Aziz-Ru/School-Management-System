import { body } from "express-validator";

export const addDayValidator = [
  body("dayName")
    .isIn(["SAT", "SUN", "MON", "TUE", "WED", "THU", "FRI"])
    .withMessage("Day name like SAT,SUN..."),
];
