"use server";

import prisma from "../db";
import { Room, Status } from "../types";

type GetRoomReturnProps = {
  rooms?: Room[];
  status: Status;
};

export const get_rooms = async (): Promise<GetRoomReturnProps> => {
  try {
    const rooms = await prisma.room.findMany({
      orderBy: { roomNumber: "asc" },
    });
    return { rooms, status: Status.OK };
  } catch (error) {
    
    return { status: Status.INTERNAL_SERVER_ERROR };
  }
};
