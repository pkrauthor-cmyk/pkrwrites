import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';

export const metadata = {
  title: "About PKR – The Architect of Cosmic Stories",
  description: "Learn more about PKR, a Civil Engineer turned storyteller exploring the intersection of science, consciousness, and the human heart.",
};

export default async function AboutPage() {
  const page = await prisma.page.findUnique({
    where: { slug: 'about' }
  });

  if (!page) {
    // If not in DB, we could fallback to static or 404
    // For now, let's just use the DB content or a default
  }

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <section style={{ paddingTop: '160px', paddingBottom: '8rem', background: 'var(--bg-dark)', position: 'relative', overflow: 'hidden' }}>
        {/* Background Decorative Element */}
        <div style={{
          position: 'absolute',
          top: '5%',
          left: '-5%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(197, 160, 89, 0.04) 0%, transparent 70%)',
          filter: 'blur(100px)',
          zIndex: 0
        }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="responsive-grid grid-2" style={{ alignItems: 'flex-start', gap: '6rem' }}>
            <div className="fade-in">
              <div style={{ 
                position: 'relative',
                padding: '12px',
                background: 'rgba(255, 255, 255, 0.015)',
                border: '1px solid var(--glass-border)',
                borderRadius: '2px',
                boxShadow: '0 40px 100px -20px rgba(0,0,0,0.6)',
                overflow: 'hidden'
              }}>
                <img 
                  src="/images/pkr-portrait.png" 
                  alt="PKR - The Architect of Cosmic Stories" 
                  style={{ 
                    width: '100%', 
                    height: 'auto', 
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 1.2s var(--ease-premium)'
                  }}
                  className="author-image"
                />
              </div>
              <div style={{ 
                marginTop: '2.5rem', 
                textAlign: 'center', 
                fontSize: '0.7rem', 
                color: 'var(--primary)', 
                letterSpacing: '0.4em', 
                fontWeight: 800,
                opacity: 0.8,
                textTransform: 'uppercase'
              }}>
                ◆ Architect of the Infinite ◆
              </div>
            </div>
            
            <div className="fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="section-title" style={{ textAlign: 'left', marginBottom: '4.5rem' }}>
                <h3 style={{ textTransform: 'uppercase', letterSpacing: '0.3em', color: 'var(--primary)', marginBottom: '1.5rem', fontSize: '0.75rem', fontWeight: 700 }}>Biography</h3>
                <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', marginBottom: '2.5rem', fontWeight: 800 }}>
                  {page?.title || 'From Blueprints to the Stars'}
                </h1>
                <div className="underline" style={{ margin: '0' }}></div>
              </div>
              
              <div style={{ fontSize: '1.1rem', lineHeight: '2', color: 'var(--text-muted)' }}>
                {/* Dynamic Content from DB */}
                <div 
                  className="page-dynamic-content author-style" 
                  dangerouslySetInnerHTML={{ __html: page?.content || '' }} 
                />

                {!page && (
                  <>
                    <p style={{ marginBottom: '2.5rem' }}>
                      Welcome to <strong style={{ color: 'white' }}>PKR Writes</strong>. I am PKR, a Civil Engineer who traded blueprints for the infinite layers of the universe. As a contemporary storyteller, I find my inspiration at the delicate intersection of logic, consciousness, and the human heart.
                    </p>
                    <p style={{ marginBottom: '2.5rem' }}>
                      My writing is a bridge between scientific imagination and deep emotional resonance, captured in a cinematic voice that explores both the vast mysteries of the cosmos and the intimate beauty of human connection.
                    </p>
                  </>
                )}
                
                <h3 style={{ color: 'white', marginTop: '6rem', marginBottom: '2rem', fontSize: '2.2rem', fontWeight: 700, letterSpacing: '-0.02em' }}>The Mission</h3>
                <p style={{ marginBottom: '2.5rem' }}>
                  The goal of "PKR Writes" is to ignite a sense of wonder. Whether you are voyaging through interstellar voids or seeking the light between lifetimes, every book is a brick in the bridge between an idea and its impact.
                </p>
                
                <h3 style={{ color: 'white', marginTop: '5rem', marginBottom: '2.5rem', fontSize: '0.8rem', letterSpacing: '0.3em', fontWeight: 800, textTransform: 'uppercase', opacity: 0.9 }}>Creative Pillars</h3>
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '6rem' }}>
                  <li style={{ marginBottom: '2rem', display: 'flex', alignItems: 'flex-start', gap: '2rem' }}>
                    <span style={{ color: 'var(--primary)', fontSize: '1.5rem', lineHeight: '1', marginTop: '-0.2rem' }}>◇</span> 
                    <div>
                      <strong style={{ color: 'white', display: 'block', marginBottom: '0.4rem', fontSize: '1rem' }}>Speculative Fiction</strong>
                      <span style={{ fontSize: '0.95rem', opacity: 0.8 }}>Exploring the boundaries of scientific imagination.</span>
                    </div>
                  </li>
                  <li style={{ marginBottom: '2rem', display: 'flex', alignItems: 'flex-start', gap: '2rem' }}>
                    <span style={{ color: 'var(--primary)', fontSize: '1.5rem', lineHeight: '1', marginTop: '-0.2rem' }}>◇</span> 
                    <div>
                      <strong style={{ color: 'white', display: 'block', marginBottom: '0.4rem', fontSize: '1rem' }}>Consciousness</strong>
                      <span style={{ fontSize: '0.95rem', opacity: 0.8 }}>Delving into the mysteries of the human soul.</span>
                    </div>
                  </li>
                  <li style={{ marginBottom: '2rem', display: 'flex', alignItems: 'flex-start', gap: '2rem' }}>
                    <span style={{ color: 'var(--primary)', fontSize: '1.5rem', lineHeight: '1', marginTop: '-0.2rem' }}>◇</span> 
                    <div>
                      <strong style={{ color: 'white', display: 'block', marginBottom: '0.4rem', fontSize: '1rem' }}>Cosmology</strong>
                      <span style={{ fontSize: '0.95rem', opacity: 0.8 }}>Bridging philosophy and cosmic narrative.</span>
                    </div>
                  </li>
                </ul>
                
                <div style={{ 
                  padding: '4rem', 
                  background: 'rgba(197, 160, 89, 0.03)', 
                  borderRadius: '2px', 
                  borderLeft: '2px solid var(--primary)', 
                  position: 'relative', 
                  overflow: 'hidden'
                }}>
                  <div style={{ position: 'absolute', top: '1.5rem', right: '2rem', fontSize: '8rem', color: 'var(--primary)', opacity: 0.05, fontFamily: 'serif', lineHeight: 1 }}>&quot;</div>
                  <p style={{ fontStyle: 'italic', color: 'white', position: 'relative', zIndex: 1, fontSize: '1.2rem', lineHeight: '1.8' }}>
                    Every word is a commitment. Every book is a conversation between the author and the infinite potential of the reader.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
