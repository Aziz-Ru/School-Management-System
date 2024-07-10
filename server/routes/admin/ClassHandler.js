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
} = require("../../controllers/enrolledStuController");

const {
  addClassValidator,
  getClassValidator,
} = require("../../middlewares/ClassValidator");

const validatorHandler = require("../../middlewares/common/validatorHandler");
const {
  courseAddedValidator,
  getCourseValidator,
} = require("../../middlewares/courseValidator");

router.get("/", getClasses);
router.get("/:classId", getClassValidator, validatorHandler, getClass);
router.post("/", addClassValidator, validatorHandler, addClass);
router.put("/:classId", getClassValidator, validatorHandler, updateClass);
router.delete("/:classId", getClassValidator, validatorHandler, deleteClass);
// Handler Enrolled Students
router.get("/:classId/students/:year", getEnrolledStudents);

// Handle Course

router.get(
  "/:classId/courses/",
  getClassValidator,
  validatorHandler,
  getCourses
);

router.post(
  "/:classId/courses/",
  courseAddedValidator,
  validatorHandler,
  addCourse
);

router.put(
  "/:classId/courses/:id",
  getClassValidator,
  getCourseValidator,
  validatorHandler,
  updateCourse
);

router.delete(
  "/:classId/courses/:id",
  getClassValidator,
  getCourseValidator,
  validatorHandler,
  deleteCourse
);

module.exports = router;
