const router = require("express").Router();
// Import StudentController
const {
  getStudents,
  addStudents,
  getOneStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/StudentController");
const addUser = require("../controllers/post/userPostController");

// Import validatorHandler
const validatorHandler = require("../middlewares/common/validatorHandler");
const { addUserValidator } = require("../middlewares/userValidator");

// Handle incoming HTTP requests to /students

// router.get("/", getStudents);
// router.get("/:userId", getStudentValidator, validatorHandler, getOneStudent);
router.post("/", addUserValidator, validatorHandler, addUser);
// router.put("/:userId", getStudentValidator, validatorHandler, updateStudent);
// router.delete("/:userId", getStudentValidator, validatorHandler, deleteStudent);

module.exports = router;
