const { parse } = require("dotenv");
const prisma = require("../../prisma/prismaClient");
const bcrypt = require("bcryptjs");
const { connect } = require("../../routes/ClassHandler");
const selectedObject = {};

const addStudent = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      admissionYear,
      role,
      dob,
      sex,
      phone,
      classId,
    } = req.body;

    const { id } = await prisma.school.findFirst();
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const year = req.body.admissionYear % 100;
    const userId =
      (year * 10000 + id) * 1000 +
      (await prisma.enrollClass.count({
        where: { year: req.body.admissionYear },
      })) +
      1;
    const user = await prisma.user.create({
      data: {
        userId: userId.toString(),
        name,
        email,
        password,
        role,
        admissionYear: parseInt(admissionYear),
        profile: {
          create: {
            dob,
            sex,
            phone,
            address: req.body.address === undefined ? "" : req.body.address,
            imageLink:
              req.body.imageLink === undefined ? "" : req.body.imageLink,
            studentProfile: {
              create: {
                class: classId.toString(),
              },
            },
          },
        },
      },
    });
    await prisma.enrollClass.create({
      data: {
        year: admissionYear,
        class: {
          connect: {
            classId: parseInt(classId),
          },
        },
        user: {
          connect: {
            userId: user.userId,
          },
        },
      },
    });

    return res
      .status(201)
      .json({
        data: {
          user,
          msg: `user create successfully and enrolled class ${classId}`,
        },
      });
      
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ errors: { msg: "something went wrong" } });
  }
};

module.exports = addStudent;
