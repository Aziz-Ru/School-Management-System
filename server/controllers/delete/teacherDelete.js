const prisma = require("../../prisma/prismaClient");

const deleteTeacher = async (req, res) => {
  //   console.log(req.body);
  try {
    const { userId } = req.params;
    await prisma.user.delete({
      where: {
        userId: userId,
      },
    });
    res.status(200).json({ data: { msg: "Student deleted successfully" } });
  } catch (error) {
    // console.log(error.message);
    res.status(400).json({ errors: { msg: "something went wrong" } });
  }
};

module.exports = deleteTeacher;
