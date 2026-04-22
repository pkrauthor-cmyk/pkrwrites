import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { prisma } from '@/lib/db';

export const metadata = {
  title: "Privacy Policy | PKR Writes",
  description: "Privacy Policy for PKR Writes – Understanding how we protect and manage your data.",
};

export default async function PrivacyPolicy() {
  let page: any = null;

  page = await prisma.page.findUnique({
    where: { slug: 'privacy' }
  });


  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <section style={{ paddingTop: '160px', paddingBottom: '8rem', background: 'var(--bg-dark)', position: 'relative', overflow: 'hidden' }}>
        {/* Background Decorative Element */}
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '-5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(142, 111, 62, 0.03) 0%, transparent 70%)',
          filter: 'blur(100px)',
          zIndex: 0,
          pointerEvents: 'none'
        }}></div>

        <div className="container" style={{ maxWidth: '900px', position: 'relative', zIndex: 1 }}>
          <div className="section-title fade-in" style={{ textAlign: 'left', marginBottom: '5rem' }}>
            <h3 style={{ textTransform: 'uppercase', letterSpacing: '0.3em', color: 'var(--primary)', marginBottom: '1.5rem', fontSize: '0.75rem', fontWeight: 700 }}>Legal Framework</h3>
            <h1 style={{ fontSize: '3.5rem', marginBottom: '2rem', fontWeight: 800 }}>
              {page?.title || 'Privacy Policy'}
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

                <p style={{ marginBottom: '2.5rem' }}>
                  At <strong style={{ color: 'white' }}>PKR Writes</strong>, we respect your privacy and are committed to protecting it through our compliance with this policy. This Privacy Policy describes the types of information we may collect from you or that you may provide when you visit the website <strong style={{ color: 'white' }}>pkrwrites.com</strong> (our "Website") and our practices for collecting, using, maintaining, protecting, and disclosing that information.
                </p>

                <h3 style={{ color: 'white', marginTop: '5rem', marginBottom: '2rem', fontSize: '1.6rem', fontWeight: 700, letterSpacing: '-0.01em' }}>1. Information We Collect</h3>
                <p style={{ marginBottom: '2rem' }}>
                  We collect several types of information from and about users of our Website, including:
                </p>
                <ul style={{ paddingLeft: '1.5rem', marginBottom: '3rem', borderLeft: '1px solid var(--glass-border)', marginLeft: '0.5rem', listStyle: 'none' }}>
                  <li style={{ marginBottom: '1.5rem' }}><strong style={{ color: 'white', display: 'block', marginBottom: '0.4rem' }}>Personal Identification</strong> Name, email address, and any other information you provide when you contact us or subscribe to our updates.</li>
                  <li style={{ marginBottom: '1.5rem' }}><strong style={{ color: 'white', display: 'block', marginBottom: '0.4rem' }}>Usage Data</strong> Details of your visits to our Website, including traffic data, location data, logs, and other communication data and the resources that you access and use on the Website.</li>
                </ul>
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
