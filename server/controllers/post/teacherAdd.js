const prisma = require("../../prisma/prismaClient");
const bcrypt = require("bcryptjs");

const selectedObject = {};

const addTeacher = async (req, res) => {
  try {
    const { name, email, password, role, dob, sex, phone } = req.body;

    const { id } = await prisma.school.findFirst();
    const hashPass = await bcrypt.hash(req.body.password, 10);

    const userId =
      id * 1000 +
      (await prisma.user.count({
        where: { role: "Teacher" },
      })) +
      1;

    const user = await prisma.user.create({
      data: {
        userId: userId.toString(),
        name,
        email,
        password: hashPass,
        role,
        admissionYear: new Date().getFullYear(),
        profile: {
          create: {
            dob,
            sex,
            phone,
            address: req.body.address === undefined ? "" : req.body.address,
            imageLink:
              req.body.imageLink === undefined ? "" : req.body.imageLink,
          },
        },
      },
    });

    return res.status(201).json({
      data: {
        user,
        msg: `user create successfully with userId: ${userId}`,
      },
    });
  } catch (error) {
    // console.log(error.message);
    return res.status(500).json({ errors: { msg: "something went wrong" } });
  }
};

module.exports = addTeacher;
