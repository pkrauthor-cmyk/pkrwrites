import { PrismaClient } from '../generated/prisma';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import path from 'path';
import 'dotenv/config';

const globalForPrisma = global as unknown as { prisma: PrismaClient }

// Support both .env and .env.local via Next.js logic
const DATABASE_URL = process.env.DATABASE_URL || "file:./dev.db";

// Robust path extraction
const cleanUrl = DATABASE_URL.replace(/^["']|["']$/g, '').replace('file:', '').trim();
const absolutePath = path.isAbsolute(cleanUrl) 
  ? cleanUrl 
  : path.resolve(process.cwd(), cleanUrl);

console.log('🔌 Initializing Prisma with factory for:', absolutePath);

/**
 * In Prisma 7, when using driver adapters, the client can be initialized 
 * with a factory that handles the connection.
 */
const factory = new PrismaBetterSqlite3({ url: absolutePath });

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    // @ts-ignore - Prisma 7 type definitions for adapters are still evolving
    adapter: factory, 
    log: ['query', 'info', 'warn', 'error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
