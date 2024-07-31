import {
  addClass as _addClass,
  deleteClass as _deleteClass,
  getClass as _getClass,
  getClasses as _getClasses,
  updateClass as _updateClass,
} from "./functions/classfunction";

const getClasses = async (req, res) => {
  try {
    const classes = await _getClasses(req);
    // console.log(classes);
    return res.status(200).json({ data: { class: classes } });
  } catch (error) {
    // console.log(error.message);
    return res.status(400).json({ errors: { msg: "Something went wrong" } });
  }
};

const getClass = async (req, res) => {
  try {
    const exist = await _getClass(req);
    return res.status(200).json({ data: { class: exist } });
  } catch (error) {
    return res.status(400).json({ errors: { msg: "Something went wrong" } });
  }
};

const addClass = async (req, res) => {
  try {
    const newClass = await _addClass(req);
    return res
      .status(201)
      .json({ data: { class: newClass, msg: "Class added successfully" } });
  } catch (error) {
    return res.status(400).json({ errors: { msg: "Something went wrong" } });
  }
};

const updateClass = async (req, res) => {
  try {
    const updaClass = await _updateClass(req);
    return res
      .status(200)
      .json({ data: { class: updaClass, msg: "Class updated successfully" } });
  } catch (error) {
    return res.status(400).json({ errors: { msg: "Something went wrong" } });
  }
};

const deleteClass = async (req, res) => {
  try {
    console.log(req.params.classId);
    const deleteClass = await _deleteClass(req);
    return res.status(200).json({
      data: { class: deleteClass, msg: "Class deleted successfully" },
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ errors: { msg: "Something went wrong" } });
  }
};

export default { getClasses, getClass, addClass, updateClass, deleteClass };
