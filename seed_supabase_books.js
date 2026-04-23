import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const books = [
  {
    asin: 'B0GBWG4HSQ',
    title: 'The Light Between Lifetimes',
    author: 'PK R',
    coverUrl: 'https://m.media-amazon.com/images/I/71n37zRbmFL._AC_CR0%2C0%2C0%2C0_SY315_.jpg',
    amznLink: 'https://www.amazon.com/dp/B0GBWG4HSQ',
    description: 'A romantic fantasy of time travel, love, and redemption. Journey through a cosmic odyssey that explores the boundaries of human emotion and existence.',
    updatedAt: new Date()
  },
  {
    asin: 'B0FY31TFTQ',
    title: 'The Final Layer: A Journey Beyond Time, Space, and the Human Heart',
    author: 'PK R',
    coverUrl: 'https://m.media-amazon.com/images/I/61zNjdehc1L._AC_CR0%2C0%2C0%2C0_SY315_.jpg',
    amznLink: 'https://www.amazon.com/dp/B0FY31TFTQ',
    description: 'An cosmic odyssey that explores the boundaries of human emotion and existence, delving into the very fabric of the soul.',
    updatedAt: new Date()
  },
  {
    asin: 'B0G8L6D13F',
    title: 'Voyagers of the Infinite Path',
    author: 'PK R',
    coverUrl: 'https://m.media-amazon.com/images/I/61G6Not7qLL._AC_CR0%2C0%2C0%2C0_SY315_.jpg',
    amznLink: 'https://www.amazon.com/dp/B0G8L6D13F',
    description: 'An epic hard science fiction adventure that pushes the limits of human exploration and discovery across the infinite path.',
    updatedAt: new Date()
  }
];

async function seed() {
  console.log('Seeding books to Supabase...');
  for (const book of books) {
    await prisma.book.upsert({
      where: { asin: book.asin },
      update: book,
      create: book,
    });
    console.log(`✅ Seeded: ${book.title}`);
  }
  console.log('Done!');
}

seed()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
