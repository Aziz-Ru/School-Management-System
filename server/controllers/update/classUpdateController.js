const prisma = require("../../prisma/prismaClient");

const updateClass = async (req, res) => {
  try {
    const { classId } = req.params;
    const { monthlyFee, totalStudents, totalCourses } = req.body;
    const classObj = {};

    if (monthlyFee) classObj.monthlyFee = parseInt(monthlyFee);
    if (totalStudents) classObj.totalStudents = parseInt(totalStudents);
    if (totalCourses) classObj.totalCourses = parseInt(totalCourses);

    const updatedClass = await prisma.class.update({
      where: {
        classId: parseInt(classId),
      },
      data: classObj,
    });

    return res.status(200).json({
      data: { class: updatedClass, msg: "Class updated successfully" },
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ errors: { msg: "Something went wrong" } });
  }
};

module.exports = updateClass;
