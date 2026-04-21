import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

const db = new Database('dev.db');

function updatePost(slug, filePath) {
    if (!fs.existsSync(filePath)) {
        console.error(`File not found: ${filePath}`);
        return;
    }
    const content = fs.readFileSync(filePath, 'utf8');
    const result = db.prepare('UPDATE BlogPost SET content = ? WHERE slug = ?').run(content, slug);
    console.log(`Updated ${slug}: ${result.changes} row(s) changed.`);
}

// Update All Posts
updatePost('light-between-lifetimes-love-redemption', './scratch/post1.html');
updatePost('final-layer-science-soul-consciousness', './scratch/post2.html');
updatePost('navigating-infinite-path-pkr-cinematic-worlds', './scratch/post3.html');

process.exit(0);
