const prisma = require("../../prisma/prismaClient");

const addClass = async (req, res) => {
  try {
    const { classId, monthlyFee, totalStudents, totalCourses } = req.body;
    const classObj = {};
    if (classId) classObj.classId = classId;
    if (monthlyFee) classObj.monthlyFee = parseInt(monthlyFee);
    if (totalStudents) classObj.totalStudents = parseInt(totalStudents);
    if (totalCourses) classObj.totalCourses = parseInt(totalCourses);

    const newClass = await prisma.class.create({
      data: classObj,
    });

    res.status(201).json({
      data: {
        class: newClass,
        msg: "Class created successfully",
      },
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ errors: { msg: "Something went wrong" } });
  }
};

module.exports = addClass;
