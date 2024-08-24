import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../prisma/db.js";

export const login = async (req, res) => {
  const { uid, password, role } = req.body;
  try {
    if (role === "Student") {
      const student = await prisma.student.findUnique({
        where: { studentId: uid },
      });
      const isMatchPassword = await bcrypt.compare(password, student.password);

      if (student && isMatchPassword) {
        const maxAge = 1000 * 3600 * 7 * 24;
        const token = jwt.sign(
          {
            id: student.id,
            uid: uid,
            name: student.firstName + student.lastName,
            sex: student.sex,
          },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: maxAge,
            algorithm: "HS512",
          }
        );

        return res
          .cookie("_secure", token, { maxAge: maxAge, httpOnly: true })
          .status(200)
          .json({ msg: "Login Sucessfull" });
      } else {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credential" }] });
      }
    } else if (role === "Employee") {
      const employee = await prisma.employee.findUnique({
        where: { employeeId: uid },
      });
      const isMatchPassword = await bcrypt.compare(password, employee.password);

      if (employee && isMatchPassword) {
        const maxAge = 1000 * 3600 * 7 * 24;
        const token = jwt.sign(
          {
            id: employee.id,
            uid: uid,
            role: role,
            name: employee.firstName + employee.lastName,
            sex: employee.sex,
          },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: maxAge,
            algorithm: "HS512",
          }
        );

        return res
          .cookie("_secure", token, { maxAge: maxAge, httpOnly: true })
          .status(200)
          .json({ msg: "Login Sucessfull" });
      } else {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credential" }] });
      }
    } else if (role === "Admin") {
      const admin = await prisma.admin.findUnique({ where: { username: uid } });
      const isMatchPassword = await bcrypt.compare(password, admin.password);

      if (admin && isMatchPassword) {
        const maxAge = 1000 * 3600 * 7 * 24;
        const token = jwt.sign(
          {
            id: admin.id,
            uid: admin.username,
            role: role,
          },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: maxAge,
            algorithm: "HS512",
          }
        );

        return res
          .cookie("_secure", token, { maxAge: maxAge, httpOnly: true })
          .status(200)
          .json({ msg: "Login Sucessfull" });
      } else {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credential" }] });
      }
    } else {
      return res.status(400).json({ errors: [{ msg: "Invalid Credential" }] });
    }
  } catch (error) {
    return res.status(400).json({ errors: [{ msg: "Invalid Credential" }] });
  }
};

export const logout = (req, res) => {
  return res
    .clearCookie("_secure")
    .status(200)
    .json({ msg: "Logout Successfull" });
};
