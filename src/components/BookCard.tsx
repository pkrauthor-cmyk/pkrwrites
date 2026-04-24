'use client';

import { useState } from 'react';

interface BookProps {
  asin: string;
  title: string;
  coverUrl: string | null;
  amznLink: string | null;
  description: string | null;
}

export default function BookCard({ book }: { book: BookProps }) {
  const amazonUrl = book.amznLink || `https://www.amazon.com/dp/${book.asin}`;
  const [imgError, setImgError] = useState(false);

  const showCover = book.coverUrl && !imgError;

  return (
    <div className="glass-card" style={{ 
      padding: '2.5rem', 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%', 
      position: 'relative',
      borderRadius: '2px',
      background: 'rgba(255, 255, 255, 0.01)',
      border: '1px solid var(--glass-border)'
    }}>
      <div style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '2/3',
        marginBottom: '2.5rem',
        overflow: 'hidden',
        borderRadius: '1px',
        backgroundColor: '#111',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)'
      }}>
        {showCover ? (
          <img 
            src={book.coverUrl!} 
            alt={book.title} 
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s var(--ease-premium)' }}
            className="book-image"
            onError={() => setImgError(true)}
            referrerPolicy="no-referrer"
            crossOrigin="anonymous"
          />
        ) : (
          <div style={{ 
            width: '100%', height: '100%', 
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', 
            gap: '1rem',
            background: 'linear-gradient(135deg, rgba(197,160,89,0.05) 0%, rgba(0,0,0,0) 100%)'
          }}>
            <span style={{ fontSize: '2.5rem', opacity: 0.15 }}>📖</span>
            <span style={{ color: 'var(--primary)', opacity: 0.4, letterSpacing: '0.2em', fontSize: '0.55rem', fontWeight: 700, textTransform: 'uppercase' }}>
              ◆ Cover Unavailable ◆
            </span>
          </div>
        )}
        {/* Subtle Overlay Glow */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent 40%)',
          pointerEvents: 'none'
        }}></div>
      </div>
      
      <div style={{ flex: 1 }}>
        <h3 style={{ 
          fontSize: '1.4rem', 
          marginBottom: '1rem', 
          color: 'white', 
          lineHeight: '1.3',
          fontWeight: 700,
          letterSpacing: '-0.01em'
        }}>
          {book.title}
        </h3>
        
        <p style={{ 
          fontSize: '0.9rem', 
          color: 'var(--text-muted)', 
          lineHeight: '1.8',
          marginBottom: '3rem',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          fontWeight: 400
        }}>
          {book.description || 'Discover a transformative reading experience crafted by PKR Writes.'}
        </p>
      </div>
      
      <div style={{ marginTop: 'auto' }}>
        <a 
          href={amazonUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn btn-primary"
          style={{ 
            width: '100%', 
            textAlign: 'center', 
            fontSize: '0.7rem', 
            padding: '1.1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.6rem',
            letterSpacing: '0.2em'
          }}
        >
          ACQUIRE ON AMAZON
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </a>
      </div>
    </div>
  );
}
