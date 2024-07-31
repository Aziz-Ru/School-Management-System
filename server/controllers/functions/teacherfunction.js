const prisma = require("../../prisma/prismaClient").default;
const bcrypt = require("bcryptjs");

class TeacherFunction {
  static async getTeachers(req) {
    try {
      const teachers = await prisma.user.findMany({
        where: { role: "Teacher" },
      });
      return teachers;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getTeacher(req) {
    try {
      const id = req.params.uId;
      const teachers = await prisma.user.findUnique({
        where: { uId: id, role: "Teacher" },
        include: { profile: true },
      });
      return teachers;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async addTeacher(req) {
    try {
      const { id } = await prisma.school.findFirst();
      const existTeacher = await prisma.user.count({
        where: { role: "Teacher" },
      });
      req.body.password = await bcrypt.hash(req.body.password, 10);
      let userId = id * 1000 + existTeacher + 1;

      const user = await prisma.user.create({
        data: {
          uId: userId.toString(),
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          role: req.body.role,
          admissionYear: new Date().getFullYear().toString(),
          profile: {
            create: {
              dob: req.body.dob,
              sex: req.body.sex,
              phone: req.body.phone,
              address: req.body.address === undefined ? "" : req.body.address,
              imageLink:
                req.body.imageLink === undefined ? "" : req.body.imageLink,
            },
          },
        },
      });
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  static async updateTeacher(req) {
    try {
      const { uId } = req.params;
      const { name, email, password } = req.body;
      const updateObj = {};
      if (email) {
        const user = await prisma.user.findUnique({
          where: { email: email },
        });
        if (user && user.uId !== uId) {
          throw new Error("email already exist");
        }
        updateObj.email = email;
      }
      if (password) {
        updateObj.password = await bcrypt.hash(password, 10);
      }
      if (name) updateObj.name = name;

      const user = await prisma.user.update({
        where: { uId: uId },
        data: updateObj,
      });

      return user;
    } catch (error) {
      // console.log(error.message);
      throw new Error(error.message);
    }
  }

  static async deleteTeacher(req) {
    try {
      const { uId } = req.params;
      const student = await prisma.user.delete({
        where: { uId: uId, role: "Teacher" },
      });
      return student;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = TeacherFunction;
