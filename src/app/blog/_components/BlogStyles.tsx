'use client';

export default function BlogStyles() {
  return (
    <style jsx global>{`
      .editorial-content h2 {
        font-size: 2.2rem;
        font-family: var(--font-playfair);
        color: white;
        margin: 4rem 0 2rem;
        border-left: 4px solid var(--primary);
        padding-left: 2rem;
      }
      .editorial-content h3 {
        font-size: 1.8rem;
        font-family: var(--font-playfair);
        color: white;
        margin: 3rem 0 1.5rem;
      }
      .editorial-content p {
        margin-bottom: 2rem;
      }
      .editorial-content b, .editorial-content strong {
        color: var(--primary);
        font-weight: 700;
      }
      .editorial-content blockquote {
        font-family: var(--font-playfair);
        font-size: 1.8rem;
        line-height: 1.5;
        color: white;
        border: none;
        padding: 4rem;
        margin: 5rem 0;
        text-align: center;
        background: rgba(255,255,255,0.02);
        position: relative;
      }
      .editorial-content blockquote::before {
        content: '“';
        position: absolute;
        top: 1rem;
        left: 50%;
        transform: translateX(-50%);
        font-size: 8rem;
        opacity: 0.1;
        color: var(--primary);
      }
      .editorial-content ul, .editorial-content ol {
        margin: 2rem 0 3rem 2rem;
      }
      .editorial-content li {
        margin-bottom: 1rem;
        color: rgba(255,255,255,0.7);
      }
    `}</style>
  );
}
