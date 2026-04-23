'use client';

import React, { useState } from 'react';

interface BookCalloutProps {
  book: {
    title: string;
    asin?: string;
    coverUrl?: string;
    description?: string;
    amznLink?: string;
  };
}

export default function BookCallout({ book }: BookCalloutProps) {
  const [imgError, setImgError] = useState(false);
  const imgSrc = book.coverUrl && book.coverUrl !== '' 
      ? book.coverUrl 
      : `https://m.media-amazon.com/images/I/61zNjdehc1L.jpg`;

  return (
    <div className="featured-book-callout">
      <div className="book-cover-container">
        {/* Layer 1: The Design Mockup (Visible while loading or if error) */}
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '1.5rem',
          textAlign: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '5px',
            background: 'var(--primary)'
          }} />
          <h5 style={{ 
            color: 'var(--primary)', 
            fontSize: '0.6rem', 
            letterSpacing: '0.2em', 
            marginBottom: '1rem',
            textTransform: 'uppercase'
          }}>PK R</h5>
          <div style={{ 
            fontSize: '1rem', 
            fontFamily: 'var(--font-playfair)', 
            color: 'white',
            lineHeight: 1.2
          }}>
            {book.title}
          </div>
          <div style={{
            position: 'absolute',
            bottom: '1rem',
            fontSize: '0.5rem',
            letterSpacing: '0.1em',
            opacity: 0.3,
            color: 'white'
          }}>AUTHOR COLLECTION</div>
        </div>

        {/* Layer 2: The Actual Image (Covers mockup if successful) */}
        {!imgError && (
          <img 
            src={imgSrc} 
            alt={book.title}
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover', 
              display: 'block',
              position: 'relative',
              zIndex: 2
            }}
            onError={() => setImgError(true)}
          />
        )}
      </div>
      <div className="book-info-container">
        <h4 className="book-subtitle">Featured Book</h4>
        <h3 className="book-title-header">{book.title}</h3>
        <p className="book-description">{book.description?.substring(0, 180)}...</p>
        <a 
          href={book.amznLink || '#'} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn btn-primary acquire-btn"
        >
          ACQUIRE THE BOOK
        </a>
      </div>

      <style jsx>{`
        .featured-book-callout {
          margin-bottom: 8rem;
          display: grid;
          grid-template-columns: minmax(200px, 280px) 1fr;
          gap: 4rem;
          padding: 4rem;
          background: rgba(212, 175, 55, 0.03);
          border-radius: 20px;
          border: 1px solid var(--glass-border);
          align-items: center;
          transition: all 0.5s ease;
        }
        .featured-book-callout:hover {
          background: rgba(212, 175, 55, 0.06);
          border-color: rgba(212, 175, 55, 0.2);
        }
        .book-cover-container {
          position: relative;
          box-shadow: 0 30px 60px rgba(0,0,0,0.6);
          border: 1px solid rgba(212, 175, 55, 0.3);
          border-radius: 8px;
          overflow: hidden;
          aspect-ratio: 2/3;
          background: linear-gradient(135deg, #1A1A1A 0%, #050505 100%);
        }
        .book-subtitle {
          color: var(--primary);
          letter-spacing: 0.2em;
          text-transform: uppercase;
          font-size: 0.8rem;
          margin-bottom: 1rem;
        }
        .book-title-header {
          font-size: clamp(1.8rem, 4vw, 2.5rem);
          margin-bottom: 1.5rem;
          margin-top: 0;
          font-family: var(--font-playfair);
        }
        .book-description {
          color: #AAA;
          margin-bottom: 2.5rem;
          font-size: 1rem;
          line-height: 1.6;
        }
        .acquire-btn {
          padding: 0.8rem 2rem;
          font-size: 0.75rem;
        }

        @media (max-width: 850px) {
          .featured-book-callout {
            grid-template-columns: 1fr;
            gap: 3rem;
            padding: 2.5rem 1.5rem;
            text-align: center;
          }
          .book-cover-container {
            max-width: 240px;
            margin: 0 auto;
          }
          .book-info-container {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
}
