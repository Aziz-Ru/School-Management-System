const prisma = require("../../prisma/prismaClient");

const deleteCourse = async (req, res) => {
  try {
    const { courseCode } = req.params;
    await prisma.courses.delete({
      where: {
        courseCode: courseCode,
      },
    });
    return res
      .status(200)
      .json({ data: { msg: "Course deleted successfully" } });
  } catch (error) {
    // console.log(error.message);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = deleteCourse;
