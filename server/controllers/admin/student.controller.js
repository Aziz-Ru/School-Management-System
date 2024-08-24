import bcrypt from "bcryptjs";
import prisma from "../../prisma/db.js";

export const getStudents = async (req, res) => {
  try {
    const students = await prisma.student.findMany({});
    return res.status(200).json({ students });
  } catch (error) {
    return res.status(500).json({ errors: { msg: "Invalid Credential" } });
  }
};

export const getStudent = async (req, res) => {
  try {
    const { uid } = req.params;
    const student = await prisma.student.findUnique({
      where: { studentId: uid },
    });
    if (!student) {
      return res.status(400).json({ errors: { msg: "something went wrong" } });
    }
    return res.status(200).json({ student });
  } catch (error) {
    // console.log(error.message);
    return res.status(400).json({ errors: { msg: "something went wrong" } });
  }
};

export const addStudent = async (req, res) => {
  try {
    const { auto, password, ...inputs } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    if (!auto) {
      const student = await prisma.student.create({
        data: { password: hashPassword, ...inputs },
      });
      return res.status(200).json({ student });
    } else {

      
      const studentId = "";
      const student = await prisma.student.create({
        data: { password: hashPassword, studentId: studentId, ...inputs },
      });
      return res.status(200).json({ student });
    }
  } catch (error) {
    return res.status(400).json({ errors: { msg: "Something Went Wrong" } });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const student = await _updateStudent(req);
    return res.status(200).json({ student });
  } catch (error) {
    // console.log(error.message);
    return res.status(500).json({ errors: { msg: "something went wrong" } });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const student = await _deleteStudent(req);
    return res.status(200).json({ msg: "student deleted", student });
  } catch (error) {
    // console.log(error.message);
    return res.status(500).json({ errors: { msg: "something went wrong" } });
  }
};
