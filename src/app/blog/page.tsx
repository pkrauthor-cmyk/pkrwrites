import { prisma } from '@/lib/db';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// 🚀 VERY IMPORTANT
export const dynamic = "force-dynamic";

export default async function BlogPage() {
  let posts: any[] = [];
  let books: any[] = [];

  try {
    posts = await prisma.blogPost.findMany({
      where: { status: 'published' },
      orderBy: { publishedAt: 'desc' },
    });
    books = await prisma.book.findMany();
  } catch (e) {
    console.log("DB error:", e);
  }

  // Associate books with posts for the UI
  const postsWithBooks = posts.map(post => {
    const postTitle = post.title.toLowerCase();
    const tags = post.tags?.split(',').map((t: string) => t.trim()) || [];
    
    const matchedBook = books.find(b => 
      tags.includes(b.asin) || 
      postTitle.includes(b.title.toLowerCase()) ||
      b.title.split(' ').some(word => word.length > 4 && postTitle.includes(word.toLowerCase()))
    );

    return { ...post, book: matchedBook };
  });

  return (
    <main style={{ minHeight: '100vh', background: '#050505' }}>
      <Navbar />

      <section style={{ paddingTop: '160px', paddingBottom: '8rem' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <header style={{ marginBottom: '6rem', textAlign: 'center' }}>
            <h1 style={{ fontSize: '4rem', fontFamily: 'var(--font-playfair)', marginBottom: '1rem' }}>The Chronicler</h1>
            <div className="underline" style={{ margin: '0 auto' }}></div>
            <p style={{ color: 'var(--text-muted)', marginTop: '2rem', fontSize: '1.1rem', letterSpacing: '0.1em' }}>
              DEEP DIVES • COSMIC MYSTERIES • AUTHOR INSIGHTS
            </p>
          </header>

          {postsWithBooks.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
              No stories found in the library.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}>
              {postsWithBooks.map((post) => (
                <article key={post.id} className="blog-entry" style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '180px 1fr', 
                  gap: '4rem',
                  alignItems: 'start'
                }}>
                  {/* Book Cover on the Left */}
                  <div style={{ position: 'relative' }}>
                    <div style={{
                      width: '180px',
                      aspectRatio: '2/3',
                      background: 'rgba(255,255,255,0.02)',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                      border: '1px solid rgba(212, 175, 55, 0.1)'
                    }}>
                      {post.book ? (
                        <img 
                          src={post.book.coverUrl} 
                          alt={post.book.title} 
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        />
                      ) : (
                        <div style={{ 
                          width: '100%', 
                          height: '100%', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          color: 'var(--primary)',
                          fontSize: '0.7rem',
                          textAlign: 'center',
                          padding: '1rem'
                        }}>
                          PKR WRITES
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Post Content on the Right */}
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                    <div style={{ color: 'var(--primary)', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem' }}>
                      {post.category || 'Story'} • {new Date(post.publishedAt || post.createdAt).toLocaleDateString()}
                    </div>
                    
                    <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                      <h2 style={{ 
                        fontSize: '2.5rem', 
                        fontFamily: 'var(--font-playfair)', 
                        color: 'white', 
                        lineHeight: '1.2', 
                        marginBottom: '1.5rem',
                        transition: 'color 0.3s'
                      }} className="post-title-hover">
                        {post.title}
                      </h2>
                    </Link>
                    
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '2rem', maxWidth: '650px' }}>
                      {post.excerpt}
                    </p>

                    <Link href={`/blog/${post.slug}`} style={{ 
                      color: 'var(--primary)', 
                      textDecoration: 'none', 
                      fontSize: '0.8rem', 
                      fontWeight: 700, 
                      letterSpacing: '0.1em',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }} className="read-more-link">
                      READ THE DEEP DIVE <span>→</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />

      <style jsx>{`
        .post-title-hover:hover {
          color: var(--primary) !important;
        }
        .read-more-link span {
          transition: transform 0.3s ease;
        }
        .read-more-link:hover span {
          transform: translateX(5px);
        }
        .blog-entry {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeIn 0.8s forwards;
        }
        @keyframes fadeIn {
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          .blog-entry {
            grid-template-columns: 1fr;
            gap: 2rem;
            text-align: center;
          }
          .blog-entry div {
            margin: 0 auto;
          }
        }
      `}</style>
    </main>
  );
}