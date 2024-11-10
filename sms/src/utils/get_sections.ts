"use server";

import prisma from "@/lib/db";
import { Section, Status } from "./types";

type ReturnProps = {
  section?: Section[];
  status: Status;
};

export const getSections = async (): Promise<ReturnProps> => {
  try {
    const sections = await prisma.section.findMany({
      orderBy: { classId: "asc" },
    });
    return { section: sections, status: Status.OK };
  } catch (error) {
    return { status: Status.INTERNAL_SERVER_ERROR };
  }
};
