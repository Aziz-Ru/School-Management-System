import prisma from "../../prisma/db.js";

export const getNotices = async (req, res) => {
  try {
    const notice = await prisma.notice.findMany({});
    return res.status(200).json({ notice });
  } catch (error) {
    return res.status(400).json({ errors: [{ msg: "Something Went Wrong" }] });
  }
};
export const getNotice = async (req, res) => {
  const { noticeId } = req.params;
  try {
    const notice = await prisma.notice.findUnique({ where: { id: noticeId } });
    if (notice == null) {
      return res.status(400).json({ errors: [{ msg: "Notice not found" }] });
    }
    return res.status(200).json({ notice });
  } catch (error) {
    return res.status(400).json({ errors: [{ msg: "Something Went Wrong" }] });
  }
};

export const addNotice = async (req, res) => {
  try {
    const body = req.body;
    const notice = await prisma.notice.create({ data: body });
    return res.status(200).json({ notice });
  } catch (error) {
    return res.status(400).json({ errors: [{ msg: "Something Went Wrong" }] });
  }
};

export const updateNotice = async (req, res) => {
  const { noticeId } = req.params;
  const body = req.body;
  try {
    await prisma.notice.update({ where: { id: noticeId }, data: body });
    return res.status(200).json({ msg: "updated Notice" });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ errors: [{ msg: "Something Went Wrong" }] });
  }
};

export const deleteNotice = async (req, res) => {
  const { noticeId } = req.params;
  try {
    await prisma.notice.delete({ where: { id: noticeId } });
    return res.status(200).json({ msg: "deleted Notice" });
  } catch (error) {
    return res.status(400).json({ errors: [{ msg: "Something Went Wrong" }] });
  }
};
