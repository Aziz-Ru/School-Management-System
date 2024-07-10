const router = require("express").Router();

// Import AdminController

// Import validatorHandler

// Handle incoming HTTP requests to /admin

router.use("/class", require("./admin/ClassHandler"));
router.use("/teacher", require("./admin/TeacherHandler"));
router.use("/student", require("./admin/StudentHandler"));
router.use("/school", require("./admin/schoolHandler"));
// router.use("/exam", require("./admin/examHandler"));

module.exports = router;
