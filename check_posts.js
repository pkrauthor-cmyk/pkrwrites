import pkg from '@prisma/client';
const { PrismaClient } = pkg;
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
      const cleanContent = post.content.replace(/<[^>]*>?/gm, ' '); // Strip HTML if any
      const wordCount = cleanContent.trim().split(/\s+/).length;
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
