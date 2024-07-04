const prisma = require("../../prisma/prismaClient");

const getClasses = async (req, res) => {
  try {
    const classes = await prisma.class.findMany({
      orderBy: { classId: "asc" },
    });
    return res.status(200).json({ data: { class: classes } });
  } catch (error) {
    return res.status(400).json({ errors: { msg: "Something went wrong" } });
  }
};

const getClass = async (req, res) => {
  const { classId } = req.params;
  const classData = await prisma.class.findUnique({
    where: {
      classId: parseInt(classId),
    },
  });
  return res.status(200).json({ data: { class: classData } });
};

module.exports = { getClasses, getClass };
