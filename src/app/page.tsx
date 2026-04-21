import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookCard from '@/components/BookCard';
import BlogCard from '@/components/BlogCard';
import { prisma } from '@/lib/db';

export default async function Home() {
  let books: any[] = [];
  let posts: any[] = [];

  if (!process.env.VERCEL) {
    books = await prisma.book.findMany({
      take: 6,
      orderBy: { updatedAt: 'desc' }
    });

    posts = await prisma.blogPost.findMany({
      take: 3,
      where: { status: 'published' },
      orderBy: { publishedAt: 'desc' }
    });
  }

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      {/* Hero Section */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '120px',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--bg-dark)'
      }}>
        {/* Advanced Mesh Gradient Background */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.4,
          background: `
            radial-gradient(at 0% 0%, rgba(197, 160, 89, 0.1) 0px, transparent 50%),
            radial-gradient(at 100% 0%, rgba(142, 111, 62, 0.1) 0px, transparent 50%),
            radial-gradient(at 100% 100%, rgba(197, 160, 89, 0.05) 0px, transparent 50%),
            radial-gradient(at 0% 100%, rgba(142, 111, 62, 0.05) 0px, transparent 50%)
          `,
          zIndex: 0
        }}></div>

        {/* Floating Orb */}
        <div style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(197, 160, 89, 0.08) 0%, transparent 70%)',
          filter: 'blur(80px)',
          zIndex: 0,
          animation: 'pulse-slow 10s infinite alternate'
        }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="responsive-grid grid-2" style={{ alignItems: 'center', gap: '6rem' }}>
            <div className="fade-in">
              <div style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '1rem', 
                marginBottom: '2rem',
                padding: '0.5rem 1rem',
                background: 'rgba(197, 160, 89, 0.05)',
                border: '1px solid rgba(197, 160, 89, 0.1)',
                borderRadius: '100px'
              }}>
                <span style={{ width: '8px', height: '8px', background: 'var(--primary)', borderRadius: '50%', boxShadow: '0 0 10px var(--primary)' }}></span>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', color: 'var(--primary)', textTransform: 'uppercase' }}>Available Now</span>
              </div>

              <h1 style={{ 
                lineHeight: '1', 
                marginBottom: '2.5rem', 
                fontSize: 'clamp(3.5rem, 9vw, 5.5rem)',
                fontWeight: 800
              }}>
                PKR Writes – <br />
                <span style={{ 
                  color: 'var(--primary)', 
                  backgroundImage: 'linear-gradient(to right, var(--primary), var(--primary-light))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block'
                }}>
                  Books That Inspire
                </span>
              </h1>
              <p style={{ 
                fontSize: 'clamp(1rem, 2vw, 1.15rem)', 
                color: 'var(--text-muted)', 
                marginBottom: '4.5rem', 
                maxWidth: '580px',
                fontWeight: 400,
                lineHeight: '1.9'
              }}>
                Explore high-impact releases, professional writing insights, and powerful self-publishing strategies. PKR crafts stories that challenge the status quo and empower the spirit.
              </p>
              <div style={{ display: 'flex', gap: '2.5rem' }} className="stack-mobile">
                <Link href="/books" className="btn btn-primary" style={{ boxShadow: '0 20px 40px -10px var(--primary-glow)' }}>VIEW COLLECTION</Link>
                <a href="https://www.amazon.com/author/pk_r" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  AMAZON AUTHOR PAGE
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              </div>
            </div>

            <div className="fade-in" style={{ animationDelay: '0.4s' }}>
              <div style={{
                position: 'relative',
                padding: '12px',
                background: 'rgba(255, 255, 255, 0.02)',
                borderRadius: '4px',
                border: '1px solid var(--glass-border)',
                boxShadow: '0 40px 100px -20px rgba(0,0,0,0.6)',
                transform: 'perspective(2000px) rotateY(-12deg) rotateX(8deg)',
                transition: 'transform 0.8s var(--ease-premium)',
                overflow: 'hidden'
              }} className="hero-image-container">
                <img 
                  src="/images/hero-premium.png" 
                  alt="Premium Bookshelf Collection" 
                  style={{ 
                    width: '100%', 
                    height: 'auto', 
                    borderRadius: '2px',
                    display: 'block'
                  }}
                />
                {/* Dynamic Shine Effect */}
                <div style={{
                  position: 'absolute',
                  top: 0, left: '-100%', right: 0, bottom: 0,
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)',
                  animation: 'shine 4s infinite linear'
                }}></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sophisticated Scroll Indicator */}
        <div style={{
          position: 'absolute',
          bottom: '4rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          opacity: 0.5
        }}>
          <span style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase' }}>SCROLL</span>
          <div style={{ width: '1px', height: '60px', background: 'linear-gradient(to bottom, var(--primary), transparent)' }}></div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section id="books" style={{ backgroundColor: 'var(--bg-darker)', position: 'relative' }}>
        <div className="container">
          <div className="section-title reveal-on-scroll" style={{ opacity: 1 }}>
            <h3 style={{ textTransform: 'uppercase', letterSpacing: '0.3em', color: 'var(--primary)', marginBottom: '1.5rem', fontSize: '0.75rem', fontWeight: 700 }}>Curated Works</h3>
            <h2 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Featured Collection</h2>
            <div className="underline" style={{ margin: '1.5rem auto' }}></div>
            <p style={{ marginTop: '3rem', color: 'var(--text-muted)', maxWidth: '650px', margin: '3rem auto 0', fontSize: '1.05rem', lineHeight: '1.8' }}>
              A selection of high-impact titles focused on independent publishing, strategic knowledge, and the future of digital content.
            </p>
          </div>
          
          {books.length > 0 ? (
            <div className="responsive-grid" style={{
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))'
            }}>
              {books.map(book => <BookCard key={book.asin} book={book} />)}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '6rem', border: '1px dashed var(--glass-border)', borderRadius: '8px', opacity: 0.6 }}>
              <p>Syncing latest books... Check back soon!</p>
            </div>
          )}
          
          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <Link href="/books" style={{ 
              fontSize: '0.85rem', 
              color: 'var(--primary)', 
              fontWeight: 700, 
              letterSpacing: '0.2em',
              borderBottom: '1px solid var(--primary)',
              paddingBottom: '5px'
            }}>
              VIEW ALL BOOKS
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" style={{ position: 'relative' }}>
        <div className="container">
          <div className="responsive-grid grid-2" style={{ alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '5/6',
                background: 'rgba(212, 175, 55, 0.03)',
                borderRadius: '4px',
                border: '1px solid var(--glass-border)',
                overflow: 'hidden'
              }}>
                <img 
                  src="/images/pkr-portrait.png" 
                  alt="PKR - The Architect of Cosmic Stories" 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    transition: 'transform 1s cubic-bezier(0.165, 0.84, 0.44, 1)'
                  }}
                  className="author-image"
                />
              </div>
              <div style={{
                position: 'absolute',
                top: '-20px',
                left: '-20px',
                width: '80px',
                height: '80px',
                borderTop: '2px solid var(--primary)',
                borderLeft: '2px solid var(--primary)',
                opacity: 0.3
              }}></div>
            </div>
            
            <div>
              <div className="section-title" style={{ textAlign: 'left', marginBottom: '2.5rem' }}>
                <h3 style={{ textTransform: 'uppercase', letterSpacing: '0.3em', color: 'var(--primary)', marginBottom: '1.2rem', fontSize: '0.75rem', fontWeight: 700 }}>The Identity</h3>
                <h2 style={{ fontSize: '3.5rem' }}>About PKR</h2>
                <div className="underline" style={{ margin: '1.5rem 0' }}></div>
              </div>
              <p style={{ fontSize: '1.1rem', marginBottom: '1.8rem', color: '#BBB', lineHeight: 1.8 }}>
                PKR is a visionary writer and educator focused on delivering high-impact content in the niches of self-publishing, knowledge sharing, and personal growth.
              </p>
              <p style={{ fontSize: '1.1rem', marginBottom: '3rem', color: '#BBB', lineHeight: 1.8 }}>
                With a background in independent publishing and digital strategy, PKR's work bridges the gap between deep insights and practical execution. Each book is a commitment to clarity, value, and action.
              </p>
              <Link href="/about" className="btn btn-outline">READ FULL STORY</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Blog Section */}
      <section id="blog" style={{ borderTop: '1px solid var(--glass-border)' }}>
        <div className="container">
          <div className="section-title" style={{ marginBottom: '5rem' }}>
            <h3 style={{ textTransform: 'uppercase', letterSpacing: '0.3em', color: 'var(--primary)', marginBottom: '1.5rem', fontSize: '0.75rem', fontWeight: 700 }}>Editorial Channel</h3>
            <h2 style={{ fontSize: '3.5rem' }}>Latest Insights</h2>
            <div className="underline" style={{ margin: '1.5rem auto' }}></div>
          </div>
          
          <div className="responsive-grid" style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '3rem'
          }}>
            {posts.map(post => <BlogCard key={post.slug} post={post} />)}
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <Link href="/blog" className="btn btn-outline">VIEW ALL ARTICLES</Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
