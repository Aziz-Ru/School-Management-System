import prisma from "../../prisma/db.js";

export const getDays = async (req, res) => {
  try {
    const days = await prisma.day.findMany();
    return res.status(200).json({ days });
  } catch (error) {
    return res.status(400).json({ errors: [{ msg: "Something Went Wrong" }] });
  }
};

export const addDay = async (req, res) => {
  try {
    const { dayName } = req.body;
    await prisma.day.create({ data: { dayName: dayName } });
    return res.status(201).json({ msg: "new day added" });
  } catch (error) {
    return res.status(400).json({ errors: [{ msg: "Something Went Wrong" }] });
  }
};

export const deleteDays = async (req, res) => {
  try {
    const { dayId } = req.body;
    await prisma.day.deleteMany({ where: { id: { in: dayId } } });
    return res.status(200).json({ msg: "day deleted successfully" });
  } catch (error) {
    return res.status(400).json({ errors: [{ msg: "Something Went Wrong" }] });
  }
};
