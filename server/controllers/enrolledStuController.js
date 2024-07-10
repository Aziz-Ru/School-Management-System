const prisma = require("../prisma/prismaClient");

const getEnrolledStudents = async (req, res) => {
  try {
    const { classId, year } = req.params;
    const enrolledStudents = await prisma.enrollClass.findMany({
      where: { year: year, classId: classId },
      orderBy: { uId: "asc" },
    });
    return res.status(200).json({ enrolledStudents });
  } catch (error) {
    // console.log("error", error.message);
    return res.status(500).json({ errors: { msg: "Something Went Wrong" } });
  }
};

const addStudentsToClassByClassId = async (req, res) => {
  try {
    const { classId, year } = req.params;
    const { prevclassId, prevYear } = req.body;

    if (prevclassId > classId) {
      return res.status(400).json({
        errors: {
          msg: "Previous Class Id must be less than or equal to current class Id",
        },
      });
    }
    if (prevYear > year) {
      return res.status(400).json({
        errors: {
          msg: "Previous Year must be less than or equal to current year",
        },
      });
    }

    const student = await prisma.enrollClass.findMany({
      where: { classId: prevclassId, year: prevYear },
    });
    const updateStudent = student.map((student) => {
      return {
        ...student,
        classId: classId,
        year: year,
      };
    });
    const enrolledStudents = await prisma.enrollClass.updateMany({
      where: { classId: prevclassId, year: prevYear },
      data: updateStudent,
    });
    return res.status(200).json({ enrolledStudents });
  } catch (error) {
    console.log("error", error.message);
    return res.status(500).json({ errors: { msg: "Something Went Wrong" } });
  }
};

module.exports = { getEnrolledStudents, addStudentsToClassByClassId };
