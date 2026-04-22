import { prisma } from '@/lib/db';
import Link from 'next/link';
import { RefreshCcw, Trash2, ArrowLeft, AlertCircle } from 'lucide-react';
import { EmptyTrashButton, RestoreButton, PermanentDeleteButton } from './_components/TrashActions';

export default async function TrashPage() {
  let trashedPosts: any[] = [];
  try {
    trashedPosts = await prisma.blogPost.findMany({
      where: { status: 'trashed' },
      orderBy: { updatedAt: 'desc' },
    });
  } catch (error) {
    console.error("Trash fetch error:", error);
  }



  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <Link href="/admin/blog" style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', textDecoration: 'none', fontSize: '0.9rem' }}>
            <ArrowLeft size={16} /> Back to Blog
          </Link>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', fontFamily: 'var(--font-playfair)' }}>Trash Can</h1>
          <p style={{ color: 'var(--text-muted)' }}>You have {trashedPosts.length} items in your trash.</p>
        </div>
        
        {trashedPosts.length > 0 && <EmptyTrashButton />}
      </div>

      <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'rgba(255, 255, 255, 0.05)', color: 'var(--primary)' }}>
              <th style={{ padding: '1.5rem 2rem', fontWeight: 600 }}>TITLE</th>
              <th style={{ padding: '1.5rem 2rem', fontWeight: 600 }}>TRASHED DATE</th>
              <th style={{ padding: '1.5rem 2rem', fontWeight: 600 }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {trashedPosts.map((post) => (
              <tr key={post.id} style={{ borderBottom: '1px solid var(--glass-border)', transition: 'background 0.3s' }}>
                <td style={{ padding: '1.5rem 2rem' }}>
                  <div style={{ fontWeight: 600, color: 'white', marginBottom: '0.25rem' }}>{post.title}</div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.5 }}>/{post.slug}</div>
                </td>
                <td style={{ padding: '1.5rem 2rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  {new Date(post.updatedAt).toLocaleDateString()}
                </td>
                <td style={{ padding: '1.5rem 2rem' }}>
                  <div style={{ display: 'flex', gap: '1.5rem' }}>
                    <RestoreButton id={post.id} />
                    <PermanentDeleteButton id={post.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {trashedPosts.length === 0 && (
          <div style={{ padding: '5rem 2rem', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <AlertCircle size={48} color="var(--primary)" style={{ opacity: 0.3 }} />
            </div>
            <p style={{ color: 'var(--text-muted)' }}>Your trash is empty.</p>
            <Link href="/admin/blog" style={{ color: 'var(--primary)', fontSize: '0.9rem', marginTop: '1rem', display: 'inline-block' }}>
              Return to blog posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
