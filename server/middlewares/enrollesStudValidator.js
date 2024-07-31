import { body } from "express-validator";

const enrolledStudentValidator = [
  body("prevclassId")
    .isInt({ max: 12, min: 1 })
    .withMessage("Previous Class Id must be between 1 and 12"),
  body("prevYear")
    .isInt({ min: 2000, max: 2050 })
    .withMessage("Year must be between 2000 and 2050"),
];

export default { enrolledStudentValidator };
