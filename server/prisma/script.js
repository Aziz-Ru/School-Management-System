const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

require("dotenv").config();

async function main() {
  await prisma.school.deleteMany();
  const school = await prisma.school.create({
    data: {
      SHId: "2211",
      SHName: "CSCR",
      SHAddress: "Rangpur",
    },
  });
  const schoolFind = await prisma.school.findFirst({
    where: { SHName: "cscr" },
  });
  console.log(school);
  console.log(schoolFind.SHId);
}

main()
  .catch((e) => {
    console.error(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
