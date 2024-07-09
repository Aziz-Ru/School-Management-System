const router = require("express").Router();
const { getClass, getClasses } = require("../../controllers/get/classGetter");

const addClass = require("../../controllers/post/classAdd");
const updateClass = require("../../controllers/update/classUpdateController");
const deleteClass = require("../../controllers/delete/classDeleteController");

const {
  addClassValidator,
  getClassValidator,
} = require("../../middlewares/ClassValidator");

const validatorHandler = require("../../middlewares/common/validatorHandler");

router.get("/", getClasses);

router.get("/:classId", getClassValidator, validatorHandler, getClass);
router.post("/", (req, res) => {
  res.send("mdg");
});
router.put("/:classId", getClassValidator, validatorHandler, updateClass);
router.delete("/:classId", getClassValidator, validatorHandler, deleteClass);

module.exports = router;
