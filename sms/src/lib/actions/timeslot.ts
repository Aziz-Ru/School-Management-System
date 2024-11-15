"use server";

import prisma from "../db";

export const create_timeslot_action = async () => {
  await prisma.timeslot.createMany({
    data: [
      { day: "SATURDAY", hour: 1 },
      { day: "SATURDAY", hour: 2 },
      { day: "SATURDAY", hour: 3 },
      { day: "SATURDAY", hour: 4 },
      { day: "SATURDAY", hour: 5 },
      { day: "SUNDAY", hour: 1 },
      { day: "SUNDAY", hour: 2 },
      { day: "SUNDAY", hour: 3 },
      { day: "SUNDAY", hour: 4 },
      { day: "SUNDAY", hour: 5 },
      { day: "MONDAY", hour: 1 },
      { day: "MONDAY", hour: 2 },
      { day: "MONDAY", hour: 3 },
      { day: "MONDAY", hour: 4 },
      { day: "MONDAY", hour: 5 },
      { day: "TUESDAY", hour: 1 },
      { day: "TUESDAY", hour: 2 },
      { day: "TUESDAY", hour: 3 },
      { day: "TUESDAY", hour: 4 },
      { day: "TUESDAY", hour: 5 },
      { day: "WEDNESDAY", hour: 1 },
      { day: "WEDNESDAY", hour: 2 },
      { day: "WEDNESDAY", hour: 3 },
      { day: "WEDNESDAY", hour: 4 },
      { day: "WEDNESDAY", hour: 5 },
      { day: "THURSDAY", hour: 1 },
      { day: "THURSDAY", hour: 2 },
      { day: "THURSDAY", hour: 3 },
      { day: "THURSDAY", hour: 4 },
      { day: "THURSDAY", hour: 5 },
    ],
  });
};
