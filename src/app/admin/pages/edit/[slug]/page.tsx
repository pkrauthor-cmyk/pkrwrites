import Link from 'next/link';
import { prisma } from '@/lib/db';
import { ChevronLeft } from 'lucide-react';
import PageEditor from '../../_components/PageEditor';
import { notFound } from 'next/navigation';

export default async function EditPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  
  const page = await prisma.page.findUnique({
    where: { slug }
  });

  if (!page) {
    notFound();
  }

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
        <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-playfair)' }}>Edit: {page.title}</h1>
      </div>

      <PageEditor page={page} />
    </section>
  );
}
