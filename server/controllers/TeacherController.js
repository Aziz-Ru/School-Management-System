const prisma = require("../prisma/prismaClient");
const bcrypt = require("bcryptjs");

const selectedFields = {
  id: true,
  name: true,
  email: true,
  phone: true,
  sex: true,
  dob: true,
  address: true,
  imageLink: true,
  password: false,
  createdAt: false,
};

const getTeacher = async (req, res) => {
  try {
    const students = await prisma.teachers.findMany({
      select: selectedFields,
    });
    res.status(200).json({ data: { students, msg: "All teachers" } });
  } catch (error) {
    return res.status(500).json({ errors: { msg: "something went wrong" } });
  }
};

const getTeacherById = async (req, res) => {
  const { id } = req.params;
  try {
    const teacher = await prisma.teachers.findUnique({
      where: { id: id },
      select: selectedFields,
    });
    if (!teacher) {
      return res.status(404).json({ errors: { msg: "Teacher not found" } });
    }
    res.status(200).json({ data: { teacher, msg: "Teacher found" } });
  } catch (error) {
    return res.status(500).json({ errors: { msg: "something went wrong" } });
  }
};

const createTeacher = async (req, res) => {
  const {
    name,
    email,
    password,
    imageLink,
    qualification,
    rank,
    bio,
    dob,
    sex,
    address,
    phone,
  } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  try {
    const teacher = await prisma.teachers.create({
      data: {
        name,
        email,
        password: hashPassword,
        imageLink,
        qualification,
        rank,
        bio,
        dob,
        sex,
        address,
        phone,
      },
      select: selectedFields,
    });
    return res.status(201).json({ data: { teacher, msg: "Teacher created" } });
  } catch (error) {
    return res.status(500).json({ errors: { msg: "something went wrong" } });
  }
};
