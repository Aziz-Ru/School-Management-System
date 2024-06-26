const router = require("express").Router();

const {
  getClasses,
  addClass,
  updateClass,
  deleteClass,
  getClass,
} = require("../controllers/ClassController");
const {
  addClassValidator,
  updateValidator,
  getClassValidator,
} = require("../middlewares/ClassValidator");

const validatorHandler = require("../middlewares/common/validatorHandler");

router.get("/", getClasses);
router.get("/:id", getClassValidator, validatorHandler, getClass);
router.post("/", addClassValidator, validatorHandler, addClass);
router.put("/:id", updateValidator, validatorHandler, updateClass);
router.delete("/:id", getClassValidator, validatorHandler, deleteClass);

module.exports = router;
