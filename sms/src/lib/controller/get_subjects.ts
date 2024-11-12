"use server";

import prisma from "../db";
import { Status, Subject } from "../types";

type GetSubjectsReturnProps = {
  subjects?: Subject[];
  status: Status;
};

export const get_subjects = async (): Promise<GetSubjectsReturnProps> => {
  try {
    const subjects = await prisma.subject.findMany({
      include: { _count: { select: { teacher: true } } },
    });

    return { subjects, status: Status.OK };
  } catch (error) {
    return { status: Status.INTERNAL_SERVER_ERROR };
  }
};
