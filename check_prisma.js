import { prisma } from './src/lib/db.js';

async function test() {
  try {
    console.log('Models available in client property keys:', Object.keys(prisma).filter(k => !k.startsWith('_')));
    if (prisma.page) {
      console.log('✅ Page model found!');
      const count = await prisma.page.count();
      console.log('Page count in database:', count);
    } else {
      console.log('❌ Page model NOT found in prisma client interface.');
    }
  } catch (err) {
    console.error('Test failed with error:', err.message);
  }
}

test()
  .catch(console.error)
  .finally(() => process.exit(0));
