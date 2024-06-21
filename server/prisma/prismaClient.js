const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// async function main() {
//   try {
//     const scl = await prisma.school.create({
//       data: {
//         id: "cscr32",
//         name: "cscr",
//         address: "Rangpur",
//         establishAt: "2024-9-12",
//       },
//     });
//     console.log(scl);
//   } catch (error) {
//     console.log(error);
//   }
// }
// main();

module.exports = prisma;
