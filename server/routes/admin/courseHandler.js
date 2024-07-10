const router = require("express").Router();
const {
  courseAddedValidator,
  getCourseValidator,
} = require("../../middlewares/courseValidator");
const validatorHandler = require("../../middlewares/common/validatorHandler");
const {
  getCourses,
  getCoursesByClass,
  addCourse,
  updateCourse,
  deleteCourse,
} = require("../../controllers/CourseController");
const { getClassValidator } = require("../../middlewares/ClassValidator");

router.get("/", getCourses);
router.get("/:classId", getClassValidator, validatorHandler, getCoursesByClass);

router.post("/", courseAddedValidator, validatorHandler, addCourse);
router.put(
  "/:classId/:courseCode",
  getClassValidator,
  getCourseValidator,
  validatorHandler,
  updateCourse
);

router.delete(
  "/:classId/:courseCode",
  getClassValidator,
  validatorHandler,
  deleteCourse
);

module.exports = router;
