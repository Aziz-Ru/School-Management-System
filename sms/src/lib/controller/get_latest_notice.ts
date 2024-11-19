import prisma from "../db";
import { Status } from "../types";

export async function get_notice(num_of_notice = 3) {
  try {
    const notices = await prisma.notice.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: num_of_notice,
    });
    if (notices.length === 0) {
      return { status: Status.NOT_FOUND };
    }
    return { notices, status: Status.OK };
  } catch (error) {
    return { status: Status.INTERNAL_SERVER_ERROR };
  }
}

export async function get_notice_by_id(id: string) {
  try {
    const notice = await prisma.notice.findUnique({
      where: {
        id,
      },
    });

    return notice;
  } catch (error) {
    // console.log(error);
    return null;
  }
}
