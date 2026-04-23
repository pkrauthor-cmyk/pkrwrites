import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EmailLink from '@/components/EmailLink';

export const metadata = {
  title: "Contact PKR – Reach Out to the Architect of Stories",
  description:
    "Get in touch with PKR for collaborations, speaking engagements, or professional inquiries.",
};

export default function ContactPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Navbar />

      <section
        style={{
          paddingTop: 'clamp(100px, 15vh, 160px)',
          paddingBottom: 'clamp(4rem, 10vh, 8rem)',
          background: 'var(--bg-dark)',
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem'
        }}
      >
        {/* Background Decorative Element */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '800px',
            height: '800px',
            background:
              'radial-gradient(circle, rgba(197, 160, 89, 0.03) 0%, transparent 70%)',
            filter: 'blur(100px)',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        ></div>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div
            style={{
              maxWidth: '850px',
              margin: '0 auto',
              textAlign: 'center',
            }}
          >
            <div className="section-title fade-in">
              <h3
                style={{
                  textTransform: 'uppercase',
                  letterSpacing: '0.3em',
                  color: 'var(--primary)',
                  marginBottom: '1.5rem',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                }}
              >
                Get In Touch
              </h3>

              <h1
                style={{
                  fontSize: 'clamp(2.5rem, 7vw, 5rem)',
                  marginBottom: '2.5rem',
                  fontWeight: 800,
                }}
              >
                Let's Connect
              </h1>

              <div className="underline" style={{ margin: '0 auto' }}></div>
            </div>

            <p
              className="fade-in"
              style={{
                fontSize: '1.1rem',
                lineHeight: '1.9',
                color: 'var(--text-muted)',
                marginBottom: '5rem',
                animationDelay: '0.2s',
              }}
            >
              Whether you have a question about my work, are interested in a
              collaboration, or simply wish to share your thoughts on the
              infinite mysteries of the universe, I would love to hear from you.
            </p>

            {/* ✅ FIXED SECTION (MAIN ERROR FIXED HERE) */}
            <div
              className="glass-card fade-in"
              style={{
                padding: 'clamp(2.5rem, 8vw, 5rem)',
                background: 'rgba(255, 255, 255, 0.01)',
                borderRadius: '2px',
                border: '1px solid var(--glass-border)',
                display: 'inline-block',
                width: '100%',
                maxWidth: '650px',
                transition: 'all 0.6s var(--ease-premium)',
                boxShadow: '0 40px 100px -20px rgba(0,0,0,0.5)',
                position: 'relative',
                animationDelay: '0.4s',
              }}
            >
              <h2
                style={{
                  fontSize: '1.8rem',
                  color: 'white',
                  marginBottom: '1.5rem',
                  letterSpacing: '-0.01em',
                  fontWeight: 700,
                }}
              >
                Direct Communications
              </h2>

              <div
                style={{
                  height: '1px',
                  background: 'var(--primary)',
                  width: '60px',
                  margin: '2rem auto',
                  opacity: 0.3,
                }}
              ></div>

              <EmailLink email="pkr.author@gmail.com" />

              <p
                style={{
                  color: 'var(--text-muted)',
                  fontSize: '0.85rem',
                  marginTop: '2rem',
                  opacity: 0.8,
                }}
              >
                Expected response time for professional inquiries: 24–48 hours.
              </p>
            </div>

            <div
              className="fade-in"
              style={{
                marginTop: '7rem',
                animationDelay: '0.6s',
              }}
            >
              <h3
                style={{
                  color: 'white',
                  fontSize: '0.8rem',
                  marginBottom: '2.5rem',
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  opacity: 0.7,
                  fontWeight: 700,
                }}
              >
                Professional Channels
              </h3>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 'clamp(1.5rem, 4vw, 3rem)',
                  flexWrap: 'wrap',
                }}
              >
                <a
                  href="https://www.amazon.com/author/pk_r"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link"
                  style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.75rem',
                    letterSpacing: '0.2em',
                    fontWeight: 700,
                  }}
                >
                  AMAZON STORE
                </a>

                <a
                  href="#"
                  className="nav-link"
                  style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.75rem',
                    letterSpacing: '0.2em',
                    fontWeight: 700,
                  }}
                >
                  TWITTER / X
                </a>

                <a
                  href="#"
                  className="nav-link"
                  style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.75rem',
                    letterSpacing: '0.2em',
                    fontWeight: 700,
                  }}
                >
                  LINKEDIN
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}