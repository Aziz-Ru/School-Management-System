
const prisma = require("../../prisma/prismaClient");

const selectedObject = {};

const getTeachers = async (req, res) => {
  try {
    const students = await prisma.user.findMany({ where: { role: "Teacher" } });
    return res.status(200).json({ data: { students } });
  } catch (error) {
    // console.log(error.message);
    return res
      .status(500)
      .json({ errors: { message: "Something went wrong" } });
  }
};


const getTeacher = async (req, res) => {
  const { userId } = req.params;
  try {
    const student = await prisma.user.findUnique({
      where: {
        userId: userId,
      },
    });
    return res.status(200).json({ data: { student } });
  } catch (error) {
    // console.log(error.message);
    return res.status(500).json({ errors: { msg: "Something went wrong" } });
  }
};

module.exports = { getTeacher, getTeachers };
