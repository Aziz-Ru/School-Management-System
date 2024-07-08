const prisma = require("../../prisma/prismaClient");

const updateCourse = async (req, res) => {
  try {
    const { courseCode } = req.params;
    const { courseName, totalMarks, credit } = req.body;

    const course = await prisma.courses.update({
      where: {
        courseCode: courseCode,
      },
      data: {
        name: courseName,
        totalMarks,
        credit,
      },
    });
    return res
      .status(200)
      .json({ data: { course, msg: "Course updated successfully" } });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = updateCourse;
