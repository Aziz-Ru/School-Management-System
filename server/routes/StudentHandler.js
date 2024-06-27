const router = require("express").Router();
// Import StudentController
const {
  getStudents,
  addStudents,
  getOneStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/StudentController");
// Import StudentValidator
const {
  addStudentValidator,
  getStudentValidator,
} = require("../middlewares/StudentValidator");

// Import validatorHandler
const validatorHandler = require("../middlewares/common/validatorHandler");

// Handle incoming HTTP requests to /students

router.get("/", getStudents);
router.get("/:roll", getStudentValidator, validatorHandler, getOneStudent);
router.post("/", addStudentValidator, validatorHandler, addStudents);
router.put("/:roll", getStudentValidator, validatorHandler, updateStudent);
router.delete("/:roll", getStudentValidator, validatorHandler, deleteStudent);
module.exports = router;
