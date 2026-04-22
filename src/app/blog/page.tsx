import { prisma } from '@/lib/db';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// 🚀 VERY IMPORTANT
export const dynamic = "force-dynamic";

export default async function BlogPage() {
  let posts: any[] = [];

  try {
    // ✅ ALWAYS fetch from DB (remove Vercel restriction)
    posts = await prisma.blog.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } catch (e) {
    console.log("DB error:", e);
  }

  return (
    <main style={{ minHeight: '100vh' }}>
      <Navbar />

      <section style={{ padding: '120px 20px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1 style={{ marginBottom: '2rem' }}>Blog</h1>

          {posts.length === 0 ? (
            <p>No blog posts found.</p>
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