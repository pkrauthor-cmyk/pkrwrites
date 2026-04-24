'use client';

export default function AboutStyles() {
  return (
    <style jsx global>{`
      /* ============================================
         ABOUT PAGE — PREMIUM REDESIGN
      ============================================ */

      /* ---- Novels Section ---- */
      .about-novels-section {
        background: var(--bg-darker);
        padding: 8rem 0;
        position: relative;
        overflow: hidden;
      }

      .about-novels-section::before {
        content: '';
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 800px;
        height: 1px;
        background: linear-gradient(to right, transparent, rgba(197,160,89,0.2), transparent);
      }

      .about-novels-header {
        text-align: center;
        margin-bottom: 5rem;
      }

      .about-novels-title {
        font-size: clamp(2rem, 5vw, 3.5rem);
        font-weight: 800;
        font-family: var(--font-playfair);
        line-height: 1.1;
        margin-top: 0.5rem;
        margin-bottom: 1.5rem;
      }

      .about-novels-subtitle {
        font-size: 1.05rem;
        color: var(--text-muted);
        line-height: 1.8;
        max-width: 620px;
        margin: 0 auto;
      }

      .about-novels-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 3rem;
      }

      /* Hover lift on book covers */
      .about-novels-grid .book-image:hover {
        transform: scale(1.05);
      }

      .about-novels-empty {
        text-align: center;
        padding: 5rem 2rem;
        border: 1px dashed var(--glass-border);
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      @media (max-width: 768px) {
        .about-novels-grid {
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)) !important;
          gap: 2rem !important;
        }
      }

      @media (max-width: 520px) {
        .about-novels-grid {
          grid-template-columns: 1fr !important;
          max-width: 340px;
          margin: 0 auto;
        }
      }

      /* ---- Hero Section ---- */

      .about-hero {
        position: relative;
        min-height: 100vh;
        display: flex;
        align-items: flex-end;
        padding-bottom: clamp(5rem, 10vh, 9rem);
        overflow: hidden;
        background: var(--bg-dark);
      }

      .about-hero-bg {
        position: absolute;
        inset: 0;
        z-index: 0;
      }

      .about-hero-orb-1 {
        position: absolute;
        top: -15%;
        right: -10%;
        width: clamp(400px, 60vw, 900px);
        height: clamp(400px, 60vw, 900px);
        border-radius: 50%;
        background: radial-gradient(circle, rgba(197,160,89,0.07) 0%, transparent 65%);
        filter: blur(80px);
        animation: heroOrbFloat 14s ease-in-out infinite alternate;
      }

      .about-hero-orb-2 {
        position: absolute;
        bottom: -10%;
        left: -8%;
        width: clamp(300px, 40vw, 600px);
        height: clamp(300px, 40vw, 600px);
        border-radius: 50%;
        background: radial-gradient(circle, rgba(142,111,62,0.05) 0%, transparent 70%);
        filter: blur(100px);
        animation: heroOrbFloat 18s ease-in-out infinite alternate-reverse;
      }

      @keyframes heroOrbFloat {
        from { transform: translate(0, 0) scale(1); }
        to   { transform: translate(30px, -25px) scale(1.04); }
      }

      .about-hero-grid {
        display: grid;
        grid-template-columns: 1fr minmax(0, 480px);
        gap: 5rem;
        align-items: end;
        position: relative;
        z-index: 1;
        width: 100%;
        max-width: 100%;
        box-sizing: border-box;
      }

      .about-hero-eyebrow {
        display: inline-flex;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 2.5rem;
        padding: 0.5rem 1.2rem;
        background: rgba(197,160,89,0.06);
        border: 1px solid rgba(197,160,89,0.15);
        border-radius: 100px;
      }

      .about-hero-dot {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: var(--primary);
        box-shadow: 0 0 10px var(--primary);
        animation: blink 2.5s ease-in-out infinite;
      }

      @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.3; }
      }

      .about-hero-eyebrow-text {
        font-size: 0.68rem;
        font-weight: 700;
        letter-spacing: 0.25em;
        color: var(--primary);
        text-transform: uppercase;
      }

      .about-hero-title {
        font-size: clamp(3rem, 7vw, 5.8rem);
        font-weight: 800;
        line-height: 1.0;
        margin-bottom: 2.5rem;
        letter-spacing: -0.03em;
        font-family: var(--font-playfair);
      }

      .about-hero-title-accent {
        background: linear-gradient(135deg, var(--primary), var(--primary-light));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        font-style: italic;
      }

      .about-hero-subtitle {
        font-size: clamp(1rem, 1.5vw, 1.2rem);
        color: var(--text-muted);
        line-height: 1.9;
        max-width: 520px;
        margin-bottom: 4rem;
      }

      .about-hero-actions {
        display: flex;
        gap: 1.5rem;
        flex-wrap: wrap;
      }

      /* Portrait */
      .about-portrait-wrap {
        position: relative;
        align-self: end;
      }

      .about-portrait-frame {
        position: relative;
        border-radius: 3px;
        overflow: hidden;
        border: 1px solid var(--glass-border);
        box-shadow: 0 60px 120px -30px rgba(0,0,0,0.8), 0 0 0 1px rgba(197,160,89,0.06);
        aspect-ratio: 4/5;
      }

      .about-portrait-frame img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        transition: transform 1.2s cubic-bezier(0.165,0.84,0.44,1);
      }

      .about-portrait-frame:hover img {
        transform: scale(1.04);
      }

      .about-portrait-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%);
        pointer-events: none;
      }

      .about-portrait-caption {
        position: absolute;
        bottom: 2rem;
        left: 0;
        right: 0;
        text-align: center;
        font-size: 0.6rem;
        font-weight: 800;
        letter-spacing: 0.35em;
        color: var(--primary);
        text-transform: uppercase;
        opacity: 0.85;
      }

      /* Corner decorations */
      .about-corner {
        position: absolute;
        width: 28px;
        height: 28px;
        border-color: var(--primary);
        border-style: solid;
        opacity: 0.35;
      }

      .about-corner-tl { top: -8px; left: -8px; border-width: 2px 0 0 2px; }
      .about-corner-tr { top: -8px; right: -8px; border-width: 2px 2px 0 0; }
      .about-corner-bl { bottom: -8px; left: -8px; border-width: 0 0 2px 2px; }
      .about-corner-br { bottom: -8px; right: -8px; border-width: 0 2px 2px 0; }

      /* ---- Stats Bar ---- */
      .about-stats-bar {
        background: rgba(255,255,255,0.015);
        border-top: 1px solid var(--glass-border);
        border-bottom: 1px solid var(--glass-border);
        padding: 3.5rem 0;
      }

      .about-stats-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 0;
      }

      .about-stat-item {
        text-align: center;
        padding: 1.5rem 2rem;
        border-right: 1px solid var(--glass-border);
        transition: background 0.3s ease;
      }

      .about-stat-item:last-child { border-right: none; }

      .about-stat-item:hover {
        background: rgba(197,160,89,0.03);
      }

      .about-stat-number {
        font-size: clamp(2.2rem, 4vw, 3.2rem);
        font-weight: 800;
        font-family: var(--font-playfair);
        background: linear-gradient(135deg, var(--primary), var(--primary-light));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        line-height: 1;
        margin-bottom: 0.6rem;
      }

      .about-stat-label {
        font-size: 0.68rem;
        font-weight: 700;
        letter-spacing: 0.2em;
        color: var(--text-muted);
        text-transform: uppercase;
      }

      /* ---- Bio Section ---- */
      .about-bio-section {
        background: var(--bg-dark);
        position: relative;
        overflow: hidden;
      }

      .about-bio-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8rem;
        align-items: start;
      }

      .about-section-label {
        font-size: 0.68rem;
        font-weight: 700;
        letter-spacing: 0.3em;
        color: var(--primary);
        text-transform: uppercase;
        margin-bottom: 1.5rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        flex-wrap: wrap;
        overflow: hidden;
        max-width: 100%;
      }

      .about-section-label::before {
        content: '';
        display: block;
        flex-shrink: 0;
        width: 30px;
        height: 1px;
        background: var(--primary);
        opacity: 0.5;
      }

      .about-bio-heading {
        font-size: clamp(2rem, 4vw, 3.2rem);
        font-weight: 800;
        line-height: 1.1;
        margin-bottom: 3rem;
        font-family: var(--font-playfair);
      }

      .about-bio-text {
        font-size: 1.05rem;
        line-height: 1.95;
        color: rgba(255,255,255,0.75);
      }

      .about-bio-text p {
        margin-bottom: 1.8rem;
      }

      .about-bio-text p:last-child {
        margin-bottom: 0;
      }

      /* DB-rendered content passthrough */
      .about-db-content {
        font-size: 1.05rem;
        line-height: 1.95;
        color: rgba(255,255,255,0.75);
      }

      .about-db-content p { margin-bottom: 1.8rem; }

      .about-db-content h2,
      .about-db-content h3 {
        color: white;
        font-family: var(--font-playfair);
        margin: 2.5rem 0 1rem;
      }

      /* Right column — highlights */
      .about-highlights {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        position: sticky;
        top: 120px;
        min-width: 0;
        max-width: 100%;
        box-sizing: border-box;
      }

      .about-highlight-card {
        padding: 1.8rem 2rem;
        background: rgba(255,255,255,0.018);
        border: 1px solid var(--glass-border);
        border-radius: 3px;
        border-left: 3px solid var(--primary);
        transition: background 0.35s ease, transform 0.35s ease;
        min-width: 0;
        max-width: 100%;
        box-sizing: border-box;
        overflow: hidden;
      }

      .about-highlight-card:hover {
        background: rgba(197,160,89,0.04);
        transform: translateX(4px);
      }

      .about-highlight-icon {
        font-size: 1.6rem;
        margin-bottom: 1rem;
        opacity: 0.8;
      }

      .about-highlight-title {
        font-size: 0.95rem;
        font-weight: 700;
        color: white;
        margin-bottom: 0.6rem;
        letter-spacing: 0.02em;
        overflow-wrap: break-word;
        word-break: normal;
      }

      .about-highlight-text {
        font-size: 0.88rem;
        color: var(--text-muted);
        line-height: 1.7;
        overflow-wrap: break-word;
        word-break: normal;
      }

      /* ---- Quote Divider ---- */
      .about-quote-section {
        background: rgba(197,160,89,0.03);
        border-top: 1px solid rgba(197,160,89,0.1);
        border-bottom: 1px solid rgba(197,160,89,0.1);
        padding: 7rem 0;
      }

      .about-blockquote {
        max-width: 800px;
        margin: 0 auto;
        text-align: center;
        position: relative;
      }

      .about-blockquote::before {
        content: '"';
        font-family: var(--font-playfair);
        font-size: 12rem;
        color: var(--primary);
        opacity: 0.07;
        position: absolute;
        top: -4rem;
        left: -2rem;
        line-height: 1;
        pointer-events: none;
      }

      .about-quote-text {
        font-family: var(--font-playfair);
        font-size: clamp(1.4rem, 3vw, 2.2rem);
        font-style: italic;
        color: rgba(255,255,255,0.9);
        line-height: 1.5;
        margin-bottom: 2.5rem;
        position: relative;
        z-index: 1;
      }

      .about-quote-author {
        font-size: 0.7rem;
        font-weight: 700;
        letter-spacing: 0.3em;
        color: var(--primary);
        text-transform: uppercase;
      }

      /* ---- Journey / Timeline Section ---- */
      .about-journey-section {
        background: var(--bg-darker);
      }

      .about-journey-heading {
        text-align: center;
        margin-bottom: 6rem;
      }

      .about-timeline {
        display: flex;
        flex-direction: column;
        gap: 0;
        position: relative;
        max-width: 760px;
        margin: 0 auto;
      }

      .about-timeline::before {
        content: '';
        position: absolute;
        left: 28px;
        top: 8px;
        bottom: 8px;
        width: 1px;
        background: linear-gradient(to bottom, transparent, rgba(197,160,89,0.3) 10%, rgba(197,160,89,0.3) 90%, transparent);
      }

      .about-timeline-item {
        display: flex;
        gap: 2.5rem;
        padding-bottom: 3.5rem;
        position: relative;
      }

      .about-timeline-item:last-child {
        padding-bottom: 0;
      }

      .about-timeline-node {
        flex-shrink: 0;
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: rgba(197,160,89,0.07);
        border: 1px solid rgba(197,160,89,0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.3rem;
        position: relative;
        z-index: 1;
        transition: background 0.3s ease, border-color 0.3s ease;
      }

      .about-timeline-item:hover .about-timeline-node {
        background: rgba(197,160,89,0.15);
        border-color: rgba(197,160,89,0.5);
      }

      .about-timeline-body {
        padding-top: 0.8rem;
        flex: 1;
      }

      .about-timeline-year {
        font-size: 0.65rem;
        font-weight: 700;
        letter-spacing: 0.3em;
        color: var(--primary);
        text-transform: uppercase;
        margin-bottom: 0.5rem;
      }

      .about-timeline-title {
        font-size: 1.15rem;
        font-weight: 700;
        color: white;
        margin-bottom: 0.6rem;
        font-family: var(--font-playfair);
      }

      .about-timeline-desc {
        font-size: 0.92rem;
        color: var(--text-muted);
        line-height: 1.75;
      }

      /* ---- Mission Section ---- */
      .about-mission-section {
        background: var(--bg-dark);
        position: relative;
        overflow: hidden;
      }

      .about-mission-inner {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 5rem;
        align-items: center;
        width: 100%;
        max-width: 100%;
        box-sizing: border-box;
      }

      .about-mission-heading {
        font-size: clamp(1.8rem, 4vw, 3.2rem);
        font-weight: 800;
        line-height: 1.15;
        margin-bottom: 2rem;
        font-family: var(--font-playfair);
        overflow-wrap: break-word;
        word-break: normal;
      }

      .about-mission-text {
        font-size: 1.05rem;
        line-height: 1.9;
        color: rgba(255,255,255,0.75);
        margin-bottom: 1.8rem;
        overflow-wrap: break-word;
        word-break: normal;
      }

      .about-mission-text:last-of-type { margin-bottom: 0; }

      .about-mission-visual {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.5rem;
        min-width: 0;
      }

      .about-mission-tile {
        padding: 2.2rem 1.8rem;
        background: rgba(255,255,255,0.018);
        border: 1px solid var(--glass-border);
        border-radius: 3px;
        text-align: center;
        transition: all 0.4s ease;
      }

      .about-mission-tile:hover {
        background: rgba(197,160,89,0.05);
        border-color: rgba(197,160,89,0.25);
        transform: translateY(-6px);
      }

      .about-mission-tile-icon {
        font-size: 2rem;
        margin-bottom: 1rem;
      }

      .about-mission-tile-title {
        font-size: 0.85rem;
        font-weight: 700;
        color: white;
        letter-spacing: 0.05em;
        margin-bottom: 0.5rem;
      }

      .about-mission-tile-text {
        font-size: 0.8rem;
        color: var(--text-muted);
        line-height: 1.6;
      }

      /* ---- CTA Section ---- */
      .about-cta-section {
        background: var(--bg-darker);
        padding: 9rem 0;
        text-align: center;
        position: relative;
        overflow: hidden;
      }

      .about-cta-section::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 700px;
        height: 700px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(197,160,89,0.05) 0%, transparent 65%);
        filter: blur(60px);
        pointer-events: none;
      }

      .about-cta-title {
        font-size: clamp(2.2rem, 5vw, 4rem);
        font-weight: 800;
        font-family: var(--font-playfair);
        margin-bottom: 1.8rem;
        position: relative;
        z-index: 1;
      }

      .about-cta-subtitle {
        font-size: 1.1rem;
        color: var(--text-muted);
        margin-bottom: 4rem;
        max-width: 560px;
        margin-left: auto;
        margin-right: auto;
        line-height: 1.8;
        position: relative;
        z-index: 1;
      }

      .about-cta-actions {
        display: flex;
        gap: 1.5rem;
        justify-content: center;
        flex-wrap: wrap;
        position: relative;
        z-index: 1;
      }

      /* ============================================
         RESPONSIVE — ≤ 1024px
      ============================================ */
      @media (max-width: 1024px) {
        .about-hero-grid {
          grid-template-columns: 1fr minmax(0, 380px) !important;
          gap: 3.5rem !important;
        }
      }

      /* ============================================
         RESPONSIVE — ≤ 900px (Tablet / Mobile)
      ============================================ */
      @media (max-width: 900px) {
        /* Hero */
        .about-hero-grid {
          grid-template-columns: 1fr !important;
          gap: 3rem !important;
          width: 100% !important;
          max-width: 100% !important;
          overflow: hidden !important;
        }

        .about-portrait-wrap {
          max-width: 280px;
          width: 100%;
          margin: 0 auto;
          order: -1;
        }

        .about-hero-title {
          font-size: clamp(2rem, 9vw, 3.2rem) !important;
          word-break: normal !important;
          overflow-wrap: break-word !important;
        }

        .about-hero-subtitle {
          font-size: 0.95rem !important;
          max-width: 100% !important;
        }

        /* Stats */
        .about-stats-grid {
          grid-template-columns: 1fr 1fr !important;
        }

        .about-stat-item:nth-child(2) { border-right: none; }
        .about-stat-item:nth-child(3) {
          border-top: 1px solid var(--glass-border);
          border-right: 1px solid var(--glass-border);
        }
        .about-stat-item:nth-child(4) {
          border-top: 1px solid var(--glass-border);
        }

        .about-stat-label {
          font-size: 0.6rem !important;
          letter-spacing: 0.12em !important;
        }

        /* Bio Grid */
        .about-bio-grid {
          grid-template-columns: 1fr !important;
          gap: 3rem !important;
          width: 100% !important;
          max-width: 100% !important;
          box-sizing: border-box !important;
        }

        .about-highlights {
          position: static;
          top: auto;
          width: 100% !important;
          max-width: 100% !important;
          min-width: 0 !important;
          box-sizing: border-box !important;
        }

        .about-highlight-card {
          box-sizing: border-box !important;
          max-width: 100% !important;
          overflow: hidden !important;
          transform: none !important;
        }

        .about-highlight-card:hover {
          transform: none !important;
        }

        .about-highlight-text {
          overflow-wrap: break-word !important;
          word-break: normal !important;
          white-space: normal !important;
        }

        /* Mission */
        .about-mission-inner {
          grid-template-columns: 1fr !important;
          gap: 3rem !important;
          width: 100% !important;
          max-width: 100% !important;
          box-sizing: border-box !important;
        }

        .about-mission-heading {
          font-size: clamp(1.6rem, 7vw, 2.5rem) !important;
          overflow-wrap: break-word !important;
        }

        .about-mission-text {
          font-size: 1rem !important;
          overflow-wrap: break-word !important;
        }

        .about-mission-visual {
          grid-template-columns: 1fr 1fr !important;
          min-width: 0 !important;
        }

        .about-mission-tile {
          padding: 1.5rem 1.2rem !important;
          min-width: 0 !important;
          box-sizing: border-box !important;
        }

        .about-mission-tile-text {
          overflow-wrap: break-word !important;
          word-break: normal !important;
          font-size: 0.75rem !important;
        }

        /* Timeline */
        .about-timeline {
          width: 100% !important;
          max-width: 100% !important;
          box-sizing: border-box !important;
        }

        .about-timeline::before {
          left: 22px;
        }

        .about-timeline-node {
          width: 44px;
          height: 44px;
          font-size: 1rem;
        }

        .about-timeline-body {
          min-width: 0;
          overflow-wrap: break-word;
          word-break: normal;
        }

        .about-timeline-desc {
          overflow-wrap: break-word !important;
          word-break: normal !important;
        }

        /* Quote */
        .about-blockquote::before {
          font-size: 6rem;
          top: -1.5rem;
          left: 0;
          opacity: 0.05;
        }

        .about-quote-text {
          font-size: clamp(1.2rem, 5vw, 1.8rem) !important;
        }

        /* Novels grid */
        .about-novels-grid {
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)) !important;
          gap: 2rem !important;
        }

        /* DB content */
        .about-grid {
          display: flex !important;
          flex-direction: column !important;
          gap: 2rem !important;
          width: 100% !important;
          max-width: 100% !important;
        }

        .portrait-container {
          max-width: 260px !important;
          width: 100% !important;
          margin: 0 auto !important;
        }

        .bio-content-area {
          width: 100% !important;
          max-width: 100% !important;
          min-width: 0 !important;
          box-sizing: border-box !important;
          overflow: hidden !important;
        }

        .db-rendered-content {
          width: 100% !important;
          max-width: 100% !important;
          font-size: 1rem !important;
          line-height: 1.85 !important;
          overflow-wrap: break-word !important;
          word-break: normal !important;
          hyphens: none !important;
          box-sizing: border-box !important;
        }

        .db-rendered-content * {
          max-width: 100% !important;
          white-space: normal !important;
          overflow-wrap: break-word !important;
          word-break: normal !important;
          hyphens: none !important;
          box-sizing: border-box !important;
        }

        .about-db-content {
          font-size: 1rem !important;
          overflow-wrap: break-word !important;
          word-break: normal !important;
          max-width: 100% !important;
          box-sizing: border-box !important;
        }

        .about-db-content * {
          max-width: 100% !important;
          overflow-wrap: break-word !important;
          white-space: normal !important;
          box-sizing: border-box !important;
        }

        /* Section labels — hide line on very small screens */
        .about-section-label::before {
          display: none;
        }
      }

      /* ============================================
         RESPONSIVE — ≤ 480px (Small Mobile)
      ============================================ */
      @media (max-width: 480px) {
        .about-novels-grid {
          grid-template-columns: 1fr !important;
          max-width: 340px;
          margin: 0 auto;
        }

        .about-mission-visual {
          grid-template-columns: 1fr !important;
        }

        .about-hero-actions {
          flex-direction: column !important;
          gap: 1rem !important;
        }

        .about-cta-actions {
          flex-direction: column !important;
          align-items: center !important;
        }

        .about-stats-grid {
          grid-template-columns: 1fr 1fr !important;
        }

        .about-stat-item {
          padding: 1.2rem 0.8rem !important;
        }

        .about-quote-section {
          padding: 4rem 0 !important;
        }

        .about-novels-section {
          padding: 5rem 0 !important;
        }

        .about-hero-title {
          font-size: clamp(1.9rem, 10vw, 2.8rem) !important;
        }
      }

    `}</style>
  );
}
