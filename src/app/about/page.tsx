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
    console.log("DB error:", error);
  }

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <section style={{ paddingTop: '160px', paddingBottom: '8rem', background: 'var(--bg-dark)', position: 'relative', overflow: 'hidden' }}>

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

            {/* LEFT IMAGE */}
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
            <div className="fade-in" style={{ animationDelay: '0.3s' }}>

              <div className="section-title" style={{ textAlign: 'left', marginBottom: '4.5rem' }}>
                <h3 style={{
                  textTransform: 'uppercase',
                  letterSpacing: '0.3em',
                  color: 'var(--primary)',
                  marginBottom: '1.5rem',
                  fontSize: '0.75rem',
                  fontWeight: 700
                }}>
                  Biography
                </h3>

                <h1 style={{
                  fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                  marginBottom: '2.5rem',
                  fontWeight: 800
                }}>
                  {page?.title || 'From Blueprints to the Stars'}
                </h1>

                <div className="underline"></div>
              </div>

              <div style={{ fontSize: '1.1rem', lineHeight: '2', color: 'var(--text-muted)' }}>

                {/* ✅ SAFE CONTENT */}
                {page?.content ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: page.content }}
                  />
                ) : (
                  <>
                    <p style={{ marginBottom: '2.5rem' }}>
                      Welcome to <strong style={{ color: 'white' }}>PKR Writes</strong>. I am PKR, a Civil Engineer turned storyteller exploring the universe through imagination and emotion.
                    </p>

                    <p style={{ marginBottom: '2.5rem' }}>
                      My writing bridges science, consciousness, and storytelling—creating cinematic experiences that inspire and provoke thought.
                    </p>
                  </>
                )}

                <h3 style={{
                  color: 'white',
                  marginTop: '6rem',
                  marginBottom: '2rem',
                  fontSize: '2.2rem',
                  fontWeight: 700
                }}>
                  The Mission
                </h3>

                <p>
                  The goal of PKR Writes is to ignite curiosity and wonder—connecting ideas, imagination, and impact.
                </p>

              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}