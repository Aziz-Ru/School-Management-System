const prisma = require("../prisma/prismaClient");

const classChecker = async (req, res, next) => {
  const { classId } = req.body;

  const ExistingClass = await prisma.classes.findUnique({
    where: {
      classId: classId,
    },
  });
  if (ExistingClass) {
    return res.status(400).json({ errors: { msg: "Class already exists" } });
  }
  next();
};

module.exports = { classChecker };
