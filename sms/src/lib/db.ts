import { PrismaClient } from "@prisma/client";

const dbConnection = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prisma: ReturnType<typeof dbConnection>;
} & typeof global;

const prisma = globalThis.prisma || dbConnection();

if (process.env.NODE_ENV === "development") globalThis.prisma = prisma;

export default prisma;
