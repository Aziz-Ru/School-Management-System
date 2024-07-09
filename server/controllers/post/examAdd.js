const prisma = require("../../prisma/prismaClient");

const examAdd = async (req, res) => {
  try {
    const courses = await prisma.courses.findMany({
      where: { classId: parseInt(req.body.classId) },
    });
    // const { name, year } = req.body;
    // const exam = await prisma.exam.create({
    //   data: {
    //     name,
    //     year,
    //   },
    // });
    res.status(201).json({ data: courses, msg: "Exam Added Successfully" });
  } catch (error) {
    res.status(400).json({ errors: { msg: "Something Went Wrong" } });
  }
};

module.exports = examAdd;
