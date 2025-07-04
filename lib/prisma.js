import { PrismaClient } from "@/lib/generated/prisma";

export const db=globalThis.prisma || new PrismaClient ;


if(process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}

//globalThis.prisma = db; // For Next.js hot reloading. This line ensures that the
//  Prisma Client instance is reused during development to avoid connection issues.
