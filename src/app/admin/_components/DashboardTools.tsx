'use client';

import { useState } from 'react';
import { RefreshCw, Sparkles } from 'lucide-react';

export default function DashboardTools() {
  const [syncLoading, setSyncLoading] = useState(false);
  const [syncResult, setSyncResult] = useState<any>(null);
  const [blogLoading, setBlogLoading] = useState(false);
  const [blogResult, setBlogResult] = useState<any>(null);

  const handleSync = async () => {
    setSyncLoading(true);
    try {
      const res = await fetch('/api/sync', { method: 'POST' });
      const data = await res.json();
      setSyncResult(data);
    } catch (e) {
      setSyncResult({ error: 'Failed to sync' });
    }
    setSyncLoading(false);
  };

  const handleGenerateBlog = async () => {
    setBlogLoading(true);
    try {
      const res = await fetch('/api/generate-blog', { method: 'POST', body: JSON.stringify({}) });
      const data = await res.json();
      setBlogResult(data);
    } catch (e) {
      setBlogResult({ error: 'Failed to generate blog' });
    }
    setBlogLoading(false);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
      {/* Sync Control */}
      <div className="glass-card" style={{ padding: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ padding: '0.8rem', background: 'rgba(212, 175, 55, 0.1)', borderRadius: '10px' }}>
            <RefreshCw size={24} color="var(--primary)" />
          </div>
          <h3 style={{ fontSize: '1.3rem', color: 'white' }}>Amazon Sync</h3>
        </div>
        <p style={{ marginBottom: '2rem', color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
          Manually trigger the scraper to fetch latest books from the author page.
        </p>
        <button 
          onClick={handleSync} 
          disabled={syncLoading}
          className="btn btn-primary" 
          style={{ width: '100%', opacity: syncLoading ? 0.5 : 1 }}
        >
          {syncLoading ? 'SYNCING...' : 'TRIGGER SYNC NOW'}
        </button>
        
        {syncResult && (
          <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '4px', fontSize: '0.8rem', border: '1px solid var(--glass-border)' }}>
            {syncResult.success ? `✅ Synced ${syncResult.count} books.` : `❌ Error: ${syncResult.error}`}
          </div>
        )}
      </div>

      {/* Blog Generation Control */}
      <div className="glass-card" style={{ padding: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ padding: '0.8rem', background: 'rgba(212, 175, 55, 0.1)', borderRadius: '10px' }}>
            <Sparkles size={24} color="var(--primary)" />
          </div>
          <h3 style={{ fontSize: '1.3rem', color: 'white' }}>AI Blog Engine</h3>
        </div>
        <p style={{ marginBottom: '2rem', color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
          Generate a new SEO-optimized blog post using Google Gemini Flash.
        </p>
        <button 
          onClick={handleGenerateBlog} 
          disabled={blogLoading}
          className="btn btn-outline" 
          style={{ width: '100%', opacity: blogLoading ? 0.5 : 1 }}
        >
          {blogLoading ? 'GENERATING...' : 'GENERATE AI BLOG POST'}
        </button>
        
        {blogResult && (
          <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '4px', fontSize: '0.8rem', border: '1px solid var(--glass-border)' }}>
            {blogResult.success ? `✅ Created: ${blogResult.post?.title}` : `❌ Error: ${blogResult.error}`}
          </div>
        )}
      </div>
    </div>
  );
}
