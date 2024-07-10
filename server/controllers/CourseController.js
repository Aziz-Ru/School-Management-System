const CourseFunction = require("./functions/coursefunction");

const getCourses = async (req, res) => {
  try {
    const course = await CourseFunction.getCourses(req);
    return res.status(200).json({ course });
  } catch (error) {
    return res.status(400).json({ errors: { msg: "something went wrong" } });
  }
};

const getCoursesByClass = async (req, res) => {
  try {
    const course = await CourseFunction.getCoursesByClass(req);
    return res.status(200).json({ course });
  } catch (error) {
    return res.status(400).json({ errors: { msg: "something went wrong" } });
  }
};

const addCourse = async (req, res) => {
  try {
    const course = await CourseFunction.addCourse(req);
    return res.status(200).json({ course, msg: "course added successfully" });
  } catch (error) {
    return res.status(400).json({ errors: { msg: "something went wrong" } });
  }
};

const updateCourse = async (req, res) => {
  try {
    const course = await CourseFunction.updateCourse(req);
    return res.status(200).json({ course, msg: "course updated successfully" });
  } catch (error) {
    return res.status(400).json({ errors: { msg: "something went wrong" } });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const course = await CourseFunction.deleteCourse(req);
    return res.status(200).json({ course, msg: "course deleted successfully" });
  } catch (error) {
    return res.status(400).json({ errors: { msg: "something went wrong" } });
  }
};

module.exports = {
  getCourses,
  getCoursesByClass,
  addCourse,
  updateCourse,
  deleteCourse,
};
