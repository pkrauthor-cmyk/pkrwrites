'use client';

export default function AboutStyles() {
  return (
    <style jsx global>{`
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
      
      .biography-label {
        text-transform: uppercase;
        letter-spacing: 0.3em;
        color: var(--primary);
        margin-bottom: 1rem;
        font-size: 0.75rem;
        font-weight: 700;
      }
      .about-main-title {
        font-size: clamp(2.2rem, 6vw, 4.5rem);
        margin-bottom: 2rem;
        fontWeight: 800;
        line-height: 1.1;
      }
      .fallback-bio-content p {
        margin-bottom: 2rem;
      }
      .mission-title {
        color: white;
        margin-top: 4rem;
        margin-bottom: 1.5rem;
        font-size: clamp(1.8rem, 4vw, 2.2rem);
        font-weight: 700;
        font-family: var(--font-playfair);
      }
      .mission-text {
        font-size: 1.2rem;
        line-height: 1.8;
        color: rgba(255,255,255,0.9);
        font-style: italic;
      }
      
      .db-rendered-content {
        color: rgba(255, 255, 255, 0.85);
        font-size: 1.15rem;
        line-height: 2;
      }
      .db-rendered-content p {
        margin-bottom: 2rem;
      }
      .db-rendered-content h2, .db-rendered-content h3 {
        color: white;
        margin-top: 3rem;
        margin-bottom: 1.5rem;
        font-family: var(--font-playfair);
      }
      
      @media (max-width: 1024px) {
        .about-grid {
          grid-template-columns: 1fr;
          gap: 4rem;
        }
        .portrait-container {
          max-width: 320px;
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
        .db-rendered-content {
          text-align: center;
        }
        .about-main-title {
          font-size: clamp(2rem, 8vw, 2.8rem);
        }
      }
    `}</style>
  );
}
