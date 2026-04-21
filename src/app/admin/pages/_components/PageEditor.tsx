'use client';

import { useState } from 'react';
import { createPage, updatePage } from '../actions';
import ModernEditor from '../../blog/_components/ModernEditor';

interface PageEditorProps {
  page?: any;
}

export default function PageEditor({ page }: PageEditorProps) {
  const isEditing = !!page;
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(page?.content || '');

  async function clientAction(formData: FormData) {
    setLoading(true);
    formData.set('content', content);
    
    if (isEditing) {
      await updatePage(page.id, formData);
    } else {
      await createPage(formData);
    }
    setLoading(false);
  }

  return (
    <form action={clientAction} className="fade-in">
      <div className="glass-card" style={{ padding: '3rem', marginBottom: '2rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', fontSize: '0.8rem', opacity: 0.6, marginBottom: '0.5rem', letterSpacing: '0.1em' }}>PAGE TITLE</label>
          <input 
            name="title" 
            defaultValue={page?.title} 
            required 
            placeholder="e.g., About Author"
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

        <div style={{ marginBottom: '3rem' }}>
          <label style={{ display: 'block', fontSize: '0.8rem', opacity: 0.6, marginBottom: '0.5rem', letterSpacing: '0.1em' }}>SLUG (URL PATH)</label>
          <input 
            name="slug" 
            defaultValue={page?.slug} 
            required 
            placeholder="about-author"
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
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
            Warning: Changing the slug will break existing links to this page.
          </p>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: '0.8rem', opacity: 0.6, fontWeight: 600, letterSpacing: '0.1em', marginBottom: '1.5rem' }}>PAGE CONTENT</label>
          <ModernEditor value={content} onChange={setContent} placeholder="Write your page content here..." />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '4rem' }}>
          <button 
            type="submit" 
            disabled={loading}
            className="btn btn-primary" 
            style={{ padding: '1rem 3rem', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'SAVING...' : (isEditing ? 'UPDATE PAGE' : 'CREATE PAGE')}
          </button>
        </div>
      </div>
    </form>
  );
}
