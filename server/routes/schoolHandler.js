const router = require("express").Router();

const { getSchool, postSchool } = require("../controllers/SchoolController");
const { getSchoolData } = require("../middlewares/SchoolMid");
const prisma = require("../prisma/prismaClient");
router.get("", getSchool);
router.post("", getSchoolData, postSchool);
module.exports = router;
