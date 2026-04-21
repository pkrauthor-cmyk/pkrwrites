'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, FileText, Settings, LogOut, Home, ExternalLink, Trash2, LayoutPanelTop, Briefcase } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Blog Posts', href: '/admin/blog', icon: FileText },
    { name: 'Books Library', href: '/admin/books', icon: Briefcase },
    { name: 'Static Pages', href: '/admin/pages', icon: LayoutPanelTop },
    { name: 'Trash Can', href: '/admin/blog/trash', icon: Trash2 },
    { name: 'Menu Settings', href: '/admin/settings/menus', icon: Settings },
    { name: 'Social Links', href: '/admin/settings/social', icon: Settings },
  ];

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/signin');
    router.refresh();
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-dark)' }}>
      {/* Admin Sidebar */}
      <aside style={{ 
        width: '280px', 
        background: 'var(--bg-darker)', 
        borderRight: '1px solid var(--glass-border)',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        height: '100vh',
        zIndex: 100
      }}>
        <div style={{ padding: '2rem', borderBottom: '1px solid var(--glass-border)' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none' }}>
            <img src="/images/pkr-logo.png" alt="PKR Writes" style={{ height: '32px' }} />
            <span style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '1.2rem', letterSpacing: '0.1em' }}>ADMIN</span>
          </Link>
        </div>

        <nav style={{ flex: 1, padding: '2rem 1rem' }}>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {menuItems.map((item) => (
              <li key={item.name} style={{ marginBottom: '0.5rem' }}>
                <Link 
                  href={item.href}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1rem 1.5rem',
                    borderRadius: '8px',
                    color: pathname === item.href ? 'white' : 'var(--text-muted)',
                    background: pathname === item.href ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
                    textDecoration: 'none',
                    transition: 'all 0.3s'
                  }}
                  className="admin-nav-link"
                >
                  <item.icon size={20} color={pathname === item.href ? 'var(--primary)' : 'currentColor'} />
                  <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div style={{ padding: '2rem 1rem', borderTop: '1px solid var(--glass-border)' }}>
          <button 
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '1rem 1.5rem',
              width: '100%',
              background: 'transparent',
              border: 'none',
              color: '#ff4444',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: 600
            }}
          >
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, marginLeft: '280px', padding: '2rem 4rem' }}>
        <header style={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          alignItems: 'center', 
          marginBottom: '3rem',
          paddingBottom: '1.5rem',
          borderBottom: '1px solid var(--glass-border)'
        }}>
          <Link 
            href="/" 
            target="_blank"
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              color: 'var(--text-muted)',
              fontSize: '0.85rem',
              textDecoration: 'none'
            }}
          >
            <span>View Website</span>
            <ExternalLink size={14} />
          </Link>
        </header>

        {children}
      </main>

      <style jsx global>{`
        .admin-nav-link:hover {
          background: rgba(212, 175, 55, 0.05) !important;
          color: white !important;
        }
      `}</style>
    </div>
  );
}
