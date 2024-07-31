const router = require("express").Router();
import {
  addTeacher,
  deleteTeacher,
  getTeacher,
  getTeachers,
  updateTeacher,
} from "../../controllers/TeacherController";
import {
  addTeacherValidator,
  getTeacherValidator,
} from "../../middlewares/TeacherValidator";
import validatorHandler from "../../middlewares/common/validatorHandler";

router.get("/", getTeachers);
router.get("/:uId", getTeacherValidator, validatorHandler, getTeacher);
router.post("/", addTeacherValidator, validatorHandler, addTeacher);
router.put("/:uId", getTeacherValidator, validatorHandler, updateTeacher);
router.delete("/:uId", getTeacherValidator, validatorHandler, deleteTeacher);

export default router;
