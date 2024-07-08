const router = require("express").Router();
const {
  getClass,
  getClasses,
} = require("../controllers/get/classGetController");

const addClass = require("../controllers/post/classPostController");
const updateClass = require("../controllers/update/classUpdateController");
const deleteClass = require("../controllers/delete/classDeleteController");

const {
  addClassValidator,
  getClassValidator,
} = require("../middlewares/ClassValidator");

const validatorHandler = require("../middlewares/common/validatorHandler");


router.get("/", getClasses);
router.get("/:classId", getClassValidator, validatorHandler, getClass);
router.post("/", addClassValidator, validatorHandler, addClass);
router.put("/:classId", getClassValidator, validatorHandler, updateClass);
router.delete("/:classId", getClassValidator, validatorHandler, deleteClass);


module.exports = router;
