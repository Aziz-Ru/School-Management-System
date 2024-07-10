const prisma = require("../../prisma/prismaClient");
// Initialize ClassFunction
class ClassFunction {
  static async getClasses(req) {
    try {
      const classes = await prisma.class.findMany({
        orderBy: { createdAt: "asc" },
      });
      return classes;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getClass(req) {
    try {
      const classId = req.params.classId;
      const existClass = await prisma.class.findUnique({
        where: { classId: classId },
      });
      if (!existClass) {
        throw new Error("Class not found");
      } else {
        return existClass;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
  static async addClass(req) {
    try {
      const { classId, monthlyFee, maxStudents, maxCourses } = req.body;
      const existingCourse = await prisma.courses.findMany({
        where: { classId: classId },
      });
      const currentStudent = await prisma.enrollClass.findMany({
        where: { classId: classId, year: new Date().getFullYear().toString() },
      });
      const newClass = await prisma.class.create({
        data: {
          classId: classId,
          monthlyFee: parseInt(monthlyFee),
          maxStudents: parseInt(maxStudents),
          maxCourses: parseInt(maxCourses),
          totalCourses: existingCourse.length,
          totalStudents: currentStudent.length,
        },
      });
      return newClass;
    } catch (error) {
      //   console.log(error.message);
      throw new Error(error.message);
    }
  }
  static async updateClass(req) {
    try {
      const classId = req.params.classId;
      const { monthlyFee, maxStudents, maxCourses } = req.body;
      const existingCourse = await prisma.courses.findMany({
        where: { classId: classId },
      });
      const currentStudent = await prisma.enrollClass.findMany({
        where: { classId: classId, year: new Date().getFullYear().toString() },
      });
      const updateObj = {};

      if (monthlyFee) updateObj.monthlyFee = parseInt(monthlyFee);
      if (maxStudents) updateObj.maxStudents = parseInt(maxStudents);
      if (maxCourses) updateObj.maxCourses = parseInt(maxCourses);
      updateObj.totalCourses = existingCourse.length;
      updateObj.totalStudents = currentStudent.length;
      const updatedClass = await prisma.class.update({
        where: { classId: classId },
        data: updateObj,
      });
      return updatedClass;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async deleteClass(req) {
    try {
      const dltClass = await prisma.class.delete({
        where: { classId: req.params.classId },
      });
      return dltClass;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = ClassFunction;
