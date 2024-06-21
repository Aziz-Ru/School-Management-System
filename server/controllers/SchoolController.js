const prisma = require("../prisma/prismaClient");
async function getSchool(req, res, next) {
  try {
    const school = await prisma.school.findFirst();
    return res.status(200).json({ data: school });
  } catch (error) {
    return res.status("404").json({ error: error.message });
  }
}
async function postSchool(req, res, next) {
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
    return res.status(200).json({ data: school });
  } catch (error) {
    return res.status("404").json({ error: error.message });
  }
}

module.exports = { getSchool,postSchool };
