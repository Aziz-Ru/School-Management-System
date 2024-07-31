const prisma = require("../../prisma/prismaClient").default;
const ClassFunction = require("./classfunction");

class CourseFunction {
  static async getCourses(req) {
    try {
      const courses = await prisma.courses.findMany();
      return courses;
    } catch (error) {
      //   console.log(error.message);
      throw new Error(error.message);
    }
  }

  static async getCoursesByClass(req) {
    try {
      const { classId } = req.params;
      const courses = await prisma.courses.findMany({
        where: {
          classId: classId,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return courses;
    } catch (error) {
      //   console.log(error.message);
      throw new Error(error.message);
    }
  }

  static async addCourse(req) {
    try {
      const { courseName, courseCode, totalMarks, credit, classId } = req.body;
      const course = await prisma.courses.create({
        data: {
          name: courseName,
          courseCode,
          totalMarks,
          credit,
          class: {
            connect: {
              classId: classId,
            },
          },
        },
      });
      await ClassFunction.updateClass({ params: { classId }, body: {} });
      return course;
    } catch (error) {
      //   console.log(error.message);
      throw new Error(error.message);
    }
  }
  static async updateCourse(req) {
    try {
      const { classId, courseCode } = req.params;
      const { courseName, totalMarks, credit } = req.body;

      const course = await prisma.courses.update({
        where: {
          courseCode: courseCode,
          classId: classId,
        },
        data: {
          name: courseName,
          totalMarks,
          credit,
        },
      });
      return course;
    } catch (error) {
      //   console.log(error.message);
      throw new Error(error.message);
    }
  }
  static async deleteCourse(req) {
    try {
      const { classId, courseCode } = req.params;
      const course = await prisma.courses.delete({
        where: {
          courseCode: courseCode,
          classId: classId,
        },
      });
      return course;
    } catch (error) {
      //   console.log(error.message);
      throw new Error(error.message);
    }
  }
}

module.exports = CourseFunction;
