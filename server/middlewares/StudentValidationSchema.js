import { body } from "express-validator";

const StudentValidationSchema = [body("name").isString()];
