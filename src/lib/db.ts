import { PrismaClient } from '../generated/prisma';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const databaseUrl = process.env.DATABASE_URL;

export const prisma = (() => {
  if (globalForPrisma.prisma) {
    return globalForPrisma.prisma;
  }

  if (databaseUrl) {
    const pool = new pg.Pool({ connectionString: databaseUrl });
    const adapter = new PrismaPg(pool);
    return new PrismaClient({ 
      adapter,
      log: ['error']
    });
  }

  // Fallback for build phase - will throw on query but allow initialization
  return new PrismaClient({
    log: ['error']
  });
})();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}