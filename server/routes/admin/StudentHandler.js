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
router.get("/:uId", getStudentValidator, validatorHandler, getStudent);
router.post("/", addStudentValidator, validatorHandler, addStudent);
router.put("/:uId", getStudentValidator, validatorHandler, updateStudent);
router.delete("/:uId", getStudentValidator, validatorHandler, deleteStudent);

module.exports = router;
