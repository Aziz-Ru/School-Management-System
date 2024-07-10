const router = require("express").Router();

const {
  getClass,
  getClasses,
  addClass,
  updateClass,
  deleteClass,
} = require("../../controllers/ClassController");
const {
  addCourse,
  getCourses,
  updateCourse,
  deleteCourse,
} = require("../../controllers/CourseController");
const {
  getEnrolledStudents,
  addStudentsToClassByClassId,
} = require("../../controllers/enrolledStuController");
const { getExams } = require("../../controllers/ExamController");

const {
  addClassValidator,
  getClassValidator,
} = require("../../middlewares/ClassValidator");

const validatorHandler = require("../../middlewares/common/validatorHandler");
const {
  courseAddedValidator,
  getCourseValidator,
} = require("../../middlewares/courseValidator");
const {
  enrolledStudentValidator,
} = require("../../middlewares/enrollesStudValidator");

router.get("/", getClasses);
router.get("/:classId", getClassValidator, validatorHandler, getClass);
router.post("/", addClassValidator, validatorHandler, addClass);
router.put("/:classId", getClassValidator, validatorHandler, updateClass);
router.delete("/:classId", getClassValidator, validatorHandler, deleteClass);

// Handler Enrolled Students

router.get(
  "/:classId/students/:year",
  getClassValidator,
  validatorHandler,
  getEnrolledStudents
);

router.post(
  "/:classId/students/:year",
  getClassValidator,
  enrolledStudentValidator,
  validatorHandler,
  addStudentsToClassByClassId
);

// router.post(
//   "/:classId/students/:year",
//   getClassValidator,
//   validatorHandler,
// )

// Handle Course
// get all courses
router.get(
  "/:classId/courses/",
  getClassValidator,
  validatorHandler,
  getCourses
);
// added new course
router.post(
  "/:classId/courses/",
  getClassValidator,
  courseAddedValidator,
  validatorHandler,
  addCourse
);
// update course
router.put(
  "/:classId/courses/:id",
  getClassValidator,
  getCourseValidator,
  validatorHandler,
  updateCourse
);

// course delete
router.delete(
  "/:classId/courses/:id",
  getClassValidator,
  getCourseValidator,
  validatorHandler,
  deleteCourse
);

// ExamHandler

router.get("/:classId/exams/", getExams);

module.exports = router;
