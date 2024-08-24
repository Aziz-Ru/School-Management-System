import prisma from "../../prisma/db.js";

export const isAdmin = async (req, res, next) => {
  const admin = await prisma.admin.findUnique({
    where: { id: req.payload.id },
  });
  console.log(admin);
  if (req.payload.role != "Admin" || !admin) {
    return res.status(404).json({ errors: [{ msg: "Invalid Credential" }] });
  }
  next();
};
