const prisma = require("../prisma/prismaClient");
const bcrypt = require("bcryptjs");



const addStudents = async (req, res) => {
  // destructuring the request body
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

  // parsing the classId to integer
  const intClassId = parseInt(classId);

  // calculating the starting roll number
  let startingRoll = (new Date(dob).getFullYear() % 100) * 1000;
  if (intClassId < 10) {
    startingRoll += intClassId * 100;
  } else {
    startingRoll += intClassId * 10;
  }

  try {
    // hashing the password
    const hashPassword = await bcrypt.hash(password, 10);
    // finding the enrolled students in the class
    const enrolledstudents = await prisma.students.findMany({
      where: {
        enrollClass: {
          classId: intClassId,
          year: String(new Date(dob).getFullYear()),
        },
      },
    });
    // calculating the roll number
    const roll = `${startingRoll + enrolledstudents.length + 1}`;
    // upserting the enrollClass
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
    // creating the student
    const student = await prisma.students.create({
      data: {
        roll,
        name,
        email,
        password: hashPassword,
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
      select: {
        roll: true,
        name: true,
        email: true,
        dob: true,
        sex: true,
        phone: true,
        enrollClassId: true,
      },
    });

    student.className = classId;
    // sending the response

    return res
      .status(201)
      .json({ data: { student, msg: "Student added successfully" } });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ errors: { msg: "Something went wrong" } });
  }
};

const updateStudent = async (req, res) => {
  const { roll } = req.params;
  try {
    const student = await prisma.students.update({
      where: {
        roll: roll,
      },
      data: req.body,
      select: {
        id: true,
        roll: true,
        name: true,
        email: true,
        dob: true,
        address: true,
        phone: true,
        imageLink: true,
        enrollClassId: true,
        password: false,
        createdAt: false,
      },
    });
    return res
      .status(200)
      .json({ data: { student, msg: "Student updated successfully" } });
  } catch (error) {
    return res.status(500).json({ errors: { msg: "Something went wrong" } });
  }
};

const deleteStudent = async (req, res) => {
  const { roll } = req.params;
  try {
    await prisma.students.delete({
      where: {
        roll: roll,
      },
    });
    return res
      .status(200)
      .json({ data: { msg: "Student deleted successfully" } });
  } catch (error) {
    return res.status(500).json({ errors: { msg: "Something went wrong" } });
  }
};

module.exports = {
  getStudents,
  addStudents,
  getOneStudent,
  updateStudent,
  deleteStudent,
};
