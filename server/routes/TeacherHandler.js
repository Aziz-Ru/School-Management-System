const { addTeacherValidator } = require("../middlewares/TeacherValidator");
const validatorHandler = require("../middlewares/common/validatorHandler");

const router = require("express").Router();

router.post("/", addTeacherValidator, validatorHandler, (req, res) => {
  res.send("Teacher Route");
});

module.exports = router;
