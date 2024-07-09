const prisma = require("../../prisma/prismaClient");
const bcrypt = require("bcryptjs");
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
      const id = req.params.id;
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
      req.body.password = await bcrypt.hash(req.body.password, 10);
      const year = req.body.admissionYear % 100;
      const userId =
        (year * 10000 + id) * 1000 +
        (await prisma.enrollClass.count({
          where: { year: req.body.admissionYear, classId: req.body.classId },
        })) +
        1;
      console.log(userId);
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
              userId: user.uId,
            },
          },
        },
      });

      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  static async updateStudent(req) {
    try {
      const { uId } = req.params;
      // console.log(userId);
      const { name, email, password } = req.body;
      const updateObj = {};
      if (email) {
        const user = await prisma.user.findUnique({
          where: { email: email },
        });
        //   console.log(user);
        if (user && user.userId !== uId) {
          throw new Error("email already exist");
        }
        updateObj.email = email;
      }
      if (password) {
        updateObj.password = await bcrypt.hash(password, 10);
      }
      if (name) updateObj.name = name;

      const student = await prisma.user.update({
        where: { uId: Id },
        data: updateObj,
      });

      // console.log(student);
      return student;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  static async deleteStudent(req) {
    try {
      const { uId } = req.params;
      const student = await prisma.user.delete({ where: { uId: uId } });
      return student;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = StudentFunction;
