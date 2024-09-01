import prisma from "../../prisma/db.js";

export const getFaculties = async (req, res) => {
  try {
    const faculties = await prisma.faculty.findMany();
    return res.status(200).json({ faculties });
  } catch (error) {
    return res.status(400).json({ errors: [{ msg: "Something Went Wrong" }] });
  }
};

export const getFaculty = async (req, res) => {
  try {
    const { facId } = req.params;
    const faculty = await prisma.faculty.findUnique({
      where: { id: facId },
      include: { department: true },
    });
    if (!faculty) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Something Went Wrong" }] });
    }
    return res.status(200).json({ faculty });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ errors: [{ msg: "Something Went Wrong" }] });
  }
};
export const addFaculty = async (req, res) => {
  try {
    await prisma.faculty.create({
      data: { facultyName: req.body.facultyName },
    });
    return res.status(200).json({ msg: "faculty created successfully" });
  } catch (error) {
    return res.status(400).json({ errors: [{ msg: "Something Went Wrong" }] });
  }
};

export const updateFaculty = async (req, res) => {
  try {
    await prisma.faculty.update({
      where: { id: req.params.facId },
      data: { facultyName: req.body.facultyName },
    });
    return res.status(200).json({ msg: "faculty updated successfully" });
  } catch (error) {
    return res.status(400).json({ errors: [{ msg: "Something Went Wrong" }] });
  }
};

export const deleteFaculty = async (req, res) => {
  try {
    const { ids } = req.body;
    await prisma.faculty.deleteMany({
      where: { id: { in: ids } },
    });
    return res.status(200).json({ msg: "faculty deleted successfully" });
  } catch (error) {
    return res.status(400).json({ errors: [{ msg: "Something Went Wrong" }] });
  }
};
