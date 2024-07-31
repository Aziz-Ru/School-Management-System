import { getStudents as _getStudents, getStudent as _getStudent, addStudent as _addStudent, updateStudent as _updateStudent, deleteStudent as _deleteStudent } from "./functions/studentfunction";

const getStudents = async (req, res) => {
  try {
    const students = await _getStudents(req);
    return res.status(200).json({ students });
  } catch (error) {
    // console.log(error.message);
    return res.status(500).json({ errors: { msg: "something went wrong" } });
  }
};

const getStudent = async (req, res) => {
  try {
    const student = await _getStudent(req);
    return res.status(200).json({ student });
  } catch (error) {
    // console.log(error.message);
    return res.status(500).json({ errors: { msg: "something went wrong" } });
  }
};

const addStudent = async (req, res) => {
  try {
    const student = await _addStudent(req);
    return res.status(200).json({ student });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ errors: { msg: "Something Went Wrong" } });
  }
};

const updateStudent = async (req, res) => {
  try {
    const student = await _updateStudent(req);
    return res.status(200).json({ student });
  } catch (error) {
    // console.log(error.message);
    return res.status(500).json({ errors: { msg: "something went wrong" } });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const student = await _deleteStudent(req);
    return res.status(200).json({ msg: "student deleted", student });
  } catch (error) {
    // console.log(error.message);
    return res.status(500).json({ errors: { msg: "something went wrong" } });
  }
};

export default {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
  getStudent,
};
