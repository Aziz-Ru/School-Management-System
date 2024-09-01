import bcrypt from "bcryptjs";
import prisma from "../prisma/db.js";

const main = async (username, password) => {
  const hashPasswrod = await bcrypt.hash(password, 10);
  try {
    await prisma.admin.create({
      data: { username: username, password: hashPasswrod },
    });
    console.log("Admin Create successfully");
  } catch (error) {
    console.log(error);
  }
};

main("admin1", "admin1");
