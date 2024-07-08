const prisma = require("../../prisma/prismaClient");

const getCourses = async (req, res) => {
  try {
    const courses = await prisma.courses.findMany();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = { getCourses };
