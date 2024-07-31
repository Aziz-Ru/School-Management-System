import {
  addTeacher as _addTeacher,
  deleteTeacher as _deleteTeacher,
  getTeacher as _getTeacher,
  getTeachers as _getTeachers,
  updateTeacher as _updateTeacher,
} from "./functions/teacherfunction";

const getTeachers = async (req, res) => {
  try {
    const teacher = await _getTeachers(req);
    return res.status(200).json({ teacher });
  } catch (error) {
    // console.log(error.message);
    return res.status(500).json({ errors: { msg: "something went wrong" } });
  }
};

const getTeacher = async (req, res) => {
  try {
    const teacher = await _getTeacher(req);
    return res.status(200).json({ teacher });
  } catch (error) {
    // console.log(error.message);
    return res.status(500).json({ errors: { msg: "something went wrong" } });
  }
};

const addTeacher = async (req, res) => {
  try {
    const teacher = await _addTeacher(req);
    return res.status(200).json({ teacher });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ errors: { msg: "Something Went Wrong" } });
  }
};

const updateTeacher = async (req, res) => {
  try {
    const student = await _updateTeacher(req);
    return res.status(200).json({ student });
  } catch (error) {
    // console.log(error.message);
    return res.status(500).json({ errors: { msg: "something went wrong" } });
  }
};

const deleteTeacher = async (req, res) => {
  try {
    const student = await _deleteTeacher(req);
    return res
      .status(200)
      .json({ msg: "Teacher Deleted Successfully", student });
  } catch (error) {
    // console.log(error.message);
    return res.status(500).json({ errors: { msg: "something went wrong" } });
  }
};

export default {
  getTeacher,
  getTeachers,
  addTeacher,
  updateTeacher,
  deleteTeacher,
};
