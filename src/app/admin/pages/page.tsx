import Link from 'next/link';
import { prisma } from '@/lib/db';
import { Plus, Edit2, Trash2, ExternalLink, Layout } from 'lucide-react';
import { deletePage } from './actions';

export const dynamic = 'force-dynamic';

export default async function PagesListPage() {
  let pages: any[] = [];
  try {
    pages = await prisma.page.findMany({
      orderBy: { updatedAt: 'desc' }
    });

  } catch (error) {
    console.log("DB check skipped on Vercel:", error);
  }

  return (
    <section className="fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', fontFamily: 'var(--font-playfair)' }}>Static Pages</h1>
          <p style={{ color: 'var(--text-muted)' }}>Manage your site's permanent content and legal documents.</p>
        </div>
        <Link href="/admin/pages/new" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={18} />
          <span>NEW PAGE</span>
        </Link>
      </div>

      <div className="glass-card" style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.02)' }}>
              <th style={{ padding: '1.5rem 2rem', fontSize: '0.8rem', opacity: 0.6 }}>PAGE TITLE</th>
              <th style={{ padding: '1.5rem 2rem', fontSize: '0.8rem', opacity: 0.6 }}>URL PATH</th>
              <th style={{ padding: '1.5rem 2rem', fontSize: '0.8rem', opacity: 0.6 }}>LAST UPDATED</th>
              <th style={{ padding: '1.5rem 2rem', fontSize: '0.8rem', opacity: 0.6, textAlign: 'right' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {pages.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No static pages found. Create your first one to get started.
                </td>
              </tr>
            ) : (
              pages.map((page) => (
                <tr key={page.id} style={{ borderBottom: '1px solid var(--glass-border)', transition: 'background 0.3s' }} className="table-row-hover">
                  <td style={{ padding: '1.5rem 2rem' }}>
                    <div style={{ fontWeight: 600, color: 'white' }}>{page.title}</div>
                  </td>
                  <td style={{ padding: '1.5rem 2rem' }}>
                    <code style={{ color: 'var(--primary)', fontSize: '0.85rem' }}>/{page.slug}</code>
                  </td>
                  <td style={{ padding: '1.5rem 2rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    {new Date(page.updatedAt).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '1.5rem 2rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                      <Link 
                        href={`/${page.slug}`} 
                        target="_blank"
                        style={{ 
                          color: 'var(--text-muted)',
                          padding: '0.5rem',
                          borderRadius: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.2s'
                        }} 
                        title="View Page"
                      >
                        <ExternalLink size={18} />
                      </Link>
                      <Link 
                        href={`/admin/pages/edit/${page.slug}`} 
                        style={{ 
                          color: 'var(--primary)',
                          padding: '0.5rem',
                          borderRadius: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.2s'
                        }} 
                        title="Edit Page"
                      >
                        <Edit2 size={18} />
                      </Link>
                      <form action={deletePage.bind(null, page.id)}>
                        <button 
                          title="Delete Page"
                          style={{ 
                            color: '#ff4444', 
                            background: 'none', 
                            border: 'none', 
                            cursor: 'pointer',
                            padding: '0.5rem',
                            borderRadius: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s'
                          }}
                        >
                          <Trash2 size={18} />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </section>
  );
}
