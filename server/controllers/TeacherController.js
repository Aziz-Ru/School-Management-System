const TeacherFunction = require("./functions/teacherfunction");

const getTeachers = async (req, res) => {
  try {
    const teacher = await TeacherFunction.getTeachers(req);
    return res.status(200).json({ teacher });
  } catch (error) {
    // console.log(error.message);
    return res.status(500).json({ errors: { msg: "something went wrong" } });
  }
};

const getTeacher = async (req, res) => {
  try {
    const teacher = await TeacherFunction.getTeacher(req);
    return res.status(200).json({ teacher });
  } catch (error) {
    // console.log(error.message);
    return res.status(500).json({ errors: { msg: "something went wrong" } });
  }
};

const addTeacher = async (req, res) => {
  try {
    const teacher = await TeacherFunction.addTeacher(req);
    return res.status(200).json({ teacher });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ errors: { msg: "Something Went Wrong" } });
  }
};

const updateTeacher = async (req, res) => {
  try {
    const student = await TeacherFunction.updateTeacher(req);
    return res.status(200).json({ student });
  } catch (error) {
    // console.log(error.message);
    return res.status(500).json({ errors: { msg: "something went wrong" } });
  }
};

const deleteTeacher = async (req, res) => {
  try {
    const student = await TeacherFunction.deleteTeacher(req);
    return res
      .status(200)
      .json({ msg: "Teacher Deleted Successfully", student });
  } catch (error) {
    // console.log(error.message);
    return res.status(500).json({ errors: { msg: "something went wrong" } });
  }
};

module.exports = {
  getTeacher,
  getTeachers,
  addTeacher,
  updateTeacher,
  deleteTeacher,
};
