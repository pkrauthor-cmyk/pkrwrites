const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Flagship Books...');

  const flagshipBooks = [
    {
      asin: 'B0CXM9N5F2',
      title: 'The Final Layer: Unveiling the Human Experience',
      author: 'PK R',
      coverUrl: 'https://m.media-amazon.com/images/I/71u9Q6v7wXL._SL1500_.jpg',
      amznLink: 'https://www.amazon.com/dp/B0CXM9N5F2',
      description: 'A profound exploration into the depths of identity, consciousness, and the hidden structures that define our reality.',
      price: '$12.99'
    },
    {
      asin: 'B0CRYW8S88',
      title: 'The Success Code: Strategic Mastery',
      author: 'PK R',
      coverUrl: 'https://m.media-amazon.com/images/I/61N+x-4v+9L._SL1500_.jpg',
      amznLink: 'https://www.amazon.com/dp/B0CRYW8S88',
      description: 'A blueprint for professional and personal excellence in the digital age.',
      price: '$9.99'
    }
  ];

  for (const book of flagshipBooks) {
    await prisma.book.upsert({
      where: { asin: book.asin },
      update: book,
      create: book
    });
    console.log(`✅ Seeded: ${book.title}`);
  }

  console.log('✨ Seeding Complete.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
