const prisma = require("../prisma/prismaClient");
const CourseFunction = require("./functions/coursefunction");

const getCourses = async (req, res) => {
  try {
    const { classId } = req.params;
    const courses = await prisma.courses.findMany({
      where: {
        classId: classId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    return res.status(200).json({ courses });
  } catch (error) {
    return res.status(400).json({ errors: { msg: "something went wrong" } });
  }
};

const addCourse = async (req, res) => {
  try {
    const { classId } = req.params;
    const { name, totalMarks, credit } = req.body;
    const course = await prisma.courses.create({
      data: {
        name,
        courseId: `${name}-${classId}-${new Date().getFullYear()}`,
        totalMarks: parseInt(totalMarks),
        credit: parseInt(credit),
        class: {
          connect: {
            classId: classId,
          },
        },
      },
    });
    return res.status(200).json({ course, msg: "course added successfully" });
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(400).json({ errors: { msg: "Class Already Exist" } });
    }
    return res.status(400).json({ errors: { msg: "something went wrong" } });
  }
};

const updateCourse = async (req, res) => {
  try {
    const { classId, id } = req.params;
    const { name, totalMarks, credit } = req.body;

    const course = await prisma.courses.update({
      where: {
        id: id,
        classId: classId,
      },
      data: {
        name,
        totalMarks: parseInt(totalMarks),
        credit: parseInt(credit),
      },
    });
    return res.status(200).json({ course, msg: "course updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ errors: { msg: "something went wrong" } });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const { classId, id } = req.params;
    await prisma.courses.delete({
      where: {
        id: id,
        classId: classId,
      },
    });
    return res.status(200).json({ msg: "course deleted successfully" });
  } catch (error) {
    return res.status(400).json({ errors: { msg: "something went wrong" } });
  }
};

module.exports = {
  getCourses,
  addCourse,
  updateCourse,
  deleteCourse,
};
