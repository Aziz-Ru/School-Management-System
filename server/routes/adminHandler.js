const router = require("express").Router();

// Import AdminController

// Import validatorHandler

// Handle incoming HTTP requests to /admin

router.use("/class", require("./subroutes/ClassHandler"));
router.use("/teacher", require("./subroutes/TeacherHandler"));
router.use("/student", require("./subroutes/StudentHandler"));
router.use("/course", require("./subroutes/courseHandler"));
router.use("/school", require("./subroutes/schoolHandler"));

module.exports = router;
