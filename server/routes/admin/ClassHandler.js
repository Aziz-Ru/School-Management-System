const router = require("express").Router();

const {
  getClass,
  getClasses,
  addClass,
  updateClass,
  deleteClass,
} = require("../../controllers/ClassController");

const {
  addClassValidator,
  getClassValidator,
} = require("../../middlewares/ClassValidator");

const validatorHandler = require("../../middlewares/common/validatorHandler");

router.get("/", getClasses);

router.get("/:classId", getClassValidator, validatorHandler, getClass);
router.post("/", addClassValidator, validatorHandler, addClass);
router.put("/:classId", getClassValidator, validatorHandler, updateClass);
router.delete("/:classId", getClassValidator, validatorHandler, deleteClass);

module.exports = router;
