const prisma = require("../prisma/prismaClient");
async function getSchool(req, res) {
  try {
    const school = await prisma.school.findFirst();
    return res.status(200).json({ data: school });
  } catch (error) {
    return res.status("404").json({ error: error.message });
  }
}
async function postSchool(req, res) {
  const { id, name, address, establishAt } = req.body;
  try {
    const school = await prisma.school.create({
      data: {
        id: id,
        name: name,
        address: address,
        establishAt: establishAt,
      },
    });
    return res
      .status(200)
      .json({ data: school, message: "Create School Successfully" });
  } catch (error) {
    if (error.code == "P2002") {
      return res.status(404).json({ error: "Already exist schoolId or name" });
    }

    return res.status(404).json({ error: "Something Went Wrong" });
  }
}

module.exports = { getSchool, postSchool };
