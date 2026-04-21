import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';
import BlogEditor from '../../_components/BlogEditor';

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  
  const post = await prisma.blogPost.findUnique({
    where: { id },
  });

  if (!post) {
    notFound();
  }

  const books = await prisma.book.findMany({ orderBy: { title: 'asc' } });

  return (
    <div>
      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', fontFamily: 'var(--font-playfair)' }}>Edit Post</h1>
        <p style={{ color: 'var(--text-muted)' }}>Refining the cosmic message.</p>
      </div>
      
      <BlogEditor post={post} books={books} />
    </div>
  );
}
