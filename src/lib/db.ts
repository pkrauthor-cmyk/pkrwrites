import { PrismaClient } from '../generated/prisma';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import path from 'path';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

let prisma: PrismaClient;

const dbPath = path.join(process.cwd(), 'dev.db');

const adapter = new PrismaBetterSqlite3({
  url: `file:${dbPath}`,
});

prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}


export { prisma };