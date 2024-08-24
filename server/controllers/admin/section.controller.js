import prisma from "../../prisma/db.js";

export const getsections = async (req, res) => {
  try {
    const sections = await prisma.section.fields();
  } catch (error) {
    return res.status(400).json({ errors: [{ msg: "Something Went Wrong" }] });
  }
};
export const getsection = (req, res) => {
  try {
  } catch (error) {
    return res.status(400).json({ errors: [{ msg: "Something Went Wrong" }] });
  }
};
export const addsection = (req, res) => {
  try {
  } catch (error) {
    return res.status(400).json({ errors: [{ msg: "Something Went Wrong" }] });
  }
};
export const updatesection = (req, res) => {
  try {
  } catch (error) {
    return res.status(400).json({ errors: [{ msg: "Something Went Wrong" }] });
  }
};
export const deletesection = (req, res) => {
  try {
  } catch (error) {
    return res.status(400).json({ errors: [{ msg: "Something Went Wrong" }] });
  }
};
