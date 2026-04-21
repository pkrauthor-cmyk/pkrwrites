import Database from 'better-sqlite3';
import fs from 'fs';
const db = new Database('dev.db');

const posts = db.prepare('SELECT slug, content FROM BlogPost').all();

posts.forEach(post => {
    fs.writeFileSync(`./${post.slug}.html`, post.content);
});

process.exit(0);
