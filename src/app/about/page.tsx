import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookCard from '@/components/BookCard';
import { prisma } from '@/lib/db';

export const dynamic = "force-dynamic";

export const metadata = {
  title: "About PKR – The Architect of Cosmic Stories",
  description: "Learn more about PKR, a Civil Engineer turned storyteller exploring the intersection of science, consciousness, and the human heart.",
};

import AboutStyles from '@/app/about/_components/AboutStyles';

const timelineItems = [
  {
    icon: '🏗️',
    year: 'The Foundation',
    title: 'Civil Engineer by Training',
    desc: 'PKR began as a Civil Engineer, building structures in the physical world — a discipline that instilled precision, pattern-thinking, and a deep respect for the invisible forces that hold things together.',
  },
  {
    icon: '🔭',
    year: 'The Awakening',
    title: 'A Turn Toward the Cosmos',
    desc: 'A lifelong fascination with astrophysics, consciousness, and the nature of existence grew into an unstoppable creative impulse — one that no blueprint could contain.',
  },
  {
    icon: '✍️',
    year: 'The First Word',
    title: 'The Storyteller Emerges',
    desc: 'With words as the new medium, PKR began weaving intricate narratives that bridge hard science and soul-stirring human drama — novels that challenge the mind while touching the heart.',
  },
  {
    icon: '📚',
    year: 'The Trilogy',
    title: 'Three Novels. One Infinite Journey.',
    desc: 'Three novels published — each standing alone, yet together forming a tapestry of consciousness, cosmos, and the irreducible mystery of being human. Available now on Amazon KDP.',
  },
];

const missionTiles = [
  { icon: '🌌', title: 'Cosmic Scope', text: 'Stories set at the scale of the universe — where physics and philosophy collide.' },
  { icon: '🧬', title: 'Deep Science', text: 'Grounded in real astrophysics, neuroscience, and evolutionary theory.' },
  { icon: '❤️', title: 'Human Heart', text: 'No matter how vast the canvas, the human condition stays at the centre.' },
  { icon: '🔮', title: 'Infinite Wonder', text: 'Every page is an invitation to question, imagine, and marvel at existence.' },
];

