"use server";

import prisma from "../db";

export const create_timeslot_action = async () => {
  await prisma.timeslot.createMany({
    data: [
      { day: "SATURDAY", start_time: "10:00", end_time: "11:00" },
      { day: "SATURDAY", start_time: "11:00", end_time: "12:00" },
      { day: "SATURDAY", start_time: "12:00", end_time: "1:00" },
      { day: "SATURDAY", start_time: "2:00", end_time: "3:00" },
      { day: "SATURDAY", start_time: "3:00", end_time: "4:00" },
      { day: "SUNDAY", start_time: "10:00", end_time: "11:00" },
      { day: "SUNDAY", start_time: "11:00", end_time: "12:00" },
      { day: "SUNDAY", start_time: "12:00", end_time: "1:00" },
      { day: "SUNDAY", start_time: "2:00", end_time: "3:00" },
      { day: "SUNDAY", start_time: "3:00", end_time: "4:00" },
      { day: "MONDAY", start_time: "10:00", end_time: "11:00" },
      { day: "MONDAY", start_time: "11:00", end_time: "12:00" },
      { day: "MONDAY", start_time: "12:00", end_time: "1:00" },
      { day: "MONDAY", start_time: "2:00", end_time: "3:00" },
      { day: "MONDAY", start_time: "3:00", end_time: "4:00" },
      { day: "TUESDAY", start_time: "10:00", end_time: "11:00" },
      { day: "TUESDAY", start_time: "11:00", end_time: "12:00" },
      { day: "TUESDAY", start_time: "12:00", end_time: "1:00" },
      { day: "TUESDAY", start_time: "2:00", end_time: "3:00" },
      { day: "TUESDAY", start_time: "3:00", end_time: "4:00" },
      { day: "WEDNESDAY", start_time: "10:00", end_time: "11:00" },
      { day: "WEDNESDAY", start_time: "11:00", end_time: "12:00" },
      { day: "WEDNESDAY", start_time: "12:00", end_time: "1:00" },
      { day: "WEDNESDAY", start_time: "2:00", end_time: "3:00" },
      { day: "WEDNESDAY", start_time: "3:00", end_time: "4:00" },
      { day: "THURSDAY", start_time: "10:00", end_time: "11:00" },
      { day: "THURSDAY", start_time: "11:00", end_time: "12:00" },
      { day: "THURSDAY", start_time: "12:00", end_time: "1:00" },
      { day: "THURSDAY", start_time: "2:00", end_time: "3:00" },
      { day: "THURSDAY", start_time: "3:00", end_time: "4:00" },
    ],
  });
};
