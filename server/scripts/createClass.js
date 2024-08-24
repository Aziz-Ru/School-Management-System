import prisma from "../prisma/db.js";

async function main() {
  const classOBJ = [];
  const classNames = [
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
  ];
  for (let i = 1; i <= 12; i++) {
    classOBJ.push({ classId: i, className: classNames[i - 1] });
  }

  try {
    const count = await prisma.classRoom.count();
    if (count == 12) {
      console.log("Class already created");
      return;
    }
    await prisma.classRoom.createMany({ data: classOBJ });
  } catch (error) {
    console.log(error);
  }
}

main();
