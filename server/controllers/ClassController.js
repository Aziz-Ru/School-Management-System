const ClassFunction = require("./functions/classfunction");

const getClasses = async (req, res) => {
  try {
    const classes = await ClassFunction.getClasses(req);
    // console.log(classes);
    return res.status(200).json({ data: { class: classes } });
  } catch (error) {
    // console.log(error.message);
    return res.status(400).json({ errors: { msg: "Something went wrong" } });
  }
};

const getClass = async (req, res) => {
  try {
    const exist = await ClassFunction.getClass(req);
    return res.status(200).json({ data: { class: exist } });
  } catch (error) {
    return res.status(400).json({ errors: { msg: "Something went wrong" } });
  }
};

const addClass = async (req, res) => {
  try {
    const newClass = await ClassFunction.addClass(req);
    return res
      .status(201)
      .json({ data: { class: newClass, msg: "Class added successfully" } });
  } catch (error) {
    return res.status(400).json({ errors: { msg: "Something went wrong" } });
  }
};

const updateClass = async (req, res) => {
  try {
    const updaClass = await ClassFunction.updateClass(req);
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
    const deleteClass = await ClassFunction.deleteClass(req);
    return res.status(200).json({
      data: { class: deleteClass, msg: "Class deleted successfully" },
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ errors: { msg: "Something went wrong" } });
  }
};

module.exports = { getClasses, getClass, addClass, updateClass, deleteClass };
