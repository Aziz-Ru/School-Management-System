const router = require("express").Router();
import {
  addCourse,
  deleteCourse,
  getCourses,
  getCoursesByClass,
  updateCourse,
} from "../../controllers/CourseController";
import { getClassValidator } from "../../middlewares/ClassValidator";
import validatorHandler from "../../middlewares/common/validatorHandler";
import {
  courseAddedValidator,
  getCourseValidator,
} from "../../middlewares/courseValidator";

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

export default router;
