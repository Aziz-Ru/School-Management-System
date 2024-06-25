const router = require("express").Router();
const {
  getStudents,
  addStudents,
} = require("../controllers/StudentController");
const {
  addStudentValidator,
  addStudentValidatorHandler,
} = require("../middlewares/StudentValidator");
const ClassChecker = require("../checker/ClassChecker");
const prisma = require("../prisma/prismaClient");

router.get("/", getStudents);

router.post(
  "/",
  addStudentValidator,
  ClassChecker,
  addStudentValidatorHandler,
  addStudents
);

module.exports = router;
