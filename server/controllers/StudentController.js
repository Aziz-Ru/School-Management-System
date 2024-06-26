const prisma = require("../prisma/prismaClient");
const { connect } = require("../routes/StudentHandler");

const getStudents = async (req, res) => {
  try {
    // await prisma.classes.deleteMany();
    const students = await prisma.students.findMany();
    return res.status(200).json({ data: { students } });
  } catch (error) {
    return res.status(500).json({ error: { message: "Something went wrong" } });
  }
};

const addStudents = async (req, res) => {
  const {
    name,
    email,
    password,
    dob,
    sex,
    address,
    phone,
    imageLink,
    classId,
  } = req.body;
  const intClassId = parseInt(classId);
  let startingRoll = (new Date(dob).getFullYear() % 100) * 1000;
  if (intClassId < 10) {
    startingRoll += intClassId * 100;
  } else {
    startingRoll += intClassId * 10;
  }

  try {
    const enrolledstudents = await prisma.students.findMany({
      where: {
        enrollClass: {
          classId: intClassId,
          year: String(new Date(dob).getFullYear()),
        },
      },
    });

    const roll = `${startingRoll + enrolledstudents.length + 1}`;
    const enrollClass = await prisma.enrollClasses.upsert({
      where: {
        classId_year: {
          classId: parseInt(classId),
          year: String(new Date(dob).getFullYear()),
        },
      },
      update: {},
      create: {
        classId: parseInt(classId),
        year: String(new Date(dob).getFullYear()),
      },
    });

    const student = await prisma.students.create({
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
        enrollClass: {
          connect: {
            id: enrollClass.id,
          },
        },
      },
    });

    res
      .status(201)
      .json({ data: { student, msg: "Student added successfully" } });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ errors: { msg: "Something went wrong" } });
  }
};

module.exports = { getStudents, addStudents };
