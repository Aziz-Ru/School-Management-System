import prisma from "../../prisma/db.js";

export const getDepartments = async (req, res) => {
  try {
    const departments = await prisma.department.findMany();
    return res.status(200).json({ departments });
  } catch (error) {
    return res.status(400).json({ errors: [{ msg: "Something Went Wrong" }] });
  }
};

export const getDepartment = async (req, res) => {
  try {
    const { deptId } = req.params;
    const dept = await prisma.faculty.findUnique({
      where: { id: deptId },
    });
    if (!dept) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Something Went Wrong" }] });
    }
    return res.status(200).json({ dept });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ errors: [{ msg: "Something Went Wrong" }] });
  }
};
export const addDept = async (req, res) => {
  try {
    await prisma.department.create({
      data: { facultyName: req.body.deptName },
    });
    return res.status(200).json({ msg: "dept created successfully" });
  } catch (error) {
    return res.status(400).json({ errors: [{ msg: "Something Went Wrong" }] });
  }
};

export const updateDept = async (req, res) => {
  try {
    await prisma.department.update({
      where: { id: req.params.deptId },
      data: { facultyName: req.body.deptName },
    });
    return res.status(200).json({ msg: "dept updated successfully" });
  } catch (error) {
    return res.status(400).json({ errors: [{ msg: "Something Went Wrong" }] });
  }
};

export const deleteDept = async (req, res) => {
  try {
    const { ids } = req.body;
    await prisma.department.deleteMany({
      where: { id: { in: ids } },
    });
    return res.status(200).json({ msg: "dept deleted successfully" });
  } catch (error) {
    return res.status(400).json({ errors: [{ msg: "Something Went Wrong" }] });
  }
};
