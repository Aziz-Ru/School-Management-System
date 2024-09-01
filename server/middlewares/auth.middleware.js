import { check } from "express-validator";

export const authMiddleware = [
  check("uid").trim().notEmpty().withMessage("uid must be required"),
  check("password").trim().notEmpty().withMessage("uid must be required"),
  check("role")
    .isIn(["Admin", "Student", "Employee"])
    .withMessage("role must be required"),
];
