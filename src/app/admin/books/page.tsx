import Link from 'next/link';
import { prisma } from '@/lib/db';
import { Trash2, Star, ExternalLink, RefreshCw } from 'lucide-react';
import { deleteBook, toggleBookFeatured, syncBooks } from './actions';
import SyncButton from './_components/SyncButton';

export const dynamic = 'force-dynamic';

export default async function BooksListPage() {
  let books: any[] = [];
  let fetchError: string | null = null;

  try {
    books = await prisma.book.findMany({
      orderBy: { updatedAt: 'desc' }
    });
  } catch (error: any) {
    console.error("Failed to fetch books:", error);
    fetchError = error.message || "Unknown database error";
  }

  return (
    <section className="fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', fontFamily: 'var(--font-playfair)' }}>Books Library</h1>
          <p style={{ color: 'var(--text-muted)' }}>Manage your synchronized Amazon book catalog.</p>
        </div>
        <SyncButton />
      </div>

      <div className="glass-card" style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.02)' }}>
              <th style={{ padding: '1.5rem 2rem', fontSize: '0.8rem', opacity: 0.6 }}>COVER / TITLE</th>
              <th style={{ padding: '1.5rem 2rem', fontSize: '0.8rem', opacity: 0.6 }}>ASIN</th>
              <th style={{ padding: '1.5rem 2rem', fontSize: '0.8rem', opacity: 0.6 }}>PRICE</th>
              <th style={{ padding: '1.5rem 2rem', fontSize: '0.8rem', opacity: 0.6, textAlign: 'right' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {fetchError ? (
              <tr>
                <td colSpan={4} style={{ padding: '4rem', textAlign: 'center', color: '#ff4444' }}>
                  <div style={{ marginBottom: '1rem', fontWeight: 'bold' }}>Database Error:</div>
                  <div style={{ opacity: 0.8, fontSize: '0.9rem' }}>{fetchError}</div>
                </td>
              </tr>
            ) : books.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No books found. Run a sync to fetch them from Amazon.
                </td>
              </tr>
            ) : (
              books.map((book) => (
                <tr key={book.id} style={{ borderBottom: '1px solid var(--glass-border)', background: book.isFeatured ? 'rgba(212, 175, 55, 0.03)' : 'transparent' }}>
                  <td style={{ padding: '1.5rem 2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                      <img src={book.coverUrl || ''} alt={book.title} style={{ width: '40px', height: '60px', borderRadius: '4px', objectFit: 'cover' }} />
                      <div>
                        <div style={{ fontWeight: 600, color: 'white' }}>{book.title}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>By {book.author}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '1.5rem 2rem' }}>
                    <code style={{ color: 'var(--primary)', fontSize: '0.85rem' }}>{book.asin}</code>
                  </td>
                  <td style={{ padding: '1.5rem 2rem', fontSize: '0.9rem', color: 'white' }}>
                    {book.price || 'N/A'}
                  </td>
                  <td style={{ padding: '1.5rem 2rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                      <a 
                        href={book.amznLink || '#'} 
                        target="_blank"
                        style={{ padding: '0.6rem', color: 'var(--text-muted)' }} 
                        title="View on Amazon"
                      >
                        <ExternalLink size={18} />
                      </a>
                      
                      <form action={toggleBookFeatured.bind(null, book.id, book.isFeatured)}>
                        <button 
                          style={{ 
                            padding: '0.6rem', 
                            background: 'none', 
                            border: 'none', 
                            color: book.isFeatured ? 'var(--primary)' : 'rgba(255,255,255,0.2)',
                            cursor: 'pointer' 
                          }}
                          title={book.isFeatured ? "Unfeature" : "Feature"}
                        >
                          <Star size={18} fill={book.isFeatured ? 'currentColor' : 'none'} />
                        </button>
                      </form>

                      <form action={deleteBook.bind(null, book.id)}>
                        <button 
                          style={{ padding: '0.6rem', background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer' }}
                          title="Remove Book"
                        >
                          <Trash2 size={18} />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
