const prisma = require("../prisma/prismaClient");

const getClasses = async (req, res) => {
  try {
    const classes = await prisma.classes.findMany({});
    return res.status(200).json({ data: { class: classes } });
  } catch (error) {
    return res.status(400).json({ errors: { msg: "Something went wrong" } });
  }
};
const getClass = async (req, res) => {
  const { id } = req.params;
  const classData = await prisma.classes.findUnique({
    where: {
      classId: id,
    },
  });
  return res.status(200).json({ data: { class: classData } });
};

const addClass = async (req, res) => {
  try {
    const {
      classId,
      name,
      monthlyFee,
      totalStudents,
      totalTeachers,
      totalCourses,
    } = req.body;
    const className = `class-${name}`;

    const newClass = await prisma.classes.create({
      data: {
        classId,
        name: className,
        monthlyFee,
        totalStudents,
        totalTeachers,
        totalCourses,
        year: String(new Date().getFullYear()),
        enrolledClass: {
          create: {
            year: String(new Date().getFullYear()),
          },
        },
      },
    });

    res.status(201).json({
      data: {
        class: newClass,
        msg: "Class created successfully",
      },
    });
  } catch (error) {
    // console.validatorHandlerlog(error.message);
    res.status(500).json({ errors: { msg: "Something went wrong" } });
  }
};

const updateClass = async (req, res) => {
  try {
    const { id } = req.params;
    req.body.name = `class-${req.body.name}`;
    const updatedClass = await prisma.classes.update({
      where: {
        classId: id,
      },
      data: req.body,
    });
    return res.status(200).json({
      data: { class: updatedClass, msg: "Class updated successfully" },
    });
  } catch (error) {
    // console.log(error.message);
    return res.status(500).json({ errors: { msg: "Something went wrong" } });
  }
};

const deleteClass = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.classes.delete({
      where: {
        classId: id,
      },
    });
    res.status(200).json({ data: { msg: "Class deleted successfully" } });
  } catch (error) {
    // console.log(error.message);
    res.status(400).json({ errors: { msg: "Something went wrong" } });
  }
};

module.exports = { getClasses, getClass, addClass, updateClass, deleteClass };
