import { prisma } from '@/lib/db';
import Link from 'next/link';
import { PlusCircle, Edit, Trash2, ExternalLink, Send } from 'lucide-react';
import { deleteBlogPost, publishBlogPost } from './actions';

export default async function BlogAdminPage() {
  let posts: any[] = [];
  let trashedCount = 0;

  if (!process.env.VERCEL) {
    posts = await prisma.blogPost.findMany({
      where: { NOT: { status: 'trashed' } },
      orderBy: { createdAt: 'desc' },
    });

    trashedCount = await prisma.blogPost.count({
      where: { status: 'trashed' }
    });
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', fontFamily: 'var(--font-playfair)' }}>Manage Blog Posts</h1>
          <p style={{ color: 'var(--text-muted)' }}>You have {posts.length} stories in your library.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link href="/admin/blog/trash" className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 1.5rem', color: '#ff4444', borderColor: 'rgba(255, 68, 68, 0.2)' }}>
            <Trash2 size={20} />
            <span>Trash ({trashedCount})</span>
          </Link>
          <Link href="/admin/blog/new" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2rem' }}>
            <PlusCircle size={20} />
            <span>Write New Post</span>
          </Link>
        </div>
      </div>

      <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'rgba(255, 255, 255, 0.05)', color: 'var(--primary)' }}>
              <th style={{ padding: '1.5rem 2rem', fontWeight: 600 }}>TITLE</th>
              <th style={{ padding: '1.5rem 2rem', fontWeight: 600 }}>STATUS</th>
              <th style={{ padding: '1.5rem 2rem', fontWeight: 600 }}>DATE</th>
              <th style={{ padding: '1.5rem 2rem', fontWeight: 600 }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} style={{ borderBottom: '1px solid var(--glass-border)', transition: 'background 0.3s' }}>
                <td style={{ padding: '1.5rem 2rem' }}>
                  <div style={{ fontWeight: 600, color: 'white', marginBottom: '0.25rem' }}>{post.title}</div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.5 }}>/{post.slug}</div>
                </td>
                <td style={{ padding: '1.5rem 2rem' }}>
                  <span style={{ 
                    padding: '0.4rem 0.8rem', 
                    borderRadius: '20px', 
                    fontSize: '0.75rem', 
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    background: post.status === 'published' ? 'rgba(0, 255, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)',
                    color: post.status === 'published' ? '#4ade80' : 'var(--text-muted)'
                  }}>
                    {post.status}
                  </span>
                </td>
                <td style={{ padding: '1.5rem 2rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  {new Date(post.createdAt).toLocaleDateString()}
                </td>
                <td style={{ padding: '1.5rem 2rem' }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    {post.status === 'draft' && (
                      <form action={publishBlogPost.bind(null, post.id)}>
                        <button type="submit" style={{ background: 'none', border: 'none', color: '#4ade80', opacity: 0.8, cursor: 'pointer' }} title="Publish Now">
                          <Send size={18} />
                        </button>
                      </form>
                    )}
                    <Link href={`/admin/blog/edit/${post.id}`} style={{ color: 'var(--primary)', opacity: 0.8 }} title="Edit">
                      <Edit size={20} />
                    </Link>
                    <Link href={`/blog/${post.slug}`} target="_blank" style={{ color: 'white', opacity: 0.8 }} title="View">
                      <ExternalLink size={20} />
                    </Link>
                    <form action={deleteBlogPost.bind(null, post.id)}>
                      <button type="submit" style={{ background: 'none', border: 'none', color: '#ff4444', opacity: 0.8, cursor: 'pointer' }} title="Delete">
                        <Trash2 size={20} />
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {posts.length === 0 && (
          <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            No blog posts found. Start by creating your first story!
          </div>
        )}
      </div>
    </div>
  );
}
