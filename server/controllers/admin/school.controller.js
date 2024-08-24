import prisma from "../../prisma/db.js";

export async function getSchool(req, res) {
  try {
    const school = await prisma.school.findFirst();
    return res.status(200).json({ school });
  } catch (error) {
    return res.status(404).json({ errors: [{ msg: "Something Went Wrong" }] });
  }
}

export async function addSchool(req, res) {
  try {
    await prisma.school.deleteMany();
    const school = await prisma.school.create({
      data: req.body,
    });
    return res.status(200).json({ school, msg: "school created successfully" });
  } catch (error) {
    return res.status(404).json({ errors: [{ msg: "Something Went Wrong" }] });
  }
}
