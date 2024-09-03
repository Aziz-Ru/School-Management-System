import prisma from "../prisma/db.js";

async function main() {
  await prisma.hour.createMany({
    data: [
      { period: "08:00-09:00", abbreviation: "AM" },
      { period: "09:00-10:00", abbreviation: "AM" },
      { period: "10:00-11:00", abbreviation: "AM" },
      { period: "11:00-12:00", abbreviation: "AM" },
      { period: "12:00-01:00", abbreviation: "PM" },
      { period: "02:00-03:00", abbreviation: "PM" },
      { period: "03:00-04:00", abbreviation: "PM" },
    ],
  });
}
main();
