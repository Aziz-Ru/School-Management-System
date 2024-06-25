const router = require("express").Router();

const {
  getClasses,
  createClass,
  updateClass,
  deleteClass,
} = require("../controllers/ClassController");
const {
  addClassRoomValidator,
  updateClassRoomValidator,
} = require("../middlewares/ClassRoomValidator");

router.get("/", getClasses);
router.post("/", addClassRoomValidator, createClass);
router.put("/:id", updateClassRoomValidator, updateClass);
router.delete("/:id", deleteClass);

module.exports = router;
