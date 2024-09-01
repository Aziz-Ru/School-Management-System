import { Router } from "express";
import {
  addStudent,
  deleteStudent,
  getStudents,
} from "../../controllers/admin/student.controller.js";

const router = Router({ strict: true });

router.route("/").get(getStudents).post(addStudent).delete(deleteStudent);

export default router;
