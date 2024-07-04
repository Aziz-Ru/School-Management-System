const prisma = require("../../prisma/prismaClient");

const deleteClass = async (req, res) => {
  try {
    const { classId } = req.params;
    await prisma.class.delete({
      where: {
        classId: parseInt(classId),
      },
    });
    res.status(200).json({ data: { msg: "Class deleted successfully" } });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ errors: { msg: "Something went wrong" } });
  }
};

module.exports = deleteClass;
