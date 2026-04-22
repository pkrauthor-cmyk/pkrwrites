import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { prisma } from '@/lib/db';

export const metadata = {
  title: "Terms of Service | PKR Writes",
  description: "Terms of Service for PKR Writes – Guidelines and rules for using our website.",
};

export default async function TermsOfService() {
  let page: any = null;

  try {
    page = await prisma.page.findUnique({
      where: { slug: 'terms' }
    });
  } catch (error) {
    console.error("Terms page DB fetch error:", error);
  }


  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <section style={{ paddingTop: '160px', paddingBottom: '8rem', background: 'var(--bg-dark)', position: 'relative', overflow: 'hidden' }}>
        {/* Background Decorative Element */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '-5%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(197, 160, 89, 0.03) 0%, transparent 70%)',
          filter: 'blur(100px)',
          zIndex: 0,
          pointerEvents: 'none'
        }}></div>

        <div className="container" style={{ maxWidth: '900px', position: 'relative', zIndex: 1 }}>
          <div className="section-title fade-in" style={{ textAlign: 'left', marginBottom: '5rem' }}>
            <h3 style={{ textTransform: 'uppercase', letterSpacing: '0.3em', color: 'var(--primary)', marginBottom: '1.5rem', fontSize: '0.75rem', fontWeight: 700 }}>Legal Agreement</h3>
            <h1 style={{ fontSize: '3.5rem', marginBottom: '2rem', fontWeight: 800 }}>
              {page?.title || 'Terms of Service'}
            </h1>
            <div className="underline" style={{ margin: '0' }}></div>
          </div>

          <div className="fade-in" style={{ fontSize: '1.05rem', lineHeight: '2', color: 'var(--text-muted)', animationDelay: '0.2s' }}>
            {page ? (
              <div 
                className="page-dynamic-content author-style" 
                dangerouslySetInnerHTML={{ __html: page.content }} 
              />
            ) : (
              <>
                <p style={{ marginBottom: '3rem', color: 'white', fontWeight: 700, letterSpacing: '0.05em', fontSize: '0.85rem', textTransform: 'uppercase', opacity: 0.8 }}>
                  Last Updated: April 14, 2026
                </p>

                <h3 style={{ color: 'white', marginTop: '5rem', marginBottom: '2rem', fontSize: '1.6rem', fontWeight: 700, letterSpacing: '-0.01em' }}>1. Acceptance of Terms</h3>
                <p style={{ marginBottom: '1.5rem' }}>
                  By accessing and using <strong style={{ color: 'white' }}>PKR Writes</strong> (the "Website"), you accept and agree to be bound by the terms and provision of this agreement. In addition, when using this Website's particular services, you shall be subject to any posted guidelines or rules applicable to such services.
                </p>
                <p style={{ marginBottom: '3rem' }}>
                  Any participation in this service will constitute acceptance of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>

                <h3 style={{ color: 'white', marginTop: '5rem', marginBottom: '2rem', fontSize: '1.6rem', fontWeight: 700, letterSpacing: '-0.01em' }}>2. Intellectual Property Rights</h3>
                <p style={{ marginBottom: '1.5rem' }}>
                  The Website and its original content, features, and functionality are owned by <strong style={{ color: 'white' }}>PKR</strong> and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
