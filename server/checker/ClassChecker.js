"use strict";
const prisma = require("../prisma/prismaClient");

const ClassChecker = async (req, res, next) => {
  const { classroomId } = req.body;
  console.log(classroomId);
  const classRoom = await prisma.classroom.findUnique({
    where: {
      name: `class-${classroomId}`,
    },
  });
  console.log(classRoom);
  if (!classRoom) {
    return res.status(404).json({ error: { msg: "Classroom not found" } });
  }
  req.body.classroomId = `class-${classroomId}`;
  next();
};

module.exports = ClassChecker;
