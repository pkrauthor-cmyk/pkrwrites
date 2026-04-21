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
    <div className="featured-book-callout" style={{
      marginBottom: '8rem',
      display: 'grid',
      gridTemplateColumns: 'minmax(200px, 280px) 1fr',
      gap: '4rem',
      padding: '4rem',
      background: 'rgba(212, 175, 55, 0.03)',
      borderRadius: '20px',
      border: '1px solid var(--glass-border)',
      alignItems: 'center'
    }}>
      <div style={{
        position: 'relative',
        boxShadow: '0 30px 60px rgba(0,0,0,0.6)',
        border: '1px solid rgba(212, 175, 55, 0.3)',
        borderRadius: '8px',
        overflow: 'hidden',
        aspectRatio: '2/3',
        background: 'linear-gradient(135deg, #1A1A1A 0%, #050505 100%)', // Mockup Base
      }}>
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
      <div>
        <h4 style={{ color: 'var(--primary)', letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.8rem', marginBottom: '1rem' }}>Featured Book</h4>
        <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', marginTop: 0 }}>{book.title}</h3>
        <p style={{ color: '#AAA', marginBottom: '2.5rem', fontSize: '1rem', lineHeight: 1.6 }}>{book.description?.substring(0, 180)}...</p>
        <a 
          href={book.amznLink || '#'} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn btn-primary"
          style={{ padding: '0.8rem 2rem', fontSize: '0.75rem' }}
        >
          ACQUIRE THE BOOK
        </a>
      </div>

      <style jsx>{`
        .featured-book-callout {
          transition: all 0.5s ease;
        }
        .featured-book-callout:hover {
          background: rgba(212, 175, 55, 0.06);
          border-color: rgba(212, 175, 55, 0.2);
        }
      `}</style>
    </div>
  );
}
