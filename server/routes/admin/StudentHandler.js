const router = require("express").Router();

const {
  addStudent,
  updateStudent,
  deleteStudent,
  getStudents,
  getStudent,
} = require("../../controllers/studentcontroller");

const {
  addStudentValidator,
  getStudentValidator,
} = require("../../middlewares/StudentValidator");

// Import validatorHandler
const validatorHandler = require("../../middlewares/common/validatorHandler");

// Handle incoming HTTP requests to /students

router.get("/", getStudents);
router.get("/:id", getStudentValidator, validatorHandler, getStudent);
router.post("/", addStudentValidator, validatorHandler, addStudent);
router.put("/:userId", getStudentValidator, validatorHandler, updateStudent);
router.delete("/:userId", getStudentValidator, validatorHandler, deleteStudent);

module.exports = router;
