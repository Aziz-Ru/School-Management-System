const router = require("express").Router();
// Import StudentController
const {
  getStudents,
  addStudents,
} = require("../controllers/StudentController");
// Import StudentValidator
const {
  addStudentValidator,
} = require("../middlewares/StudentValidator");

// Import validatorHandler
const validatorHandler = require("../middlewares/common/validatorHandler");

// Handle incoming HTTP requests to /students

router.get("/", getStudents);

router.post(
  "/",
  addStudentValidator,
  validatorHandler,
  addStudents
);

module.exports = router;
