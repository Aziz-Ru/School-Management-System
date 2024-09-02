import prisma from "../../prisma/db.js";

export const getTimeSlots = async (req, res) => {
  try {
    const time = await prisma.timeslot.findMany({});
    return res.status(200).json({ time });
  } catch (error) {
    return res.status(400).json({ errors: [{ msg: "Something Went Wrong" }] });
  }
};

export const getTimeSlot = async (req, res) => {
  try {
    const time = await prisma.timeslot.findMany({ where: { dayName: "SUN" } });
    return res.status(200).json({ time });
  } catch (error) {
    return res.status(400).json({ errors: [{ msg: "Something Went Wrong" }] });
  }
};

export const addTimeSlot = async (req, res) => {
  try {
    const { timeSlots } = req.body;
    await prisma.timeslot.create({
      data: timeSlots,
    });
    res.status(200).json({ msg: "new time added" });
  } catch (error) {
    return res.status(400).json({ errors: [{ msg: "Something Went Wrong" }] });
  }
};

export const updateTimeSlot = (req, res) => {
  try {
  } catch (error) {
    return res.status(400).json({ errors: [{ msg: "Something Went Wrong" }] });
  }
};

export const deleteTimeSlot = (req, res) => {
  try {
  } catch (error) {
    return res.status(400).json({ errors: [{ msg: "Something Went Wrong" }] });
  }
};
