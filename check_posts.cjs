const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const posts = await prisma.blogPost.findMany({
      select: {
        slug: true,
        title: true,
        content: true
      }
    });

    console.log('--- BLOG POSTS WORD COUNT ---');
    posts.forEach(post => {
      const wordCount = post.content.split(/\s+/).length;
      console.log(`${post.slug}: ${wordCount} words (Title: ${post.title})`);
    });
  } catch (err) {
    console.error('Error fetching posts:', err);
  } finally {
    await prisma.$disconnect();
    process.exit(0);
  }
}

main();
