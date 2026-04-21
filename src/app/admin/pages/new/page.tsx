import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import PageEditor from '../_components/PageEditor';

export default function NewPage() {
  return (
    <section className="fade-in">
      <div style={{ marginBottom: '3rem' }}>
        <Link 
          href="/admin/pages" 
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            color: 'var(--text-muted)', 
            textDecoration: 'none',
            fontSize: '0.9rem',
            marginBottom: '1rem'
          }}
        >
          <ChevronLeft size={16} />
          <span>Back to Pages</span>
        </Link>
        <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-playfair)' }}>Create New Page</h1>
      </div>

      <PageEditor />
    </section>
  );
}
