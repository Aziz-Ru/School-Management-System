const prisma = require("../../prisma/prismaClient");

const examDelete = async (req, res) => {
  try {
    await prisma.exam.delete({
      where: { id: req.params.id },
    });
    res.status(204).json({ data: { msg: "Exam Deleted Successfully" } });
  } catch (error) {
    res.status(400).json({ errors: { msg: "Something Went Wrong" } });
  }
};

module.exports = examDelete;
