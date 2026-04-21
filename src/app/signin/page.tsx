'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        router.push('/admin');
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'var(--bg-dark)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '800px',
        height: '800px',
        background: 'radial-gradient(circle, rgba(212, 175, 55, 0.05) 0%, transparent 70%)',
        zIndex: 0
      }}></div>

      <div className="glass-card" style={{ 
        width: '100%', 
        maxWidth: '400px', 
        padding: '3rem', 
        position: 'relative', 
        zIndex: 1,
        textAlign: 'center'
      }}>
        <img 
          src="/images/pkr-logo.png" 
          alt="PKR Writes" 
          style={{ height: '60px', marginBottom: '2rem', filter: 'drop-shadow(0 0 10px rgba(212, 175, 55, 0.3))' }} 
        />
        <h1 style={{ 
          fontSize: '1.8rem', 
          marginBottom: '0.5rem', 
          color: 'var(--primary)',
          fontFamily: 'var(--font-playfair)'
        }}>
          ADMIN LOGIN
        </h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '0.9rem' }}>
          Welcome back, PKR. Please sign in to continue.
        </p>

        <form onSubmit={handleSubmit} method="POST" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ textAlign: 'left' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.1em', marginBottom: '0.5rem', opacity: 0.6 }}>EMAIL ADDRESS</label>
            <input 
              name="email" 
              type="email" 
              required 
              placeholder="megajobalert@gmail.com"
              style={{
                width: '100%',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(212, 175, 55, 0.2)',
                padding: '1rem',
                borderRadius: '4px',
                color: 'white',
                outline: 'none',
                transition: 'border-color 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(212, 175, 55, 0.2)'}
            />
          </div>

          <div style={{ textAlign: 'left' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.1em', marginBottom: '0.5rem', opacity: 0.6 }}>PASSWORD</label>
            <input 
              name="password" 
              type="password" 
              required 
              style={{
                width: '100%',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(212, 175, 55, 0.2)',
                padding: '1rem',
                borderRadius: '4px',
                color: 'white',
                outline: 'none',
                transition: 'border-color 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(212, 175, 55, 0.2)'}
            />
          </div>

          {error && <p style={{ color: '#ff4444', fontSize: '0.85rem' }}>{error}</p>}

          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={loading}
            style={{ 
              marginTop: '1rem',
              width: '100%',
              padding: '1.2rem',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'SIGNING IN...' : 'ACCESS DASHBOARD'}
          </button>
        </form>
      </div>
    </main>
  );
}
