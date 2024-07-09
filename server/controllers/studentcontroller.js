const StudentFunction = require("./functions/studentfunction");

const getStudents = async (req, res) => {
  try {
    const students = await StudentFunction.getStudents(req);
    return res.status(200).json({ students });
  } catch (error) {
    // console.log(error.message);
    return res.status(500).json({ errors: { msg: "something went wrong" } });
  }
};

const getStudent = async (req, res) => {
  try {
    const student = await StudentFunction.getStudent(req);
    return res.status(200).json({ student });
  } catch (error) {
    // console.log(error.message);
    return res.status(500).json({ errors: { msg: "something went wrong" } });
  }
};

const addStudent = async (req, res) => {
  try {
    const student = await StudentFunction.addStudent(req);
    return res.status(200).json({ student });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ errors: { msg: "Something Went Wrong" } });
  }
};

const updateStudent = async (req, res) => {
  try {
    const student = await StudentFunction.updateStudent(req);
    return res.status(200).json({ student });
  } catch (error) {
    // console.log(error.message);
    return res.status(500).json({ errors: { msg: "something went wrong" } });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const student = await StudentFunction.deleteStudent(req);
    return res.status(200).json({ msg: "student deleted", student });
  } catch (error) {
    // console.log(error.message);
    return res.status(500).json({ errors: { msg: "something went wrong" } });
  }
};

module.exports = {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
  getStudent,
};
