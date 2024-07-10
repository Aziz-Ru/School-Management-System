const router = require("express").Router();
const prisma = require("../../prisma/prismaClient");

router.get("/:classId", async (req, res) => {
  const exams = await prisma.exam.findMany({ type: "Final" });
  return res.status(200).json({ exams });
});
