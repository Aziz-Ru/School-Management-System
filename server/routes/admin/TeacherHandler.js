const router = require("express").Router();
const deleteTeacher = require("../../controllers/delete/teacherDelete");
const {
  getTeachers,
  getTeacher,
} = require("../../controllers/get/teacherGetter");
const addTeacher = require("../../controllers/post/teacherAdd");
const updateTeacher = require("../../controllers/update/teacherUpdate");
const {
  addTeacherValidator,
  getTeacherValidator,
} = require("../../middlewares/TeacherValidator");
const validatorHandler = require("../../middlewares/common/validatorHandler");

router.get("/", getTeachers);
router.get("/:userId", getTeacherValidator, validatorHandler, getTeacher);
router.post("/", addTeacherValidator, validatorHandler, addTeacher);
router.put("/:userId", getTeacherValidator, validatorHandler, updateTeacher);
router.delete("/:userId", getTeacherValidator, validatorHandler, deleteTeacher);

module.exports = router;
