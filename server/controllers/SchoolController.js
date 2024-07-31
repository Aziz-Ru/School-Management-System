import prisma from "../prisma/prismaClient";

async function getSchool(req, res) {
  try {
    const school = await prisma.school.findFirst();
    return res.status(200).json({ school });
  } catch (error) {
    return res.status("404").json({ errors: { msg: "Something Went Wrong" } });
  }
}

async function addSchool(req, res) {
  try {
    const school = await prisma.school.create({
      data: req.body,
    });
    return res.status(200).json({ school, msg: "Create School Successfully" });
  } catch (error) {
    console.log(error.message);
    if (error.code == "P2002") {
      return res
        .status(404)
        .json({ errors: { msg: "Already exist schoolId or name" } });
    }

    return res.status(404).json({ errors: { msg: "Something Went Wrong" } });
  }
}

async function deleteSchool(req, res) {
  try {
    const { id } = req.params;
    // console.log(id);
    await prisma.school.delete({ where: { id: parseInt(id) } });
    return res
      .status(200)
      .json({ data: { message: `${id} id School was deleted` } });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Something Went Wrong" });
  }
}

export default { getSchool, addSchool, deleteSchool };
