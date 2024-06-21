const router = require("express").Router();

const { check } = require("express-validator");
const { getSchool, postSchool } = require("../controllers/SchoolController");
const { getSchoolData } = require("../middlewares/SchoolMid");
const {
  addSchoolValidator,
  addSchoolValidatorHandler,
} = require("../middlewares/SchoolValidator");

router.get("", getSchool);
router.post("", addSchoolValidator, addSchoolValidatorHandler, postSchool);
module.exports = router;