export default async function AboutPage() {
  let page: any = null;
  let books: any[] = [];

  try {
    page = await prisma.page.findUnique({
      where: { slug: 'about' }
    });
  } catch (error) {
    console.error("About page DB fetch error:", error);
  }

  try {
    books = await prisma.book.findMany({
      orderBy: { updatedAt: 'desc' }
    });
  } catch (error) {
    console.error("About page books fetch error:", error);
  }

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <AboutStyles />

      {/* ══════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════ */}
      <section className="about-hero" style={{ paddingTop: 'clamp(100px, 14vh, 160px)' }}>
        <div className="about-hero-bg">
          <div className="about-hero-orb-1" />
          <div className="about-hero-orb-2" />
        </div>

        <div className="container" style={{ width: '100%' }}>
          <div className="about-hero-grid">

            {/* Left — Text */}
            <div>
              <div className="about-hero-eyebrow">
                <span className="about-hero-dot" />
                <span className="about-hero-eyebrow-text">Author Profile</span>
              </div>

              <h1 className="about-hero-title">
                Architect of<br />
                <span className="about-hero-title-accent">Cosmic Stories</span>
              </h1>

              <p className="about-hero-subtitle">
                A Civil Engineer turned novelist, exploring the grand intersection of science,
                consciousness, and the irreducible mystery of being human. Three novels.
                One infinite journey.
              </p>

              <div className="about-hero-actions">
                <a
                  href="https://www.amazon.com/author/pk_r"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ boxShadow: '0 20px 40px -10px var(--primary-glow)' }}
                >
                  EXPLORE ON AMAZON
                </a>
                <Link href="/books" className="btn btn-outline">
                  VIEW COLLECTION
                </Link>
              </div>
            </div>

            {/* Right — Portrait */}
            <div className="about-portrait-wrap">
              <div className="about-corner about-corner-tl" />
              <div className="about-corner about-corner-tr" />
              <div className="about-corner about-corner-bl" />
              <div className="about-corner about-corner-br" />
              <div className="about-portrait-frame">
                <img
                  src="/images/pkr-portrait.png"
                  alt="PKR – The Architect of Cosmic Stories"
                />
                <div className="about-portrait-overlay" />
                <div className="about-portrait-caption">◆ PKR · Architect of the Infinite ◆</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          STATS BAR
      ══════════════════════════════════════ */}
      <div className="about-stats-bar">
        <div className="container">
          <div className="about-stats-grid">
            <div className="about-stat-item">
              <div className="about-stat-number">3</div>
              <div className="about-stat-label">Novels Published</div>
            </div>
            <div className="about-stat-item">
              <div className="about-stat-number">∞</div>
              <div className="about-stat-label">Worlds Imagined</div>
            </div>
            <div className="about-stat-item">
              <div className="about-stat-number">1</div>
              <div className="about-stat-label">Infinite Journey</div>
            </div>
            <div className="about-stat-item">
              <div className="about-stat-number">KDP</div>
              <div className="about-stat-label">Amazon Platform</div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          BIO SECTION
      ══════════════════════════════════════ */}
      <section className="about-bio-section">
        <div className="container">
          <div className="about-bio-grid">

            {/* Left — Bio Text */}
            <div style={{ minWidth: 0, maxWidth: '100%', overflow: 'hidden', boxSizing: 'border-box' }}>
              <div className="about-section-label">Biography</div>
              <h2 className="about-bio-heading">
                {page?.title || 'Voyaging through the cosmic infinite.'}
              </h2>

              {page?.content ? (
                <div
                  className="about-db-content"
                  style={{
                    width: '100%',
                    maxWidth: '100%',
                    boxSizing: 'border-box',
                    overflow: 'hidden',
                    overflowWrap: 'break-word',
                    wordBreak: 'normal',
                    minWidth: 0
                  }}
                  dangerouslySetInnerHTML={{ __html: page.content }}
                />
              ) : (
                <div className="about-bio-text">
                  <p>
                    PKR is a visionary storyteller dedicated to exploring the boundaries of science
                    fiction and speculative mystery. With a focus on cosmic mysteries and the
                    philosophy of existence, PKR weaves intricate narratives that challenge the
                    mind while touching the soul.
                  </p>
                  <p>
                    From the bioluminescent jungles of far-flung galaxies to the intimate corridors
                    of memory, PKR's work is characterized by cinematic detail, emotional resonance,
                    and intellectual depth.
                  </p>
                  <p>
                    A Civil Engineer by training, PKR brings a unique analytical lens to
                    storytelling — constructing worlds with the same rigor applied to bridges
                    and buildings, but built from the substance of imagination.
                  </p>
                </div>
              )}
            </div>

            {/* Right — Highlight Cards */}
            <div className="about-highlights">
              <div className="about-highlight-card">
                <div className="about-highlight-icon">🔭</div>
                <div className="about-highlight-title">Science at the Core</div>
                <div className="about-highlight-text">
                  Every narrative is grounded in real astrophysics, quantum theory, and
                  neuroscience — fiction that teaches without preaching.
                </div>
              </div>

              <div className="about-highlight-card">
                <div className="about-highlight-icon">🧠</div>
                <div className="about-highlight-title">Philosophy of Consciousness</div>
                <div className="about-highlight-text">
                  What is awareness? What persists beyond a lifetime? PKR's novels are
                  extended meditations on these unanswerable — and therefore irresistible — questions.
                </div>
              </div>

              <div className="about-highlight-card">
                <div className="about-highlight-icon">🌍</div>
                <div className="about-highlight-title">Human Above All</div>
                <div className="about-highlight-text">
                  No matter how cosmic the canvas, PKR keeps love, loss, and longing at
                  the centre of every story. The universe is the backdrop; the human heart is the stage.
                </div>
              </div>

              <div className="about-highlight-card" style={{ borderLeft: '3px solid rgba(255,255,255,0.08)', background: 'rgba(197,160,89,0.03)' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', color: 'var(--primary)', textTransform: 'uppercase', marginBottom: '1rem' }}>
                  Available Now
                </div>
                <div className="about-highlight-title" style={{ marginBottom: '1.2rem' }}>
                  Three Novels on Amazon KDP
                </div>
                <a
                  href="https://www.amazon.com/author/pk_r"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ fontSize: '0.68rem', padding: '0.85rem 1.6rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  VISIT AUTHOR PAGE
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          THE NOVELS SECTION  (moved after bio)
      ══════════════════════════════════════ */}
      <section className="about-novels-section">
        <div className="container">
          <div className="about-novels-header">
            <div className="about-section-label" style={{ justifyContent: 'center' }}>The Collection</div>
            <h2 className="about-novels-title">
              Three Novels. <span className="about-hero-title-accent">One Infinite Journey.</span>
            </h2>
            <p className="about-novels-subtitle">
              Each book stands alone — yet together they form a tapestry of consciousness,
              cosmos, and the irreducible mystery of being human. Available now on Amazon KDP.
            </p>
          </div>

          {books.length > 0 ? (
            <div className="about-novels-grid">
              {books.map((book) => (
                <BookCard key={book.asin} book={book} />
              ))}
            </div>
          ) : (
            <div className="about-novels-empty">
              <span style={{ fontSize: '3rem', opacity: 0.12 }}>📚</span>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '1.5rem', letterSpacing: '0.05em' }}>
                Visit the full collection on Amazon KDP
              </p>
              <a
                href="https://www.amazon.com/author/pk_r"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                style={{ marginTop: '2rem', fontSize: '0.75rem' }}
              >
                VIEW ON AMAZON
              </a>
            </div>
          )}
        </div>
      </section>


      {/* ══════════════════════════════════════
          PULLQUOTE SECTION
      ══════════════════════════════════════ */}
      <section className="about-quote-section">
        <div className="container">
          <div className="about-blockquote">
            <p className="about-quote-text">
              "Stories are the universe's way of understanding itself through us.
              Every novel is a small act of cosmic self-awareness."
            </p>
            <div className="about-quote-author">— PKR</div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          JOURNEY / TIMELINE SECTION
      ══════════════════════════════════════ */}
      <section className="about-journey-section">
        <div className="container">
          <div className="about-journey-heading">
            <div className="about-section-label" style={{ justifyContent: 'center' }}>The Journey</div>
            <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 800, lineHeight: 1.1, marginTop: '0.5rem' }}>
              From Engineer to Storyteller
            </h2>
          </div>

          <div className="about-timeline">
            {timelineItems.map((item, i) => (
              <div key={i} className="about-timeline-item">
                <div className="about-timeline-node">{item.icon}</div>
                <div className="about-timeline-body">
                  <div className="about-timeline-year">{item.year}</div>
                  <div className="about-timeline-title">{item.title}</div>
                  <div className="about-timeline-desc">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          MISSION SECTION
      ══════════════════════════════════════ */}
      <section className="about-mission-section">
        <div className="container">
          <div className="about-mission-inner">
            <div>
              <div className="about-section-label">The Mission</div>
              <h2 className="about-mission-heading">
                Igniting Curiosity.<br />
                <span style={{ color: 'var(--primary)', fontStyle: 'italic' }}>One Story at a Time.</span>
              </h2>
              <p className="about-mission-text">
                The goal of PKR Writes is to ignite curiosity and wonder — connecting ideas,
                imagination, and impact through the power of professional storytelling.
              </p>
              <p className="about-mission-text">
                Each book is crafted as both a thought experiment and an emotional journey,
                inviting readers to question their assumptions about consciousness, time,
                and the nature of reality.
              </p>
            </div>

            <div className="about-mission-visual">
              {missionTiles.map((tile, i) => (
                <div key={i} className="about-mission-tile">
                  <div className="about-mission-tile-icon">{tile.icon}</div>
                  <div className="about-mission-tile-title">{tile.title}</div>
                  <div className="about-mission-tile-text">{tile.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CTA SECTION
      ══════════════════════════════════════ */}
      <section className="about-cta-section">
        <div className="container">
          <h2 className="about-cta-title">
            Begin Your Journey<br />
            <span style={{ color: 'var(--primary)', fontStyle: 'italic' }}>Into the Infinite</span>
          </h2>
          <p className="about-cta-subtitle">
            Three novels await. Each one a doorway into a universe where science and soul collide,
            where every question leads to a deeper mystery.
          </p>
          <div className="about-cta-actions">
            <Link
              href="/books"
              className="btn btn-primary"
              style={{ boxShadow: '0 20px 40px -10px var(--primary-glow)', fontSize: '0.8rem' }}
            >
              EXPLORE THE COLLECTION
            </Link>
            <Link href="/contact" className="btn btn-outline" style={{ fontSize: '0.8rem' }}>
              GET IN TOUCH
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}