const router = require("express").Router();

const {
  getClasses,
  addClass,
  updateClass,
  deleteClass,
} = require("../controllers/ClassController");
const {
  addClassValidatorHandler,
  addClassValidator,
  updateClassRoomValidator,
} = require("../middlewares/ClassValidator");

router.get("/", getClasses);
router.post("/", addClassValidator, addClassValidatorHandler, addClass);
router.put("/:id", updateClassRoomValidator, updateClass);
router.delete("/:id", deleteClass);

module.exports = router;
