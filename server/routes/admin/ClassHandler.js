const router = require("express").Router();

import {
  addClass,
  deleteClass,
  getClass,
  getClasses,
  updateClass,
} from "../../controllers/ClassController";
import {
  addCourse,
  deleteCourse,
  getCourses,
  updateCourse,
} from "../../controllers/CourseController";
import {
  addStudentsToClassByClassId,
  deleteStudentsFromClassById,
  getEnrolledStudents,
} from "../../controllers/enrolledStuController";
import { getExams } from "../../controllers/ExamController";

import {
  addClassValidator,
  getClassValidator,
} from "../../middlewares/ClassValidator";

import validatorHandler from "../../middlewares/common/validatorHandler";
import {
  courseAddedValidator,
  getCourseValidator,
} from "../../middlewares/courseValidator";
import { enrolledStudentValidator } from "../../middlewares/enrollesStudValidator";

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

router.delete(
  "/:classId/students/:year",
  getClassValidator,
  validatorHandler,
  deleteStudentsFromClassById
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

export default router;
