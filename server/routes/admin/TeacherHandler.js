const router = require("express").Router();
const {
  getTeachers,
  getTeacher,
  addTeacher,
  updateTeacher,
  deleteTeacher,
} = require("../../controllers/TeacherController");
const {
  addTeacherValidator,
  getTeacherValidator,
} = require("../../middlewares/TeacherValidator");
const validatorHandler = require("../../middlewares/common/validatorHandler");

router.get("/", getTeachers);
router.get("/:uId", getTeacherValidator, validatorHandler, getTeacher);
router.post("/", addTeacherValidator, validatorHandler, addTeacher);
router.put("/:uId", getTeacherValidator, validatorHandler, updateTeacher);
router.delete("/:uId", getTeacherValidator, validatorHandler, deleteTeacher);

module.exports = router;
