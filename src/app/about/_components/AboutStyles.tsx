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
      
      .section-title-mobile {
        text-align: left;
        margin-bottom: clamp(2.5rem, 8vw, 4.5rem);
      }
      .underline-mobile {
        height: 2px;
        background: var(--primary);
        width: 80px;
        margin-top: 1.5rem;
      }
      
      @media (max-width: 1024px) {
        .about-grid {
          grid-template-columns: 1fr !important;
          gap: 3rem !important;
          display: flex !important;
          flex-direction: column !important;
        }
        .portrait-container {
          max-width: 280px;
          margin: 0 auto 2rem;
          order: 1;
        }
        .bio-content-area {
          text-align: center;
          order: 2;
        }
        .section-title-mobile {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center !important;
        }
        .underline-mobile {
          margin: 1.5rem auto 0;
        }
        .mission-highlight {
          border-left: none;
          border-top: 1px solid rgba(212, 175, 55, 0.2);
          padding-left: 0;
          padding-top: 3rem;
          text-align: center;
          margin-top: 3rem;
        }
        .about-grid {
          display: flex !important;
          flex-direction: column !important;
          width: 100% !important;
          max-width: 100% !important;
          min-width: 0 !important;
          overflow: hidden !important;
          gap: 3rem !important;
        }
        .portrait-container {
          max-width: 280px !important;
          width: 100% !important;
          margin: 0 auto 2rem !important;
        }
        .bio-content-area {
          text-align: center !important;
          width: 100% !important;
          max-width: 100% !important;
          min-width: 0 !important;
        }
        .db-rendered-content, .db-rendered-content * {
          max-width: 100% !important;
          width: 100% !important;
          min-width: 0 !important;
          overflow-wrap: break-word !important;
          word-wrap: break-word !important;
          word-break: keep-all !important;
          white-space: normal !important;
          box-sizing: border-box !important;
          hyphens: none !important;
          font-size: 1rem !important;
          line-height: 1.8 !important;
          letter-spacing: normal !important;
          display: block !important;
        }
        .about-main-title {
          font-size: clamp(1.8rem, 8vw, 2.2rem);
          margin-bottom: 1.5rem;
          word-break: keep-all;
          overflow-wrap: break-word;
          max-width: 100% !important;
          width: 100% !important;
        }
      }
    `}</style>
  );
}
