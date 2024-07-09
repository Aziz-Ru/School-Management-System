const router = require("express").Router();

const {
  getSchool,
  addSchool,
  deleteSchool,
} = require("../../controllers/SchoolController");

const {
  addSchoolValidator,
  getSchoolValidator,
} = require("../../middlewares/SchoolValidator");
const validatorHandler = require("../../middlewares/common/validatorHandler");

router.get("/", getSchool);
router.post("/", addSchoolValidator, validatorHandler, addSchool);
router.delete("/:id", getSchoolValidator, validatorHandler, deleteSchool);

module.exports = router;
