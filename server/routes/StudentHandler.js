const router = require("express").Router();
const deleteStudent = require("../controllers/delete/studentDelete");
const { getStudents, getStudent } = require("../controllers/get/studentGetter");
const addStudent = require("../controllers/post/studentAdd");
// Import StudentController

const addUser = require("../controllers/post/userPostController");
const updateStudent = require("../controllers/update/studentUpdate");
const {
  addStudentValidator,
  getStudentValidator,
} = require("../middlewares/StudentValidator");

// Import validatorHandler
const validatorHandler = require("../middlewares/common/validatorHandler");

// Handle incoming HTTP requests to /students

router.get("/", getStudents);
router.get("/:userId", getStudentValidator, validatorHandler, getStudent);
router.post("/", addStudentValidator, validatorHandler, addStudent);
router.put("/:userId", getStudentValidator, validatorHandler, updateStudent);
router.delete("/:userId", getStudentValidator, validatorHandler, deleteStudent);

module.exports = router;
