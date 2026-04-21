'use client';

import { useState } from 'react';
import { createBlogPost, updateBlogPost, polishBlogContentAction } from '../actions';
import ModernEditor from './ModernEditor';

interface BlogEditorProps {
  post?: any;
  books?: any[];
}

export default function BlogEditor({ post, books = [] }: BlogEditorProps) {
  const isEditing = !!post;
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(post?.content || '');
  const [isCustomHtml, setIsCustomHtml] = useState(post?.isCustomHtml || false);

  async function clientAction(formData: FormData) {
    setLoading(true);
    formData.set('content', content);
    formData.set('isCustomHtml', isCustomHtml.toString());
    
    if (isEditing) {
      await updateBlogPost(post.id, formData);
    } else {
      await createBlogPost(formData);
    }
    setLoading(false);
  }

  async function handlePolish() {
    if (!content) return;
    setLoading(true);
    const result = await polishBlogContentAction(content);
    if (result.success && result.content) {
      setContent(result.content);
    } else {
      alert(result.error);
    }
    setLoading(false);
  }

  return (
    <form action={clientAction} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
      <div className="glass-card" style={{ padding: '3rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', fontSize: '0.8rem', opacity: 0.6, marginBottom: '0.5rem' }}>POST TITLE</label>
          <input 
            name="title" 
            defaultValue={post?.title} 
            required 
            placeholder="Enter a cosmic title..."
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              borderBottom: '1px solid var(--glass-border)',
              fontSize: '2rem',
              color: 'white',
              padding: '1rem 0',
              outline: 'none',
              fontFamily: 'var(--font-playfair)'
            }}
          />
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', fontSize: '0.8rem', opacity: 0.6, marginBottom: '0.5rem' }}>SLUG (URL PATH)</label>
          <input 
            name="slug" 
            defaultValue={post?.slug} 
            required 
            placeholder="my-galactic-story"
            style={{
              width: '100%',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--glass-border)',
              padding: '1rem',
              borderRadius: '4px',
              color: 'var(--primary)',
              fontFamily: 'monospace'
            }}
          />
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', opacity: 0.6, fontWeight: 600, letterSpacing: '0.1em' }}>CONTENT (Visual Editor)</label>
            <button 
              type="button" 
              onClick={handlePolish} 
              disabled={loading}
              style={{
                background: 'linear-gradient(135deg, #D4AF37, #BFA75D)',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                color: 'black',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              {loading ? 'POLISHING...' : '✨ PROFESSIONAL AUTHOR POLISH'}
            </button>
          </div>
          <ModernEditor value={content} onChange={setContent} isCustomHtml={isCustomHtml} />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div className="glass-card" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem', color: 'var(--primary)' }}>Publishing</h3>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', opacity: 0.6, marginBottom: '0.5rem' }}>STATUS</label>
            <select 
              name="status" 
              defaultValue={post?.status || 'draft'}
              style={{
                width: '100%',
                padding: '1rem',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--glass-border)',
                color: 'white',
                borderRadius: '4px'
              }}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', padding: '0.8rem', background: 'rgba(212, 175, 55, 0.05)', borderRadius: '4px', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
              <input 
                type="checkbox" 
                checked={isCustomHtml} 
                onChange={(e) => setIsCustomHtml(e.target.checked)}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary)' }}>CUSTOM HTML MODE</span>
            </label>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.5rem', marginLeft: '2rem' }}>
              Bypasses standard blog styling. Use for AI-generated posts with their own CSS.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button 
              type="submit" 
              disabled={loading}
              className="btn btn-primary" 
              style={{ flex: 1, padding: '1.2rem', opacity: loading ? 0.7 : 1 }}
            >
              {loading ? 'SAVING...' : (isEditing ? 'UPDATE POST' : 'PUBLISH NOW')}
            </button>

            {isEditing && (
              <a 
                href={`/blog/${post.slug}`} 
                target="_blank" 
                className="btn btn-outline"
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  padding: '1.2rem',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textDecoration: 'none',
                  minWidth: '120px'
                }}
              >
                VIEW POST
              </a>
            )}
          </div>
        </div>

        <div className="glass-card" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem', color: 'var(--primary)' }}>Featured Book</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Link this post to one of your book covers.</p>
          
          <div style={{ marginBottom: '1rem' }}>
            <select 
              name="relatedBookAsin" 
              defaultValue={post?.relatedBookAsin || ''}
              style={{
                width: '100%',
                padding: '1rem',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--glass-border)',
                color: 'white',
                borderRadius: '4px'
              }}
            >
              <option value="">-- No Featured Book --</option>
              {books.map(book => (
                <option key={book.asin} value={book.asin}>
                  {book.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem', color: 'var(--primary)' }}>SEO & Metadata</h3>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', opacity: 0.6, marginBottom: '0.5rem' }}>CATEGORY</label>
            <input 
              name="category" 
              defaultValue={post?.category} 
              style={{
                width: '100%',
                padding: '1rem',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--glass-border)',
                color: 'white',
                borderRadius: '4px'
              }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', opacity: 0.6, marginBottom: '0.5rem' }}>META TITLE</label>
            <input 
              name="metaTitle" 
              defaultValue={post?.metaTitle} 
              placeholder="Google search result title..."
              style={{
                width: '100%',
                padding: '1rem',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--glass-border)',
                color: 'var(--primary)',
                borderRadius: '4px'
              }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', opacity: 0.6, marginBottom: '0.5rem' }}>META DESCRIPTION</label>
            <textarea 
              name="metaDesc" 
              defaultValue={post?.metaDesc} 
              rows={3}
              placeholder="Google search result snippet..."
              style={{
                width: '100%',
                padding: '1rem',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--glass-border)',
                color: 'white',
                borderRadius: '4px',
                fontSize: '0.85rem'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', opacity: 0.6, marginBottom: '0.5rem' }}>EXCERPT (SHORT SUMMARY)</label>
            <textarea 
              name="excerpt" 
              defaultValue={post?.excerpt} 
              rows={4}
              style={{
                width: '100%',
                padding: '1rem',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--glass-border)',
                color: 'white',
                borderRadius: '4px',
                fontSize: '0.9rem'
              }}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
