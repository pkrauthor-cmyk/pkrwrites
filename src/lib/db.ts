import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const databaseUrl = process.env.DATABASE_URL;

export const prisma = (() => {
  if (globalForPrisma.prisma) {
    return globalForPrisma.prisma;
  }

  if (databaseUrl) {
    console.log('Initializing Prisma with PostgreSQL adapter...');
    const pool = new pg.Pool({ 
      connectionString: databaseUrl,
      connectionTimeoutMillis: 5000,
    });
    
    pool.on('error', (err) => {
      console.error('Unexpected error on idle client', err);
    });

    const adapter = new PrismaPg(pool);
    return new PrismaClient({ 
      adapter,
      log: ['error', 'warn']
    });
  }

  console.warn('DATABASE_URL not found, using fallback Prisma Client');
  // Fallback for build phase - will throw on query but allow initialization
  return new PrismaClient({
    log: ['error']
  });
})();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}