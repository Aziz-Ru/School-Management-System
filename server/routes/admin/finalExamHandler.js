const router = require("express").Router();
import { exam } from "../../prisma/prismaClient";

router.get("/:classId", async (req, res) => {
  const exams = await exam.findMany({ type: "Final" });
  return res.status(200).json({ exams });
});
