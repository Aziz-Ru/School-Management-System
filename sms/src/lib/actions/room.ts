"use server";

import { revalidatePath } from "next/cache";
import prisma from "../db";
import { RoomSchema } from "../schema/schema";

export const addRoomAction = async (formData: FormData) => {
  try {
    const validResult = await RoomSchema.safeParse({
      room_number: parseInt(formData.get("room_number") as string),
      building: formData.get("building_name"),
      capacity: parseInt(formData.get("capacity") as string),
      floor: parseInt(formData.get("floor") as string),
      type: formData.get("type"),
    });

    if (!validResult.success) {
      return { error: validResult.error.errors[0].message };
    }
    const existRoomOnFloor = await prisma.room.findFirst({
      where: {
        roomNumber: validResult.data.room_number,
        floor: validResult.data.floor,
      },
    });

    if (existRoomOnFloor) {
      return { error: "Room Already Exist on this Floor" };
    }

    await prisma.room.create({
      data: {
        roomNumber: validResult.data.room_number,
        building: validResult.data.building,
        capacity: validResult.data.capacity,
        floor: validResult.data.floor,
        type: validResult.data.type,
      },
    });
    revalidatePath("/dashboard");
    return { msg: "Room Added Successfully" };
  } catch (error) {
    console.log(error);
    return { error: "Failed to create Room" };
  }
};
