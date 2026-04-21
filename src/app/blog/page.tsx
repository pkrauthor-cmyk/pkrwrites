import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import { prisma } from '@/lib/db';

export const metadata = {
  title: "Writer's Insights – The PKR Writes Blog",
  description: "Read the latest articles from PKR on self-publishing, book marketing, KDP strategies, and digital empowerment.",
};

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { status: 'published' },
    orderBy: { publishedAt: 'desc' }
  });

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <section style={{ paddingTop: '160px', paddingBottom: '8rem', background: 'var(--bg-dark)', position: 'relative', overflow: 'hidden' }}>
        {/* Background Decorative Element */}
        <div style={{
          position: 'absolute',
          top: '20%',
          right: '-10%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(142, 111, 62, 0.04) 0%, transparent 70%)',
          filter: 'blur(100px)',
          zIndex: 0
        }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-title fade-in" style={{ textAlign: 'left', marginBottom: '8rem' }}>
            <h3 style={{ textTransform: 'uppercase', letterSpacing: '0.3em', color: 'var(--primary)', marginBottom: '1.5rem', fontSize: '0.75rem', fontWeight: 700 }}>Editorial Channel</h3>
            <h1 style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', marginBottom: '2.5rem', fontWeight: 800 }}>The Journal</h1>
            <div className="underline" style={{ margin: '0' }}></div>
            <p style={{ marginTop: '3.5rem', color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '680px', lineHeight: '1.9' }}>
              In-depth articles exploring the future of independent publishing, strategic knowledge sharing, and the evolving author's journey.
            </p>
          </div>
          
          {posts.length > 0 ? (
            <div className="responsive-grid fade-in" style={{
              gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
              gap: '4rem 3rem',
              animationDelay: '0.2s'
            }}>
              {posts.map(post => <BlogCard key={post.slug} post={post} />)}
            </div>
          ) : (
            <div className="fade-in" style={{ 
              textAlign: 'center', 
              padding: '12rem 2rem', 
              border: '1px solid var(--glass-border)', 
              borderRadius: '2px', 
              background: 'rgba(255, 255, 255, 0.01)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2.5rem'
            }}>
              <div style={{ fontSize: '3.5rem', opacity: 0.1, filter: 'grayscale(100%) brightness(200%)' }}>✍️</div>
              <h3 style={{ fontSize: '1.8rem', color: 'white', letterSpacing: '0.1em', fontWeight: 700 }}>Insights Pending Publication</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '500px', lineHeight: '1.8' }}>
                The literary engine is currently generating new insights. Visit our author page for more immediate updates.
              </p>
              <a href="https://www.amazon.com/author/pk_r" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ marginTop: '1rem' }}>
                VISIT THE AMAZON AUTHOR PAGE
              </a>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
