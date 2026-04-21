import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookCard from '@/components/BookCard';
import { prisma } from '@/lib/db';

// 🚀 VERY IMPORTANT
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Books by PKR – Explore Our Collection",
  description: "Browse the complete collection of books by PKR, covering self-publishing, Amazon KDP, and inspiring knowledge content.",
};

export default async function BooksPage() {
  let books: any[] = [];

  try {
    // ❌ Skip DB on Vercel
    if (!process.env.VERCEL) {
      books = await prisma.book.findMany({
        orderBy: { updatedAt: 'desc' }
      });
    }
  } catch (e) {
    console.log("DB disabled on Vercel");
  }

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <section style={{ paddingTop: '160px', paddingBottom: '8rem', background: 'var(--bg-dark)', position: 'relative', overflow: 'hidden' }}>

        {/* Background */}
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '-5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(142, 111, 62, 0.03) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none'
        }} />

        <div className="container" style={{ position: 'relative' }}>

          {/* Header */}
          <div className="section-title fade-in" style={{ textAlign: 'left', marginBottom: '6rem' }}>
            <h3 style={{ textTransform: 'uppercase', letterSpacing: '0.3rem', color: 'var(--primary)', marginBottom: '1.5rem', fontSize: '0.75rem', fontWeight: 700 }}>
              Complete library
            </h3>

            <h1 style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', marginBottom: '2rem', fontWeight: 800 }}>
              The Collection
            </h1>

            <div className="underline" style={{ margin: '0' }} />

            <p style={{ marginTop: '3.5rem', color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '680px', lineHeight: '1.9' }}>
              Explore every title in the PKR Writes library. From strategic guides on high-impact self-publishing to deep cosmic odysseys into consciousness and the human heart.
            </p>
          </div>

          {/* Books */}
          {books.length > 0 ? (
            <div className="responsive-grid fade-in" style={{
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '4rem',
              animationDelay: '0.2s'
            }}>
              {books.map(book => (
                <BookCard key={book.asin} book={book} />
              ))}
            </div>
          ) : (
            <div className="fade-in" style={{
              textAlign: 'center',
              padding: '12rem 2rem',
              border: '1px solid var(--glass-border)',
              borderRadius: '2px',
              background: 'rgba(255, 255, 255, 0.01)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2.5rem'
            }}>
              <div style={{ fontSize: '3.5rem', opacity: 0.1 }}>📚</div>

              <h3 style={{ fontSize: '1.8rem', color: 'white', letterSpacing: '0.1em', fontWeight: 700 }}>
                Bibliographic Update in Progress
              </h3>

              <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '500px', lineHeight: '1.8' }}>
                Books are not available in production yet. Please check locally.
              </p>

              <a
                href="https://www.amazon.com/author/pk_r"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                VISIT AMAZON PAGE
              </a>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}