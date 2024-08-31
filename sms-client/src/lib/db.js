import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  try {
    const school = await prisma.school.findMany();
    console.log(school);
  } catch (error) {
    console.error(error);
  }
};
main();

export default prisma;
