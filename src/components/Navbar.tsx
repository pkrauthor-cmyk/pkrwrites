'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [navLinks, setNavLinks] = useState([
    { name: 'BOOKS', href: '/books' },
    { name: 'BLOG', href: '/blog' },
    { name: 'ABOUT', href: '/about' },
    { name: 'CONTACT', href: '/contact' },
  ]);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // ... existing scroll and resize handlers ...
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setMobileMenuOpen(false);
    };

    handleScroll();
    handleResize();
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    // Fetch dynamic menu
    fetch('/api/settings/menus')
      .then(res => res.json())
      .then(data => {
        if (data.header) setNavLinks(data.header);
      })
      .catch(() => {});

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const NavContent = ({ mobile = false }) => (
    <>
      {navLinks.map((link) => (
        <Link 
          key={link.name} 
          href={link.href} 
          onClick={() => mobile && setMobileMenuOpen(false)}
          style={{ 
            fontSize: mobile ? '1.2rem' : '0.8rem', 
            fontWeight: 600, 
            letterSpacing: '0.2rem',
            color: pathname === link.href ? 'var(--primary)' : 'var(--text-main)',
            opacity: pathname === link.href ? 1 : 0.7,
            position: 'relative',
            paddingBottom: mobile ? '1rem' : '4px',
            textDecoration: 'none',
            display: 'block'
          }}
          className="nav-link"
        >
          {link.name}
          {!mobile && pathname === link.href && (
            <span style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '1px',
              background: 'var(--primary)',
              boxShadow: '0 0 8px var(--primary-glow)'
            }} />
          )}
        </Link>
      ))}
    </>
  );

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 1000,
        padding: scrolled ? (isMobile ? '0.8rem 0' : '1rem 0') : (isMobile ? '1.5rem 0' : '2.5rem 0'),
        background: scrolled ? 'rgba(5, 5, 5, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(197, 160, 89, 0.15)' : '1px solid transparent',
        transition: 'all 0.5s var(--ease-premium)'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ 
            display: 'flex',
            alignItems: 'center',
            gap: isMobile ? '0.6rem' : '0.8rem',
            textDecoration: 'none'
          }}>
            <div style={{
              position: 'relative',
              padding: '2px',
              background: 'linear-gradient(45deg, var(--primary), transparent)',
              borderRadius: '2px'
            }}>
              <img 
                src="/images/pkr-logo.png" 
                alt="PKR Writes" 
                style={{ 
                  height: isMobile ? '32px' : '38px', 
                  width: 'auto',
                  borderRadius: '1px',
                  display: 'block'
                }} 
              />
            </div>
            <span style={{ 
              fontSize: isMobile ? '1rem' : '1.2rem', 
              fontWeight: 800, 
              letterSpacing: '0.15em',
              fontFamily: 'var(--font-playfair)', 
              color: 'var(--primary)',
              textTransform: 'uppercase'
            }}>
              PKR WRITES
            </span>
          </Link>
          
          {/* Desktop Nav */}
          <div style={{ display: isMobile ? 'none' : 'flex', gap: '3.5rem', alignItems: 'center' }}>
            <NavContent />
            <Link href="/contact" className="btn btn-outline" style={{ 
              padding: '0.6rem 1.4rem', 
              fontSize: '0.7rem',
              borderColor: 'rgba(197, 160, 89, 0.3)'
            }}>
              GET IN TOUCH
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: isMobile ? 'flex' : 'none',
              flexDirection: 'column',
              gap: '6px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              zIndex: 1100,
              padding: '10px'
            }}
          >
            <span style={{ width: '25px', height: '1.5px', background: 'var(--primary)', transition: '0.3s', transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 6px)' : 'none' }}></span>
            <span style={{ width: '18px', height: '1.5px', background: 'var(--primary)', alignSelf: 'flex-end', transition: '0.3s', opacity: mobileMenuOpen ? 0 : 1 }}></span>
            <span style={{ width: '25px', height: '1.5px', background: 'var(--primary)', transition: '0.3s', transform: mobileMenuOpen ? 'rotate(-45deg) translate(5px, -6px)' : 'none' }}></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        background: 'var(--bg-darker)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '2.5rem',
        zIndex: 1050,
        transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
        transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(-100%)',
        visibility: mobileMenuOpen ? 'visible' : 'hidden'
      }}>
        <NavContent mobile />
      </div>
    </>
  );
}
