const prisma = require("../../prisma/prismaClient");
const bcrypt = require("bcryptjs");

const updateTeacher = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email, password } = req.body;
    const updateObj = {};
    if (email) {
      const user = await prisma.user.findUnique({
        where: { email: email },
      });
      if (user && user.userId !== userId) {
        return res.status(400).json({ errors: { msg: "email already exist" } });
      }
      updateObj.email = email;
    }
    if (password) {
      updateObj.password = await bcrypt.hash(password, 10);
    }
    if (name) updateObj.name = name;

    const student = await prisma.user.update({
      where: { userId: userId },
      data: updateObj,
    });

    return res
      .status(200)
      .json({ data: student, msg: "user updated successfully" });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ errors: { msg: "Something went wrong" } });
  }
};

module.exports = updateTeacher;
