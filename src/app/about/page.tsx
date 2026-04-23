import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { prisma } from '@/lib/db';

export const dynamic = "force-dynamic";

export const metadata = {
  title: "About PKR – The Architect of Cosmic Stories",
  description: "Learn more about PKR, a Civil Engineer turned storyteller exploring the intersection of science, consciousness, and the human heart.",
};

import AboutStyles from '@/app/about/_components/AboutStyles';

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
      <AboutStyles />

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
                <h3 className="biography-label">
                  Biography
                </h3>

                <h1 className="about-main-title">
                  {page?.title || 'Architect of stories, voyaging through the cosmic infinite.'}
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
                  <div className="fallback-bio-content">
                    <p>
                      PKR is a visionary storyteller dedicated to exploring the boundaries of science fiction and speculative mystery. With a focus on cosmic mysteries and the philosophy of existence, PKR weaves intricate narratives that challenge the mind while touching the soul.
                    </p>
                    
                    <p>
                      From the bioluminescent jungles of far-flung galaxies to the intimate corridors of memory in historical fiction, PKR’s work is characterized by cinematic detail, emotional resonance, and intellectual depth.
                    </p>

                    <p>
                      When not architecting new universes, PKR can be found studying the latest advancements in quantum physics or lost in the timeless beauty of classical literature. This bridge between the future and the past is the heartbeat of every PKR novel.
                    </p>
                  </div>
                )}

                <div className="mission-highlight">
                  <h3 className="mission-title">
                    The Mission
                  </h3>

                  <p className="mission-text">
                    The goal of PKR Writes is to ignite curiosity and wonder—connecting ideas, imagination, and impact through the power of professional storytelling.
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