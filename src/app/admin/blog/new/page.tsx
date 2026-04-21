import BlogEditor from '../_components/BlogEditor';
import { prisma } from '@/lib/db';

export const dynamic = "force-dynamic";

export default async function NewPostPage() {
  let books: any[] = [];

  // ✅ SAFE DB CALL (prevents Vercel crash)
  try {
    if (!process.env.VERCEL) {
      books = await prisma.book.findMany({
        orderBy: { title: 'asc' }
      });
    }
  } catch (error) {
    console.log("DB disabled on Vercel:", error);
  }

  return (
    <div>
      <div style={{ marginBottom: '3rem' }}>
        <h1
          style={{
            fontSize: '2.5rem',
            marginBottom: '0.5rem',
            fontFamily: 'var(--font-playfair)'
          }}
        >
          Create New Post
        </h1>

        <p style={{ color: 'var(--text-muted)' }}>
          {process.env.VERCEL
            ? "Admin is disabled in production."
            : "Share your latest insights with the world."}
        </p>
      </div>

      {/* ✅ SAFE RENDER */}
      {!process.env.VERCEL ? (
        <BlogEditor books={books} />
      ) : (
        <div
          style={{
            padding: '3rem',
            border: '1px solid var(--glass-border)',
            textAlign: 'center',
            borderRadius: '6px'
          }}
        >
          <h2 style={{ marginBottom: '1rem' }}>Admin Disabled</h2>
          <p style={{ color: 'var(--text-muted)' }}>
            Please use localhost to create blog posts.
          </p>
        </div>
      )}
    </div>
  );
}