import { prisma } from '@/lib/db';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// 🚀 VERY IMPORTANT
export const dynamic = "force-dynamic";

export default async function BlogPage() {
  let posts: any[] = [];

  try {
    // ❌ Skip DB on Vercel
    if (!process.env.VERCEL) {
      posts = await prisma.blogPost.findMany({
        orderBy: { publishedAt: 'desc' },
      });
    }
  } catch (e) {
    console.log("DB disabled on Vercel");
  }

  return (
    <main style={{ minHeight: '100vh' }}>
      <Navbar />

      <section style={{ padding: '120px 20px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1 style={{ marginBottom: '2rem' }}>Blog</h1>

          {posts.length === 0 ? (
            <p>Content not available in production yet.</p>
          ) : (
            posts.map((post) => (
              <div key={post.id} style={{ marginBottom: '2rem' }}>
                <Link href={`/blog/${post.slug}`}>
                  <h3>{post.title}</h3>
                </Link>
                <p>{post.excerpt}</p>
              </div>
            ))
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}