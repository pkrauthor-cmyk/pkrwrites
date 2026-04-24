'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Users, Share2, Briefcase, Camera, Video, ShoppingBag, Globe, Mail, Link as LinkIcon } from 'lucide-react';
import { BrandIcons } from '@/lib/icons';

const AVAILABLE_ICONS: Record<string, any> = {
  Facebook: BrandIcons.Facebook,
  Twitter: BrandIcons.Twitter,
  Instagram: BrandIcons.Instagram,
  Youtube: BrandIcons.Youtube,
  Linkedin: BrandIcons.Linkedin,
  Github: BrandIcons.Github,
  Amazon: BrandIcons.Amazon,
  Users,
  Share2,
  Briefcase,
  Camera,
  Video,
  ShoppingBag,
  Globe,
  Mail,
  LinkIcon
};

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [footerLinks, setFooterLinks] = useState([
    { name: 'Our Books', href: '/books' },
    { name: 'Insights Blog', href: '/blog' },
    { name: 'About the Author', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]);
  const [socialLinks, setSocialLinks] = useState([
    { name: 'Amazon Store', href: 'https://www.amazon.com/author/pk_r', icon: 'ShoppingBag', visible: true },
    { name: 'Twitter / X', href: '#', icon: 'Share2', visible: true },
    { name: 'LinkedIn', href: '#', icon: 'Briefcase', visible: true },
  ]);

  useEffect(() => {
    fetch('/api/settings/menus')
      .then(res => res.json())
      .then(data => {
        if (data.footer) setFooterLinks(data.footer);
      })
      .catch(() => {});

    fetch('/api/settings/social')
      .then(res => res.json())
      .then(data => {
        if (data.links && data.links.length > 0) setSocialLinks(data.links);
      })
      .catch(() => {});
  }, []);

  const SocialIcon = ({ name, iconName }: { name: string, iconName: string }) => {
    // Smart detection: If the platform name matches a brand, use that brand's icon automatically
    const platform = name.toLowerCase();
    if (platform.includes('facebook')) return <BrandIcons.Facebook size={18} />;
    if (platform.includes('twitter') || platform.includes(' x')) return <BrandIcons.Twitter size={18} />;
    if (platform.includes('instagram')) return <BrandIcons.Instagram size={18} />;
    if (platform.includes('youtube')) return <BrandIcons.Youtube size={18} />;
    if (platform.includes('linkedin')) return <BrandIcons.Linkedin size={18} />;
    if (platform.includes('github')) return <BrandIcons.Github size={18} />;
    if (platform.includes('amazon')) return <BrandIcons.Amazon size={18} />;

    // Fallback to the specifically selected icon or default link icon
    const IconComponent = AVAILABLE_ICONS[iconName] || LinkIcon;
    return <IconComponent size={18} />;
  };

  return (
    <footer style={{
      padding: '10rem 0 5rem',
      backgroundColor: 'var(--bg-darker)',
      borderTop: '1px solid var(--glass-border)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Glow */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-5%',
        width: '40%',
        height: '400px',
        background: 'radial-gradient(circle, rgba(142, 111, 62, 0.05) 0%, transparent 70%)',
        zIndex: 0,
        filter: 'blur(100px)'
      }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="responsive-grid" style={{
          gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
          gap: '4rem',
          textAlign: 'left',
          marginBottom: '6rem'
        }}>
          <div>
            <Link href="/" style={{ 
              fontSize: '1.4rem', 
              fontWeight: 800, 
              letterSpacing: '0.2em', 
              fontFamily: 'var(--font-playfair)', 
              color: 'var(--primary)',
              marginBottom: '2.5rem',
              display: 'inline-block',
              textTransform: 'uppercase'
            }}>
              PKR WRITES
            </Link>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '2', maxWidth: '320px', marginBottom: '3rem' }}>
              Crafting stories that challenge the status quo and publishing strategies that empower the next generation of independent authors.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {socialLinks.filter(link => link.visible).map((link, idx) => (
                <a key={idx} href={link.href} target="_blank" rel="noopener noreferrer" style={{ 
                  color: 'var(--text-muted)',
                  transition: 'all 0.3s var(--ease-premium)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  fontSize: '0.85rem'
                }} className="footer-social-link">
                  <div style={{
                    width: '32px',
                    height: '32px',
                    background: 'rgba(255,255,255,0.02)',
                    borderRadius: '2px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid var(--glass-border)'
                  }}>
                    <SocialIcon name={link.name} iconName={link.icon} />
                  </div>
                  <span style={{ fontWeight: 600, letterSpacing: '0.05em' }}>{link.name}</span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ color: 'white', marginBottom: '2.5rem', fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.9 }}>Navigation</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {footerLinks.map((link) => (
                <li key={link.name} style={{ marginBottom: '1.2rem' }}>
                  <Link href={link.href} style={{ fontSize: '0.85rem', color: 'var(--text-muted)', transition: '0.3s' }} className="footer-link">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ color: 'white', marginBottom: '2.5rem', fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.9 }}>Resources</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '1.2rem' }}><Link href="/books" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }} className="footer-link">Book Collection</Link></li>
              <li style={{ marginBottom: '1.2rem' }}><Link href="/blog" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }} className="footer-link">Author Insights</Link></li>
              <li style={{ marginBottom: '1.2rem' }}><a href="https://www.amazon.com/author/pk_r" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }} className="footer-link">Amazon Author Page</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: 'white', marginBottom: '2.5rem', fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.9 }}>Legal</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '1.2rem' }}><Link href="/privacy" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }} className="footer-link">Privacy Policy</Link></li>
              <li style={{ marginBottom: '1.2rem' }}><Link href="/terms" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }} className="footer-link">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div style={{
          paddingTop: '3rem',
          borderTop: '1px solid var(--glass-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '2rem',
          color: 'rgba(255,255,255,0.3)',
          fontSize: '0.75rem',
          letterSpacing: '0.05em'
        }}>
          <p>© {currentYear} PKR Writes. All rights reserved.</p>
          <a
            href="/books"
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.2em',
              color: 'var(--primary)',
              textTransform: 'uppercase',
              border: '1px solid rgba(197,160,89,0.25)',
              padding: '0.5rem 1.2rem',
              borderRadius: '2px',
              transition: 'all 0.3s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
            className="footer-books-link"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
            </svg>
            MY BOOKS
          </a>
          <div style={{ display: 'flex', gap: '3rem', fontWeight: 700, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)' }}>
            <span style={{ fontSize: '0.65rem' }}>DESIGN BY PKR</span>
            <span style={{ fontSize: '0.65rem' }}>EST. 2024</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

const styles = `
  .footer-social-link:hover {
    opacity: 1 !important;
    color: var(--primary);
    transform: translateX(5px);
  }
  .footer-books-link:hover {
    background: rgba(197,160,89,0.08) !important;
    border-color: var(--primary) !important;
    transform: translateY(-2px);
  }
`;

if (typeof document !== 'undefined') {
  const styleTag = document.createElement('style');
  styleTag.innerHTML = styles;
  document.head.appendChild(styleTag);
}
