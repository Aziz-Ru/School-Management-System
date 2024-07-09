const { getExams } = require("../../controllers/get/examGetter");
const examAdd = require("../../controllers/post/examAdd");
const validatorHandler = require("../../middlewares/common/validatorHandler");
const examValidator = require("../../middlewares/examValidator");

const router = require("express").Router();

router.get("/", getExams);
router.post("/", examValidator, validatorHandler, examAdd);

module.exports = router;
