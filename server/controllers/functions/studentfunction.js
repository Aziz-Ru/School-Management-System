const prisma = require("../../prisma/prismaClient").default;
const bcrypt = require("bcryptjs");
const ClassFunction = require("./classfunction");
class StudentFunction {
  static async getStudents(req) {
    try {
      const students = await prisma.user.findMany({
        where: { role: "Student" },
        include: {
          profile: true,
        },
      });
      return students;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getStudent(req) {
    try {
      const id = req.params.uId;
      const students = await prisma.user.findUnique({
        where: { uId: id, role: "Student" },
        include: { profile: true },
      });
      return students;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async addStudent(req) {
    try {
      const { id } = await prisma.school.findFirst();
      const classStudents = await prisma.enrollClass.count({
        where: { year: req.body.admissionYear, classId: req.body.classId },
      });
      req.body.password = await bcrypt.hash(req.body.password, 10);
      const classId = req.body.classId;

      const year = req.body.admissionYear % 100;
      let userId = `${year}${id}${classId}`;
      userId = parseInt(userId) * 1000 + classStudents + 1;

      const user = await prisma.user.create({
        data: {
          uId: userId.toString(),
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          role: req.body.role,
          admissionYear: req.body.admissionYear,
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

      await prisma.enrollClass.create({
        data: {
          year: req.body.admissionYear,
          class: {
            connect: {
              classId: req.body.classId,
            },
          },
          user: {
            connect: {
              uId: user.uId,
            },
          },
        },
      });

      await ClassFunction.updateClass({
        params: { classId: req.body.classId },
        body: {},
      });

      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  static async updateStudent(req) {
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

      const student = await prisma.user.update({
        where: { uId: uId },
        data: updateObj,
      });

      return student;
    } catch (error) {
      // console.log(error.message);
      throw new Error(error.message);
    }
  }

  static async deleteStudent(req) {
    try {
      const { uId } = req.params;
      const student = await prisma.user.delete({
        where: { uId: uId, role: "Student" },
      });
      return student;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = StudentFunction;
