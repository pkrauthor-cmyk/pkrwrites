import { prisma } from '@/lib/db';
import BlogEditor from '../_components/BlogEditor';

export default async function NewPostPage() {
  const books = await prisma.book.findMany({ orderBy: { title: 'asc' } });

  return (
    <div>
      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', fontFamily: 'var(--font-playfair)' }}>Create New Post</h1>
        <p style={{ color: 'var(--text-muted)' }}>Share your latest insights with the world.</p>
      </div>
      
      <BlogEditor books={books} />
    </div>
  );
}
