const router = require("express").Router();

import {
  addStudent,
  deleteStudent,
  getStudent,
  getStudents,
  updateStudent,
} from "../../controllers/studentcontroller";

import {
  addStudentValidator,
  getStudentValidator,
} from "../../middlewares/StudentValidator";

// Import validatorHandler
import validatorHandler from "../../middlewares/common/validatorHandler";

// Handle incoming HTTP requests to /students

router.get("/", getStudents);
router.get("/:uId", getStudentValidator, validatorHandler, getStudent);
router.post("/", addStudentValidator, validatorHandler, addStudent);
router.put("/:uId", getStudentValidator, validatorHandler, updateStudent);
router.delete("/:uId", getStudentValidator, validatorHandler, deleteStudent);

export default router;
