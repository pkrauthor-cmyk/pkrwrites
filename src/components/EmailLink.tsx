'use client';

export default function EmailLink({ email }: { email: string }) {
  return (
    <a 
      href={`mailto:${email}`} 
      style={{ 
        fontSize: '2rem', 
        color: 'var(--primary)', 
        fontWeight: 700,
        fontFamily: 'var(--font-playfair)',
        textDecoration: 'none',
        display: 'block',
        margin: '2rem 0',
        letterSpacing: '0.02em',
        transition: 'transform 0.3s ease'
      }}
      onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
      onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      {email}
    </a>
  );
}
