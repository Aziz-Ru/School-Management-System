const router = require("express").Router();

const {
  getSchool,
  createSchool,
  deleteSchool,
} = require("../controllers/SchoolController");

const {
  addSchoolValidator,
  deleteSchoolValidator,
  getSchoolValidator,
} = require("../middlewares/SchoolValidator");
const validatorHandler = require("../middlewares/common/validatorHandler");

router.get("", getSchool);
router.post("", addSchoolValidator, validatorHandler, createSchool);
router.delete("/:id", getSchoolValidator, validatorHandler, deleteSchool);

module.exports = router;
