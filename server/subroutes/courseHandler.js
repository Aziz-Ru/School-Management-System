const router = require("express").Router();

const { getCourses } = require("../controllers/get/courseGetter");
const {
  courseAddedValidator,
  getCourseValidator,
} = require("../middlewares/courseValidator");

const validatorHandler = require("../middlewares/common/validatorHandler");
const addCourse = require("../controllers/post/courseAdd");
const updateCourse = require("../controllers/update/courseUpdate");
const deleteCourse = require("../controllers/delete/courseDelete");

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
