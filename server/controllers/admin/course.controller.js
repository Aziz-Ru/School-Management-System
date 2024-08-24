import prisma from "../../prisma/db.js";

export const getCourses = async (req, res) => {
  try {
    const courses = await prisma.course.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });

    return res.status(200).json({ courses });
  } catch (error) {
    return res.status(400).json({ errors: [{ msg: "something went wrong" }] });
  }
};

export const addCourse = async (req, res) => {
  try {
    const { courseName, classId, totalMarks } = req.body;
    await prisma.course.create({
      data: {
        courseName: `${courseName}-${classId}`,
        totalMarks: totalMarks | 100,
        class: {
          connect: {
            classId: parseInt(classId),
          },
        },
      },
    });
    return res.status(200).json({ msg: "course added successfully" });
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(400).json({ errors: { msg: "Class Already Exist" } });
    }
    return res.status(400).json({ errors: { msg: "something went wrong" } });
  }
};
export const updateCourse = async (req, res) => {
  const { courseId } = req.params;
  try {
    const exist = await prisma.course.findUnique({ where: { id: courseId } });
    if (!exist) {
      return res
        .status(400)
        .json({ errors: [{ msg: "something went wrong" }] });
    }
    // console.log(req.body.courseName);
    // console.log(exist.courseName);
    if (!req.body.courseName) {
      req.body.courseName = exist.courseName;
    }
    if (!req.body.totalMarks) {
      req.body.totalMarks = exist.totalMarks;
    }
    if (!req.body.classId) {
      req.body.classId = exist.classId;
    }
    await prisma.course.update({
      where: { id: courseId },
      data: {
        courseName: req.body.courseName,
        totalMarks: parseInt(req.body.totalMarks),
        class: {
          connect: {
            classId: parseInt(req.body.classId),
          },
        },
      },
    });
    return res.status(200).json({ msg: "updated successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ errors: [{ msg: "something went wrong" }] });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const { dltId } = req.body;
    await prisma.course.deleteMany({
      where: {
        id: {
          in: dltId,
        },
      },
    });
    return res.status(200).json({ msg: "course deleted successfully" });
  } catch (error) {
    // console.log(error.message);
    return res.status(400).json({ errors: [{ msg: "something went wrong" }] });
  }
};
