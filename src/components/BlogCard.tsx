import Link from 'next/link';

interface PostProps {
  title: string;
  slug: string;
  excerpt: string | null;
  publishedAt: Date | null;
  category: string | null;
}

export default function BlogCard({ post }: { post: PostProps }) {
  const formattedDate = post.publishedAt 
    ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : 'Recently Published';

  return (
    <div className="glass-card" style={{ 
      padding: '3rem', 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%', 
      position: 'relative', 
      overflow: 'hidden',
      borderRadius: '2px',
      background: 'rgba(255, 255, 255, 0.01)',
      border: '1px solid var(--glass-border)'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        width: '2px',
        background: 'var(--primary)',
        opacity: 0.3,
        transition: 'all 0.4s var(--ease-premium)'
      }} className="card-accent"></div>

      <div style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <span style={{ 
          fontSize: '0.65rem', 
          fontWeight: 800, 
          color: 'var(--primary)', 
          letterSpacing: '0.3em',
          textTransform: 'uppercase'
        }}>
          {post.category || 'INSIGHTS'}
        </span>
        <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.05em' }}>
          {formattedDate}
        </span>
      </div>
      
      <h3 style={{ 
        fontSize: '1.6rem', 
        marginBottom: '1.5rem', 
        lineHeight: '1.3', 
        color: 'white',
        fontWeight: 700,
        letterSpacing: '-0.01em'
      }}>
        {post.title}
      </h3>
      
      <p style={{ 
        fontSize: '0.95rem', 
        color: 'var(--text-muted)', 
        lineHeight: '1.9',
        marginBottom: '4rem',
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        fontWeight: 400
      }}>
        {post.excerpt || 'Explore this in-depth article from PKR Writes on the latest strategies in self-publishing and digital empowerment.'}
      </p>
      
      <div style={{ marginTop: 'auto' }}>
        <Link 
          href={`/blog/${post.slug}`} 
          style={{ 
            fontSize: '0.75rem', 
            fontWeight: 800, 
            letterSpacing: '0.2em', 
            color: 'var(--primary)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.8rem',
            textDecoration: 'none',
            transition: 'gap 0.3s var(--ease-premium)'
          }}
          className="read-more-link"
        >
          READ ARTICLE
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </Link>
      </div>
    </div>
  );
}
