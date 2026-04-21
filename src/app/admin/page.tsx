import Link from 'next/link';
import { prisma } from '@/lib/db';
import { 
  PlusCircle, 
  FileText, 
  Settings, 
  BookOpen, 
  LayoutPanelTop, 
  LayoutPanelLeft, 
  History,
  ExternalLink,
  ChevronRight,
  Database
} from 'lucide-react';
import DashboardTools from './_components/DashboardTools';

export default async function AdminDashboardPage() {
  // Fetch site data
  let postCount = 0;
  let bookCount = 0;
  let pageCount = 0;
  let recentPosts: any[] = [];

  if (!process.env.VERCEL) {
    [postCount, bookCount, pageCount, recentPosts] = await Promise.all([
      prisma.blogPost.count({ where: { status: { not: 'trashed' } } }),
      prisma.book.count(),
      prisma.page.count(),
      prisma.blogPost.findMany({
        where: { status: 'published' },
        orderBy: { publishedAt: 'desc' },
        take: 5
      })
    ]);
  }

  const StatCard = ({ title, value, icon: Icon, color }: any) => (
    <div className="glass-card" style={{ padding: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
      <div style={{ padding: '1rem', background: `rgba(212, 175, 55, 0.1)`, borderRadius: '12px', color: color || 'var(--primary)' }}>
        <Icon size={28} />
      </div>
      <div>
        <div style={{ fontSize: '0.8rem', opacity: 0.6, letterSpacing: '0.1em', marginBottom: '0.2rem' }}>{title.toUpperCase()}</div>
        <div style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-playfair)', color: 'white' }}>{value}</div>
      </div>
    </div>
  );

  const ManagementBlock = ({ title, items }: any) => (
    <div className="glass-card" style={{ padding: '2.5rem' }}>
      <h3 style={{ fontSize: '1.2rem', color: 'var(--primary)', marginBottom: '1.5rem', fontFamily: 'var(--font-playfair)' }}>{title}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {items.map((item: any, i: number) => (
          <Link 
            key={i} 
            href={item.href} 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              padding: '1rem', 
              borderRadius: '8px', 
              background: 'rgba(255,255,255,0.02)',
              textDecoration: 'none',
              transition: 'all 0.3s'
            }}
            className="admin-dashboard-link"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <item.icon size={18} style={{ opacity: 0.7 }} />
              <span style={{ fontSize: '0.9rem', color: 'white', fontWeight: 600 }}>{item.name}</span>
            </div>
            <ChevronRight size={16} opacity={0.4} />
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <section className="fade-in">
      {/* Header */}
      <div style={{ marginBottom: '3.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '2.8rem', marginBottom: '0.5rem', fontFamily: 'var(--font-playfair)' }}>Command Center</h1>
          <p style={{ color: 'var(--text-muted)' }}>Real-time overview of your digital author empire.</p>
        </div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', border: '1px solid var(--glass-border)', padding: '0.5rem 1rem', borderRadius: '30px' }}>
          Server Status: <span style={{ color: '#00ff00' }}>ONLINE</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        <StatCard title="Blog Posts" value={postCount} icon={FileText} />
        <StatCard title="Books Library" value={bookCount} icon={BookOpen} color="#A78BFA" />
        <StatCard title="Static Pages" value={pageCount} icon={LayoutPanelTop} color="#F472B6" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2.5rem', marginBottom: '4rem' }}>
        {/* Content Management */}
        <ManagementBlock 
          title="Content Engine" 
          items={[
            { name: 'Write New Post', href: '/admin/blog/new', icon: PlusCircle },
            { name: 'Manage All Blog Posts', href: '/admin/blog', icon: FileText },
            { name: 'Manage Books Library', href: '/admin/books', icon: BookOpen },
            { name: 'Manage Static Pages', href: '/admin/pages', icon: LayoutPanelTop },
          ]}
        />

        {/* Design & Config */}
        <ManagementBlock 
          title="Design & Navigation" 
          items={[
            { name: 'Header Navigation Menu', href: '/admin/settings/menus?tab=header', icon: LayoutPanelTop },
            { name: 'Footer Quick Links', href: '/admin/settings/menus?tab=footer', icon: LayoutPanelLeft },
            { name: 'Social Media Links', href: '/admin/settings/social', icon: Settings },
            { name: 'SEO & Search Settings', href: '/sitemap.xml', icon: Database },
          ]}
        />
      </div>

      {/* Activity and Tools Split */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2.5rem' }}>
        {/* Recent Activity */}
        <div className="glass-card" style={{ padding: '2.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <History size={20} color="var(--primary)" />
              <h3 style={{ fontSize: '1.2rem', color: 'white' }}>Recent Activity</h3>
            </div>
            <Link href="/admin/blog" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textDecoration: 'none' }}>View All</Link>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {recentPosts.map(post => (
              <div key={post.id} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                padding: '1rem', 
                background: 'rgba(255,255,255,0.02)', 
                borderRadius: '8px',
                border: '1px solid var(--glass-border)'
              }}>
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'white', marginBottom: '0.2rem' }}>{post.title}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Published on {new Date(post.publishedAt!).toLocaleDateString()}</div>
                </div>
                <Link href={`/admin/blog/edit/${post.slug}`} style={{ color: 'var(--primary)', padding: '0.5rem' }}>
                  <ExternalLink size={16} />
                </Link>
              </div>
            ))}
            {recentPosts.length === 0 && (
              <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>No recent activity to show.</div>
            )}
          </div>
        </div>

        {/* Global Tools Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <DashboardTools />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .admin-dashboard-link:hover {
          background: rgba(212, 175, 55, 0.08) !important;
          transform: translateX(10px);
        }
      `}} />
    </section>
  );
}
