const prisma = require("../../prisma/prismaClient");

const getExams = async (req, res) => {
  try {
    const exams = await prisma.exam.findMany({ orderBy: { year: "desc" } });
    res.status(200).json({ data: exams });
  } catch (error) {
    res.status(400).json({ errors: { msg: "Something Went Wrong" } });
  }
};

const getExam = async (req, res) => {
  try {
    const exam = await prisma.exam.findUnique({ where: { id: req.params.id } });
    res.status(200).json({ data: exam });
  } catch (error) {
    res.status(400).json({ errors: { msg: "Something Went Wrong" } });
  }
};

module.exports = { getExams, getExam };
