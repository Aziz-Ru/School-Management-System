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

router.get("/", getCourses);
router.post("/", courseAddedValidator, validatorHandler, addCourse);
router.put("/:courseCode", getCourseValidator, validatorHandler, updateCourse);

router.delete(
  "/:courseCode",
  getCourseValidator,
  validatorHandler,
  deleteCourse
);

module.exports = router;
