import prisma from "../prisma/db.js";

async function main() {
  await prisma.section.count();
}
