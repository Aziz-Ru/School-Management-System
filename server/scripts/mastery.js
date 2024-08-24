import prisma from "../prisma/db.js";

async function dbMaster(tableName) {
  const result = await prisma.$queryRaw` PRAGMA table_info(${tableName});`;

  console.log(result);
}
dbMaster("section");
