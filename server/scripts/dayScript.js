import prisma from "../prisma/db.js";

const main = async () => {
  const days = [
    { dayName: "SAT" },
    { dayName: "SUN" },
    { dayName: "MON" },
    { dayName: "TUE" },
    { dayName: "WED" },
    { dayName: "THU" },
  ];
  await prisma.day.deleteMany({});
  const newDay = await prisma.day.createMany({ data: days });
  console.log(newDay);
};

main();
