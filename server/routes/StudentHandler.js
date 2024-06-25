const router = require("express").Router();
const { getStudents } = require("../controllers/StudentController");
const prisma = require("../prisma/prismaClient");

router.get("/", getStudents);

router.post("/", async (req, res) => {});

module.exports = router;
