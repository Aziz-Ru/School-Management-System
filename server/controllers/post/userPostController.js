const prisma = require("../../prisma/prismaClient");
const createError = require("http-errors");
const bcrypt = require("bcryptjs");

const addUser = async (req, res) => {
  try {
    const { id } = await prisma.school.findFirst();

    req.body.password = await bcrypt.hash(req.body.password, 10);
    if (req.body.role === "Admin") {
      req.body.userId = await bcrypt.hash(req.body.role, 1);
    } else if (req.body.role === "Teacher") {
      //   req.body.userId =
    } else {
      const year = req.body.admissionYear % 100;
      const roll =
        (year * 10000 + id) * 100 +
        (await prisma.user.count({
          where: { role: req.body.role, admissionYear: req.body.admissionYear },
        })) +
        1;
      //   console.log(roll);
      req.body.userId = roll.toString();
    }
    // console.log(req.body);
    const user = await prisma.user.create({ data: req.body });
    res.status(201).json({ data: { user, msg: "user create successfully" } });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ errors: { msg: "something went wrong" } });
  }
};

module.exports = addUser;
