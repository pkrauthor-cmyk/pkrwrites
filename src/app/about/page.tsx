import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { prisma } from '@/lib/db';

export const dynamic = "force-dynamic";

export const metadata = {
  title: "About PKR – The Architect of Cosmic Stories",
  description: "Learn more about PKR, a Civil Engineer turned storyteller exploring the intersection of science, consciousness, and the human heart.",
};

export default async function AboutPage() {
  let page: any = null;

  try {
    page = await prisma.page.findUnique({
      where: { slug: 'about' }
    });
  } catch (error) {
    console.error("About page DB fetch error:", error);
  }


  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <section style={{ 
        paddingTop: 'clamp(100px, 15vh, 160px)', 
        paddingBottom: 'clamp(4rem, 10vh, 8rem)', 
        background: 'var(--bg-dark)', 
        position: 'relative', 
        overflow: 'hidden',
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem'
      }}>

        <div style={{
          position: 'absolute',
          top: '5%',
          left: '-5%',
          width: 'clamp(300px, 50vw, 600px)',
          height: 'clamp(300px, 50vw, 600px)',
          background: 'radial-gradient(circle, rgba(197, 160, 89, 0.04) 0%, transparent 70%)',
          filter: 'blur(100px)',
          zIndex: 0
        }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '1100px' }}>
          <div className="about-grid">
            {/* LEFT IMAGE */}
            <div className="fade-in portrait-container">
              <div style={{
                position: 'relative',
                padding: 'clamp(8px, 2vw, 12px)',
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
                    display: 'block'
                  }}
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

            {/* RIGHT CONTENT */}
            <div className="fade-in bio-content-area" style={{ animationDelay: '0.3s' }}>
              <div className="section-title" style={{ textAlign: 'left', marginBottom: 'clamp(2.5rem, 8vw, 4.5rem)' }}>
                <h3 style={{
                  textTransform: 'uppercase',
                  letterSpacing: '0.3em',
                  color: 'var(--primary)',
                  marginBottom: '1rem',
                  fontSize: '0.75rem',
                  fontWeight: 700
                }}>
                  Biography
                </h3>

                <h1 style={{
                  fontSize: 'clamp(2.2rem, 6vw, 4.5rem)',
                  marginBottom: '2rem',
                  fontWeight: 800,
                  lineHeight: 1.1
                }}>
                  {page?.title || 'From Blueprints to the Stars'}
                </h1>

                <div className="underline"></div>
              </div>

              <div className="editorial-bio-text">
                {page?.content ? (
                  <div
                    className="db-rendered-content"
                    dangerouslySetInnerHTML={{ __html: page.content }}
                  />
                ) : (
                  <>
                    <p style={{ marginBottom: '2rem' }}>
                      Welcome to <strong style={{ color: 'white' }}>PKR Writes</strong>. I am PKR, a Civil Engineer turned storyteller exploring the universe through imagination and emotion.
                    </p>

                    <p style={{ marginBottom: '2rem' }}>
                      My writing bridges science, consciousness, and storytelling—creating cinematic experiences that inspire and provoke thought.
                    </p>
                  </>
                )}

                <div className="mission-highlight">
                  <h3 style={{
                    color: 'white',
                    marginTop: '4rem',
                    marginBottom: '1.5rem',
                    fontSize: 'clamp(1.8rem, 4vw, 2.2rem)',
                    fontWeight: 700,
                    fontFamily: 'var(--font-playfair)'
                  }}>
                    The Mission
                  </h3>

                  <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: 'rgba(255,255,255,0.9)', fontStyle: 'italic' }}>
                    The goal of PKR Writes is to ignite curiosity and wonder—connecting ideas, imagination, and impact.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .about-grid {
            display: grid;
            grid-template-columns: 400px 1fr;
            gap: 6rem;
            align-items: start;
          }
          .editorial-bio-text {
            font-size: 1.15rem;
            line-height: 2.1;
            color: var(--text-muted);
          }
          .mission-highlight {
            border-left: 3px solid var(--primary);
            padding-left: 2.5rem;
            margin-top: 5rem;
          }
          
          @media (max-width: 1024px) {
            .about-grid {
              grid-template-columns: 1fr;
              gap: 4rem;
            }
            .portrait-container {
              max-width: 500px;
              margin: 0 auto;
            }
            .bio-content-area {
              text-align: center;
            }
            .section-title {
              display: flex;
              flex-direction: column;
              align-items: center;
              text-align: center !important;
            }
            .mission-highlight {
              border-left: none;
              border-top: 1px solid rgba(212, 175, 55, 0.2);
              padding-left: 0;
              padding-top: 3rem;
              text-align: center;
            }
          }
        `}</style>
      </section>

      <Footer />
    </main>
  );
}