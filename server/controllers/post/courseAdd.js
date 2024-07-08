const prisma = require("../../prisma/prismaClient");

const addCourse = async (req, res) => {
  try {
    const { courseName, courseCode, totalMarks, credit, classId } = req.body;
    const course = await prisma.courses.create({
      data: {
        name: courseName,
        courseCode,
        totalMarks,
        credit,
        class: {
          connect: {
            classId: parseInt(classId),
          },
        },
      },
    });
    return res
      .status(201)
      .json({ data: { course, msg: "Course added successfully" } });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = addCourse;
