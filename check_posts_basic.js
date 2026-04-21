import Database from 'better-sqlite3';
const db = new Database('dev.db');

const posts = db.prepare('SELECT slug, title, content FROM BlogPost').all();

console.log('--- BLOG POSTS WORD COUNT ---');
posts.forEach(post => {
    const cleanContent = post.content.replace(/<[^>]*>?/gm, ' ');
    const wordCount = cleanContent.trim().split(/\s+/).length;
    console.log(`${post.slug}: ${wordCount} words (Title: ${post.title})`);
});

process.exit(0);
