const prisma = require("../prisma/prismaClient");
const { connect } = require("../routes/StudentHandler");

const getStudents = async (req, res) => {
  try {
    const students = await prisma.student.findMany();
    return res.status(200).json({ data: students });
  } catch (error) {
    return res.status(500).json({ error: { message: "Something went wrong" } });
  }
};

const addStudents = async (req, res) => {
  const {
    roll,
    name,
    email,
    password,
    dob,
    sex,
    address,
    phone,
    imageLink,
    classroomId,
  } = req.body;
  try {
    const student = await prisma.student.create({
      data: {
        roll,
        name,
        email,
        password,
        dob,
        sex,
        address,
        phone,
        imageLink,
      },
      enrolledClass: {
        create: {
          connect: {
            name: classroomId,
          },
          year: new Date().getFullYear(),
        },
      },
    });

    res.status(201).json({ message: "Student added successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: { message: "Something went wrong" } });
  }
};

module.exports = { getStudents, addStudents };
