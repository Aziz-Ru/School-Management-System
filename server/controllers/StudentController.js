const prisma = require("../prisma/prismaClient");

const getStudents = async (req, res) => {
  try {
    const students = await prisma.student.findMany();
    res.status(200).json({ data: students });
  } catch (error) {
    res.status(500).json({ error: { message: "Something went wrong" } });
  }
};

const createStudents= async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const student = await prisma.student.create({
      data: {
        name,
        email,
        age,
      },
    });
    res.status(201).json({ data: student });
  } catch (error) {
    res.status(500).json({ error: { message: "Something went wrong" } });
  }
};

module.exports = { getStudents };
