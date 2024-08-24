import { Router } from "express";
import {
  addCourse,
  deleteCourse,
  getCourses,
  updateCourse,
} from "../../controllers/admin/course.controller.js";

const router = Router({ strict: true });

router.route("/").get(getCourses).post(addCourse).delete(deleteCourse);
router.route("/:courseId").put(updateCourse);

export default router;
