import prisma from "../prisma/db.js";
const sections = ["Padma", "Meghna", "Jamuna"];
async function main() {
  for (let i = 1; i <= 12; i++) {
    for (let j = 0; j < sections.length; j++) {
      await prisma.section.create({
        data: { sectionName: `${sections[j]}-${i}`, year: "2024", classId: i },
      });
    }
  }
}

main();
