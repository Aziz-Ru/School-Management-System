import jwt from "jsonwebtoken";
import prisma from "../../prisma/db.js";

export const verifyJwt = (req, res, next) => {
  const token = req.cookies._secure;
  if (!token) {
    return res.status(400).json({ errors: [{ msg: "Invalid credential" }] });
  }

  const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
  if (!payload) {
    return res.status(400).json({ errors: [{ msg: "Invalid credential" }] });
  }

  req.payload = payload;
  next();
};

export const isAdmin = async (req, res, next) => {
  const admin = await prisma.admin.findUnique({
    where: { id: req.payload.id },
  });

  if (req.payload.role != "Admin" || !admin) {
    return res.status(404).json({ errors: [{ msg: "Invalid Credential" }] });
  }
  next();
};
