import prisma from "../prisma/prismaClient";

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

    const students = await prisma.enrollClass.updateMany({
      where: { classId: prevclassId, year: prevYear },
      data: { classId: classId, year: year },
    });

    return res
      .status(200)
      .json({ students, msg: "Students Added Successfully" });
  } catch (error) {
    // console.log("error", error.message);
    return res.status(500).json({ errors: { msg: "Something Went Wrong" } });
  }
};

const deleteStudentsFromClassById = async (req, res) => {
  try {
    const { classId, year } = req.params;
    const { uId } = req.body;
    const exstudent = await prisma.enrollClass.findUnique({
      where: { year_uId_classId: { year: year, uId: uId, classId: classId } },
    });
    if (!exstudent) {
      return res.status(400).json({
        errors: {
          msg: "Student is not enrolled in this class",
        },
      });
    }

    const student = await prisma.enrollClass.delete({
      where: { year_uId_classId: { year: year, uId: uId, classId: classId } },
    });

    return res
      .status(200)
      .json({ student, msg: "Student Deleted Successfully" });
  } catch (error) {
    // console.log("error", error.message);
    return res.status(500).json({ errors: { msg: "Something Went Wrong" } });
  }
};

export default {
  getEnrolledStudents,
  addStudentsToClassByClassId,
  deleteStudentsFromClassById,
};
