import prisma from "../prisma/prismaClient";

const getExams = async (req, res) => {
  try {
    const { classId } = req.body;
    const exams = await prisma.exam.findMany({
      where: { classId: classId },
      orderBy: { year: "desc" },
    });
    return res.status(200).json({ exams });
  } catch (error) {
    return res.status(500).json({ errors: { msg: "Something Went Wrong" } });
  }
};

export default { getExams };
