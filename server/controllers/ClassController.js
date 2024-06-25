const prisma = require("../prisma/prismaClient");

const getClasses = async (req, res) => {
  try {
    const classes = await prisma.classroom.findMany({});
    res.status(200).json({ data: classes });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: { message: "Something went wrong" } });
  }
};

const createClass = async (req, res) => {
  try {
    const { name, monthlyFee } = req.body;
    const ClassRoom = `class-${name}`;
    const newClass = await prisma.classroom.create({
      data: {
        name: ClassRoom,
        monthlyFee,
      },
    });
    res
      .status(201)
      .json({ data: newClass, message: "Class created successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: { message: "Something went wrong" } });
  }
};

const updateClass = async (req, res) => {
  try {
    const { id } = req.params;
    const { monthlyFee } = req.body;

    const updatedClass = await prisma.classroom.update({
      where: {
        id: id,
      },
      data: { monthlyFee },
    });
    res
      .status(200)
      .json({ data: updatedClass, message: "Class updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: { message: "Something went wrong" } });
  }
};

const deleteClass = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.classroom.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json({ message: "Class deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: { message: "Something went wrong" } });
  }
};

module.exports = { getClasses, createClass, updateClass, deleteClass };
