import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';

import { Metadata } from 'next';

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = await params;
  let page: any = null;

  try {
    // ✅ ALWAYS fetch from DB (FIXED)
    page = await prisma.page.findUnique({ where: { slug } });
  } catch (e) {
    console.log("Metadata DB error:", e);
  }

  if (!page) return { title: 'Page Content | PKR Writes' };

  return {
    title: `${page.title} | PKR Writes`,
  };
}

export default async function DynamicPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  let page: any = null;

  try {
    // ✅ ALWAYS fetch from DB (FIXED)
    page = await prisma.page.findUnique({
      where: { slug }
    });
  } catch (e) {
    console.log("DB error:", e);
  }

  // ✅ Proper notFound handling
  if (!page) {
    notFound();
  }

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <section style={{ paddingTop: '160px', paddingBottom: '8rem', background: 'var(--bg-dark)', position: 'relative', overflow: 'hidden' }}>
        {/* Background Decorative Element */}
        <div style={{
          position: 'absolute',
          top: '15%',
          left: '-5%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.03) 0%, transparent 70%)',
          filter: 'blur(100px)',
          zIndex: 0,
          pointerEvents: 'none'
        }}></div>

        <div className="container" style={{ maxWidth: '900px', position: 'relative', zIndex: 1 }}>
          <div className="section-title fade-in" style={{ textAlign: 'left', marginBottom: '5rem' }}>
            <h1 style={{ fontSize: '3.5rem', marginBottom: '2rem', fontWeight: 800 }}>
              {page.title}
            </h1>
            <div className="underline" style={{ margin: '0' }}></div>
          </div>

          <div className="fade-in" style={{ fontSize: '1.05rem', lineHeight: '2', color: 'var(--text-muted)', animationDelay: '0.2s' }}>
            <div
              className="page-dynamic-content author-style"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}