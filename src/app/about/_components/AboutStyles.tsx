'use client';

export default function AboutStyles() {
  return (
    <style jsx global>{`
      /* ===========================
         DESKTOP LAYOUT
      =========================== */
      .about-grid {
        display: grid;
        grid-template-columns: 380px 1fr;
        gap: 6rem;
        align-items: start;
      }

      .editorial-bio-text {
        font-size: 1.1rem;
        line-height: 2;
        color: var(--text-muted);
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
        font-size: clamp(2.2rem, 6vw, 4rem);
        margin-bottom: 2rem;
        font-weight: 800;
        line-height: 1.1;
      }

      .fallback-bio-content p {
        margin-bottom: 1.75rem;
      }

      .mission-highlight {
        border-left: 3px solid var(--primary);
        padding-left: 2.5rem;
        margin-top: 4rem;
      }

      .mission-title {
        color: white;
        margin-top: 0;
        margin-bottom: 1rem;
        font-size: clamp(1.5rem, 3vw, 2rem);
        font-weight: 700;
        font-family: var(--font-playfair);
      }

      .mission-text {
        font-size: 1.1rem;
        line-height: 1.8;
        color: rgba(255,255,255,0.85);
        font-style: italic;
      }

      .db-rendered-content {
        color: rgba(255, 255, 255, 0.85);
        font-size: 1.1rem;
        line-height: 1.9;
      }
      .db-rendered-content p {
        margin-bottom: 1.75rem;
      }
      .db-rendered-content h2,
      .db-rendered-content h3 {
        color: white;
        margin-top: 2.5rem;
        margin-bottom: 1rem;
        font-family: var(--font-playfair);
      }

      .section-title-mobile {
        text-align: left;
        margin-bottom: 3rem;
      }

      .underline-mobile {
        height: 2px;
        background: var(--primary);
        width: 80px;
        margin-top: 1.5rem;
      }

      /* ===========================
         MOBILE LAYOUT (≤ 900px)
      =========================== */
      @media (max-width: 900px) {

        /* Single-column stacked layout */
        .about-grid {
          display: flex !important;
          flex-direction: column !important;
          gap: 3rem !important;
          width: 100% !important;
          max-width: 100% !important;
        }

        .portrait-container {
          max-width: 280px !important;
          width: 100% !important;
          margin: 0 auto !important;
        }

        /* Bio area must be full width */
        .bio-content-area {
          width: 100% !important;
          max-width: 100% !important;
          min-width: 0 !important;
          box-sizing: border-box !important;
        }

        .section-title-mobile {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center !important;
          margin-bottom: 2rem;
        }

        .underline-mobile {
          margin: 1rem auto 0;
        }

        .about-main-title {
          font-size: clamp(1.6rem, 7vw, 2.2rem) !important;
        }

        /* 
          KEY FIX: Only target block-level elements.
          Do NOT apply display:block or width:100% to inline
          elements like <em>, <strong>, <span> — that causes
          each word to jump to its own line.
        */
        .db-rendered-content {
          width: 100% !important;
          max-width: 100% !important;
          box-sizing: border-box !important;
          overflow-wrap: break-word !important;
          word-break: normal !important;
          hyphens: none !important;
          font-size: 0.95rem !important;
          line-height: 1.85 !important;
        }

        .db-rendered-content p,
        .db-rendered-content h1,
        .db-rendered-content h2,
        .db-rendered-content h3,
        .db-rendered-content h4,
        .db-rendered-content ul,
        .db-rendered-content ol,
        .db-rendered-content li,
        .db-rendered-content blockquote,
        .db-rendered-content div,
        .db-rendered-content section {
          max-width: 100% !important;
          width: 100% !important;
          box-sizing: border-box !important;
          overflow-wrap: break-word !important;
          word-break: normal !important;
          hyphens: none !important;
          white-space: normal !important;
        }

        .mission-highlight {
          border-left: none !important;
          border-top: 1px solid rgba(197, 160, 89, 0.25);
          padding-left: 0 !important;
          padding-top: 2rem;
          margin-top: 2.5rem;
          text-align: center !important;
        }

        .mission-text {
          text-align: center !important;
        }
      }
    `}</style>
  );
}
