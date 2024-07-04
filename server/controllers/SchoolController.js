const prisma = require("../prisma/prismaClient");

async function getSchool(req, res) {
  try {
    const school = await prisma.school.findFirst();
    return res.status(200).json({ data: school });
  } catch (error) {
    return res.status("404").json({ error: error.message });
  }
}

async function createSchool(req, res) {
  const { id, name, address, email, phone, establishAt } = req.body;
  try {
    const school = await prisma.school.create({
      data: {
        id: id,
        name: name,
        email: email,
        phone: phone,
        address: address,
        establishAt: establishAt,
      },
    });
    return res
      .status(200)
      .json({ data: school, message: "Create School Successfully" });
  } catch (error) {
    console.log(error);
    if (error.code == "P2002") {
      return res.status(404).json({ error: "Already exist schoolId or name" });
    }

    return res.status(404).json({ error: "Something Went Wrong" });
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

module.exports = { getSchool, createSchool, deleteSchool };
