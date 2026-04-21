import Database from 'better-sqlite3';
const db = new Database('dev.db');

const initialPages = [
  {
    slug: 'about',
    title: 'About PKR',
    content: `
      <h2>From Blueprints to the Stars</h2>
      <p>Welcome to <strong>PKR Writes</strong>. I am PKR, a Civil Engineer who traded blueprints for the infinite layers of the universe. As a contemporary storyteller, I find my inspiration at the delicate intersection of logic, consciousness, and the human heart.</p>
      <p>My writing is a bridge between scientific imagination and deep emotional resonance, captured in a cinematic voice that explores both the vast mysteries of the cosmos and the intimate beauty of human connection.</p>
      <h3>The Mission</h3>
      <p>The goal of "PKR Writes" is to ignite a sense of wonder. Whether you are voyaging through interstellar voids or seeking the light between lifetimes, every book is a brick in the bridge between an idea and its impact.</p>
    `
  },
  {
    slug: 'privacy',
    title: 'Privacy Policy',
    content: `
      <h2>Privacy Policy</h2>
      <p>At <strong>PKR Writes</strong>, we respect your privacy and are committed to protecting it through our compliance with this policy. This Privacy Policy describes the types of information we may collect from you or that you may provide when you visit the website <strong>pkrwrites.com</strong> (our "Website") and our practices for collecting, using, maintaining, protecting, and disclosing that information.</p>
      <h3>1. Information We Collect</h3>
      <p>We collect several types of information from and about users of our Website, including Personal Identification and Usage Data.</p>
    `
  },
  {
    slug: 'terms',
    title: 'Terms of Service',
    content: `
      <h2>Terms of Service</h2>
      <h3>1. Acceptance of Terms</h3>
      <p>By accessing and using <strong>PKR Writes</strong> (the "Website"), you accept and agree to be bound by the terms and provision of this agreement.</p>
      <h3>2. Intellectual Property Rights</h3>
      <p>The Website and its original content, features, and functionality are owned by <strong>PKR</strong> and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.</p>
    `
  }
];

const insert = db.prepare('INSERT OR REPLACE INTO Page (id, slug, title, content, updatedAt) VALUES (?, ?, ?, ?, ?)');

initialPages.forEach((page, i) => {
    insert.run(`page_${i}`, page.slug, page.title, page.content, Date.now());
});

console.log('Seeded initial pages successfully.');
process.exit(0);
