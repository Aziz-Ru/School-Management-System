const router = require("express").Router();

const { check } = require("express-validator");
const {
  getSchool,
  createSchool,
  deleteSchool,
} = require("../controllers/SchoolController");

const {
  addSchoolValidator,
  addSchoolValidatorHandler,
  deleteSchoolValidator,
  deleteSchoolValidatorHandler,
} = require("../middlewares/SchoolValidator");

router.get("", getSchool);
router.post("", addSchoolValidator, addSchoolValidatorHandler, createSchool);
router.delete(
  "/:id",
  deleteSchoolValidator,
  deleteSchoolValidatorHandler,
  deleteSchool
);
module.exports = router;
