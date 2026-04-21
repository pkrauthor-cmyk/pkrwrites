import { PrismaClient } from './src/generated/prisma/index.js';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import path from 'path';

const DATABASE_URL = "file:./dev.db";
const cleanUrl = DATABASE_URL.replace('file:', '');
const absolutePath = path.resolve(process.cwd(), cleanUrl);

const adapter = new PrismaBetterSqlite3({ url: absolutePath });
const prisma = new PrismaClient({ adapter });

async function main() {
  const books = [
    {
      asin: 'B0GBWG4HSQ',
      title: 'The Light Between Lifetimes',
      author: 'PK R',
      coverUrl: 'https://m.media-amazon.com/images/I/71n37zRbmFL._AC_CR0%2C0%2C0%2C0_SY315_.jpg',
      amznLink: 'https://www.amazon.com/dp/B0GBWG4HSQ',
      description: 'A romantic fantasy of time travel, love, and redemption. Journey through a cosmic odyssey that explores the boundaries of human emotion and existence.'
    },
    {
      asin: 'B0FY31TFTQ',
      title: 'The Final Layer: A Journey Beyond Time, Space, and the Human Heart',
      author: 'PK R',
      coverUrl: 'https://m.media-amazon.com/images/I/61zNjdehc1L._AC_CR0%2C0%2C0%2C0_SY315_.jpg',
      amznLink: 'https://www.amazon.com/dp/B0FY31TFTQ',
      description: 'An cosmic odyssey that explores the boundaries of human emotion and existence, delving into the very fabric of the soul.'
    },
    {
      asin: 'B0G8L6D13F',
      title: 'Voyagers of the Infinite Path',
      author: 'PK R',
      coverUrl: 'https://m.media-amazon.com/images/I/61G6Not7qLL._AC_CR0%2C0%2C0%2C0_SY315_.jpg',
      amznLink: 'https://www.amazon.com/dp/B0G8L6D13F',
      description: 'An epic hard science fiction adventure that pushes the limits of human exploration and discovery across the infinite path.'
    }
  ];

  for (const book of books) {
    await prisma.book.upsert({
      where: { asin: book.asin },
      update: book,
      create: book,
    });
  }

  console.log('✅ Manual Seed Complete with Stable URLs!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
