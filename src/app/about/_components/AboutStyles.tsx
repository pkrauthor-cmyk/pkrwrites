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
  );
}
