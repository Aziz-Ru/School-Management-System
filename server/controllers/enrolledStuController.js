const prisma = require("../prisma/prismaClient");

const getEnrolledStudents = async (req, res) => {
  try {
    const { classId, year } = req.params;
    const enrolledStudents = await prisma.enrollClass.findMany({
      where: { year: year, classId: classId },
    });
    return res.status(200).json({ enrolledStudents });
  } catch (error) {
    // console.log("error", error.message);
    return res.status(500).json({ errors: { msg: "Something Went Wrong" } });
  }
};

module.exports = { getEnrolledStudents };
