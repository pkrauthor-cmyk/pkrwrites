import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Metadata } from 'next';

import BookCallout from '@/app/blog/_components/BookCallout';
import ReadingProgress from '@/app/blog/_components/ReadingProgress';
import ScriptExecutor from '@/app/blog/_components/ScriptExecutor';
import SmartNavigationController from '@/app/blog/_components/SmartNavigationController';
import ScrollReveal from '@/app/blog/_components/ScrollReveal';

function sanitizeBlogContent(content: string): string {
  if (!content) return '';
  
  // 1. Extract style tags and specific external font links
  const styleTags = content.match(/<style[^>]*>([\s\S]*?)<\/style>/gi) || [];
  const fontLinks = content.match(/<link[^>]*href=["'][^"']*fonts\.googleapis\.com[^"']*["'][^>]*>/gi) || [];
  
  const preservedHead = [...fontLinks, ...styleTags].join('\n');

  // 2. Try to extract body content if available
  const bodyMatch = content.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  let cleaned = bodyMatch ? bodyMatch[1] : content;

  // 3. Remove structural and meta tags that cause hydration issues or are invalid in a div
  cleaned = cleaned
    .replace(/<!DOCTYPE[^>]*>/gi, '')
    .replace(/<html[^>]*>/gi, '')
    .replace(/<\/html>/gi, '')
    .replace(/<head[^>]*>[\s\S]*?<\/head>/gi, '') 
    .replace(/<head[^>]*>/gi, '')
    .replace(/<\/head>/gi, '')
    .replace(/<body[^>]*>/gi, '')
    .replace(/<\/body>/gi, '')
    .replace(/<meta[^>]*>/gi, '')
    .replace(/<title[^>]*>[\s\S]*?<\/title>/gi, '')
    .replace(/<link[^>]*rel=["'](stylesheet|icon|apple-touch-icon|manifest)["'][^>]*>/gi, '')
    .replace(/^\s*[\r\n]/gm, '') 
    .trim();

  return cleaned + preservedHead;
}

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}


export async function generateStaticParams() {
  const posts = await prisma.blogPost.findMany({
    select: { slug: true },
  });

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug } });
  
  if (!post) return { title: 'Post Not Found' };
  
  return {
    title: post.metaTitle || post.title,
    description: post.metaDesc || post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug } });

  if (!post) notFound();

  // Normalize data to prevent hydration mismatches from trailing whitespace
  post.title = (post.title || '').trim();
  if (post.category) post.category = post.category.trim();
  if (post.metaTitle) post.metaTitle = post.metaTitle.trim();

  // Always sanitize blog content to prevent hydration mismatches from illegal nested tags
  const sanitizedContent = sanitizeBlogContent(post.content);

  // 1. Try to find book by ASIN
  let relatedBook = post.relatedBookAsin 
    ? await prisma.book.findUnique({ where: { asin: post.relatedBookAsin.trim() } })
    : null;

  // 2. Fuzzy Fallback: If no book linked, search by title keywords
  if (!relatedBook) {
    const allBooks = await prisma.book.findMany();
    relatedBook = allBooks.find(book => 
      post.title.toLowerCase().includes(book.title.toLowerCase()) ||
      book.title.toLowerCase().includes(post.title.toLowerCase())
    ) || null;
  }

  // 3. Flagship Fail-Safe: If database is empty or no match, show the flagship title
  if (!relatedBook) {
    relatedBook = {
      id: "flagship-1",
      asin: "B0FY37GJGQ",
      title: "The Final Layer: Unveiling the Human Experience",
      author: "PK R",
      coverUrl: "https://m.media-amazon.com/images/I/61zNjdehc1L.jpg",
      amznLink: "https://www.amazon.com/dp/B0FY37GJGQ",
      description: "A profound exploration into the depths of identity, consciousness, and the hidden structures that define our reality.",
      price: "$12.99",
      createdAt: new Date(),
      updatedAt: new Date()
    } as any;
  }

  const formattedDate = post.publishedAt 
    ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : 'Recently';

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
      {post.isCustomHtml && <div className="grain-overlay" />}
      {!post.isCustomHtml && <ReadingProgress />}
      {!post.isCustomHtml && <Navbar />}

      <article style={{ 
        paddingTop: post.isCustomHtml ? '0' : '160px', 
        paddingBottom: post.isCustomHtml ? '10rem' : '10rem',
        margin: post.isCustomHtml ? '0' : 'inherit',
        background: post.isCustomHtml ? '#050508' : 'transparent',
        backgroundColor: post.isCustomHtml ? '#050508' : 'transparent',
        position: 'relative',
        zIndex: 1
      }}>
        {post.isCustomHtml && <div className="scroll-progress-line" id="blog-progress" />}
        {post.isCustomHtml && (
          <Link href="/blog" className="floating-back-btn" title="Back to Blog">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ order: 1 }}>
              <path d="M19 12H5m7 7-7-7 7-7"/>
            </svg>
            <span style={{ order: 2 }}>BACK TO BLOG</span>
          </Link>
        )}
        <div className={post.isCustomHtml ? "" : "container"} style={post.isCustomHtml ? { width: '100%', maxWidth: 'none' } : { maxWidth: '850px' }}>
          {!post.isCustomHtml && (
            <header style={{ marginBottom: '5rem', textAlign: 'center' }}>
              <div style={{ 
                marginBottom: '1.5rem', 
                color: 'var(--primary)', 
                fontWeight: 700, 
                fontSize: '0.8rem', 
                letterSpacing: '0.4em',
                textTransform: 'uppercase'
              }}>
                {post.category || 'Insights'}
              </div>
              <h1 className="blog-post-title" style={{ 
                fontSize: 'clamp(2.5rem, 7vw, 3.8rem)', 
                marginBottom: '2rem'
              }}>
                {post.title}
              </h1>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.5rem', color: 'var(--text-muted)', fontSize: '0.85rem', letterSpacing: '0.05em' }}>
                <span style={{ color: 'white' }}>By PKR Writes</span>
                <span style={{ fontSize: '0.3rem', opacity: 0.3 }}>●</span>
                <span>{formattedDate}</span>
              </div>
            </header>
          )}

          {!post.isCustomHtml && relatedBook && <BookCallout book={relatedBook as any} />}

          <div className={post.isCustomHtml ? "custom-html-wrapper" : ""}>
            <div className={`blog-content ${post.isCustomHtml ? 'custom-content' : 'author-style'}`}
                 style={!post.isCustomHtml ? { fontSize: '1.15rem', fontFamily: 'var(--font-inter)' } : {}}>
              <div 
                dangerouslySetInnerHTML={{ __html: sanitizedContent }} 
                id="post-content-node" 
                suppressHydrationWarning={true}
              />
            </div>
          </div>

          {post.isCustomHtml && relatedBook && (
            <div className="container" style={{ maxWidth: '850px', marginTop: '4rem' }}>
              <BookCallout book={relatedBook as any} />
            </div>
          )}

          <ScriptExecutor content={sanitizedContent} isEnabled={post.isCustomHtml} />
          {post.isCustomHtml && <SmartNavigationController />}
          {post.isCustomHtml && <ScrollReveal />}
          

          {!post.isCustomHtml && (
            <footer style={{ marginTop: '10rem', paddingTop: '4rem', borderTop: '1px solid var(--glass-border)' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '2rem'
              }}>
                <div>
                  <h4 style={{ color: 'white', marginBottom: '1rem', fontFamily: 'var(--font-playfair)', fontSize: '1.4rem' }}>Share this Article</h4>
                  <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--primary)', fontWeight: 600, fontSize: '0.85rem', letterSpacing: '0.1em' }}>
                    <a href="#">TWITTER</a>
                    <a href="#">LINKEDIN</a>
                    <a href="#">EMAIL</a>
                  </div>
                </div>
                
                <Link href="/blog" className="btn btn-outline" style={{ fontSize: '0.75rem', padding: '0.8rem 2rem' }}>
                  BACK TO INSIGHTS
                </Link>
              </div>
            </footer>
          )}
        </div>
      </article>

      <section style={{ backgroundColor: 'var(--bg-darker)', padding: '8rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h3 style={{ marginBottom: '2rem', fontSize: '2rem' }}>Ready to Take the Next Step?</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '4rem', maxWidth: '600px', margin: '0 auto 4rem auto' }}>
            Empower your writing journey with PKR's latest strategic guides and cosmic insights.
          </p>
          <Link href="/books" className="btn btn-primary">EXPLORE THE COLLECTION</Link>
        </div>
      </section>

      <Footer />

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-html-wrapper {
          width: 100%;
          margin: 0;
          padding: 0;
        }
        .custom-content {
          margin: 0 !important;
          padding: 0 !important;
          max-width: none !important;
          line-height: normal !important;
          width: 100% !important;
          min-height: 100vh;
          display: block;
        }
        /* Recursive Hero Centering - Targets the first 10 elements to ensure everything in the "fold" is centered */
        .custom-content > *:nth-child(-n+10),
        .custom-content > *:nth-child(-n+10) * {
          text-align: center !important;
          margin-left: auto !important;
          margin-right: auto !important;
        }
        .custom-content .hero-title, .custom-content h1:first-of-type, .custom-content .site-title {
          text-shadow: 0 0 60px rgba(212, 175, 55, 0.4);
          letter-spacing: 0.15em;
          margin-bottom: 2rem !important;
          font-weight: 800;
          display: block !important;
        }
        .custom-content .hero-subtitle, .custom-content .tagline, .custom-content p:nth-child(-n+10) {
          max-width: 850px;
          margin-bottom: 2.5rem !important;
          text-align: center !important;
        }
        .custom-content .hero-subtitle, .custom-content .tagline {
           color: var(--primary) !important;
           font-style: italic;
           font-size: 1.25rem;
           opacity: 0.95;
        }
        /* Restore original property isolation with premium line-height */
        .custom-content h1, .custom-content h2, .custom-content h3 {
          font-family: inherit;
          font-size: inherit;
          color: inherit;
          margin: inherit;
          line-height: 1.3;
          letter-spacing: inherit;
        }
        .custom-content p {
          color: inherit;
          font-family: inherit;
          margin: inherit;
          line-height: 1.95;
        }
        .custom-content * {
          box-sizing: border-box !important;
        }
        .custom-content {
          --blog-max-width: none;
        }
        /* --- EDITORIAL TYPOGRAPHY & BEAUTIFICATION --- */
        
        .custom-content {
          font-variant-numeric: oldstyle-nums;
          font-kerning: normal;
        }

        /* Serif Headings */
        .custom-content h1, 
        .custom-content h2, 
        .custom-content h3,
        .custom-content .hero-title,
        .custom-content .section-title {
          font-family: 'Playfair Display', serif !important;
          font-weight: 700 !important;
          letter-spacing: -0.01em !important;
          color: white !important;
        }

        /* Drop Caps - Targets the very first paragraph and any paragraph immediately following an H2 */
        .custom-content > p:first-of-type::first-letter,
        .custom-content h2 + p::first-letter {
          font-family: 'Playfair Display', serif;
          float: left;
          font-size: 4.8rem;
          line-height: 1;
          margin: 0.2rem 0.8rem 0 0;
          color: var(--primary);
          font-weight: 800;
          text-shadow: 0 0 20px rgba(212, 175, 55, 0.3);
        }

        /* Character Spotlight Cards - Detects patterns like "Name (Role): Description" in LI or P */
        .custom-content li:has(strong:first-child),
        .custom-content p:has(b:first-child), 
        .custom-content p:has(strong:first-child) {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(212, 175, 55, 0.1);
          padding: 2.5rem;
          border-radius: 12px;
          margin: 2rem auto !important;
          max-width: 800px;
          position: relative;
          transition: all 0.4s ease;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          list-style: none; /* Turn off bullets for cards */
          display: block;
        }

        .custom-content li:has(strong:first-child):hover,
        .custom-content p:has(b:first-child):hover {
          background: rgba(212, 175, 55, 0.04);
          border-color: rgba(212, 175, 55, 0.3);
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }

        /* Style the Label inside our card */
        .custom-content p b:first-child, 
        .custom-content p strong:first-child,
        .custom-content li strong:first-child {
          display: block;
          font-family: 'Playfair Display', serif;
          font-size: 1.4rem;
          color: var(--primary);
          margin-bottom: 0.8rem;
          letter-spacing: 0.02em;
        }

        /* Premium Pull Quotes */
        .custom-content blockquote, 
        .custom-content p:has(em):not(:has(b)) {
           /* Targeting paragraphs with italics as potential pull quotes if they are short */
           /* This is a heuristic - it can be more specific if we had classes */
        }
        
        /* Specialized Pull Quote Styling */
        .custom-content blockquote, .pull-quote {
          font-family: 'Playfair Display', serif;
          font-size: 1.8rem;
          font-style: italic;
          color: #DDD;
          text-align: center;
          margin: 6rem auto !important;
          padding: 0 4rem;
          position: relative;
          max-width: 850px;
          line-height: 1.5;
          border-left: none; /* Override default */
        }

        .custom-content blockquote::before, .custom-content blockquote::after {
          content: '"';
          font-size: 6rem;
          color: var(--primary);
          position: absolute;
          opacity: 0.2;
          font-family: 'Playfair Display', serif;
        }

        .custom-content blockquote::before {
          top: -2rem;
          left: 0;
        }

        .custom-content blockquote::after {
          bottom: -4rem;
          right: 0;
        }

        /* Star-Dust Divider */
        .custom-content hr {
          position: relative;
          border: none;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(212, 175, 55, 0.6), transparent);
          margin: 6rem auto;
          overflow: visible;
        }

        .custom-content hr::before {
          content: '✦';
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          color: var(--primary);
          background: #050508;
          padding: 0 1.5rem;
          font-size: 1rem;
          text-shadow: 0 0 10px var(--primary-glow);
        }

        /* Adjusted Hero Spacing */
        .custom-content .hero-title, .custom-content h1:first-of-type {
          font-size: clamp(3rem, 10vw, 5.5rem) !important;
          margin-bottom: 3.5rem !important;
          line-height: 1.1 !important;
        }

        /* Body Refinement */
        .custom-content p {
          font-size: 1.15rem;
          letter-spacing: 0.01em;
          margin-bottom: 2.2rem !important;
          color: rgba(255, 255, 255, 0.85);
        }

        .custom-content b, .custom-content strong {
          color: white;
        }

        /* Hover effects for images */
        .custom-content img {
          border-radius: 8px;
          transition: all 0.6s var(--ease-premium);
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .custom-content img:hover {
          transform: scale(1.02);
          box-shadow: 0 30px 60px rgba(0,0,0,0.7);
          border-color: rgba(212, 175, 55, 0.2);
        }

        /* Floating Progress Line */
        .scroll-progress-line {
          height: 3px !important;
          background: linear-gradient(90deg, #D4AF37, #FFFFFF, #D4AF37) !important;
        }

        .floating-back-btn {
          position: fixed;
          bottom: 3rem;
          right: 3rem;
          z-index: 10000;
          height: 56px;
          min-width: 56px;
          padding: 0 1.2rem;
          background: rgba(10, 10, 10, 0.4);
          backdrop-filter: blur(25px) saturate(200%);
          -webkit-backdrop-filter: blur(25px) saturate(200%);
          border: 1px solid rgba(212, 175, 55, 0.3);
          border-radius: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          color: var(--primary);
          transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
          box-shadow: 0 15px 45px rgba(0, 0, 0, 0.5), inset 0 0 10px rgba(212, 175, 55, 0.05);
          overflow: hidden;
          text-decoration: none;
        }

        .floating-back-btn span {
          display: block;
          white-space: nowrap;
          opacity: 0;
          width: 0;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
          font-weight: 800;
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }

        .floating-back-btn:hover {
          gap: 1rem;
          background: rgba(212, 175, 55, 0.15);
          border-color: rgba(212, 175, 55, 0.6);
          transform: translateY(-8px) scale(1.05);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(212, 175, 55, 0.2);
          padding: 0 2.2rem;
        }

        .floating-back-btn:hover span {
          opacity: 1;
          width: 130px;
        }

        .floating-back-btn.hidden {
          opacity: 0;
          transform: translateY(100px) scale(0.8);
          pointer-events: none;
        }
        /* Scroll Reveal Animations */
        @keyframes fadeInUp {
          from { 
            opacity: 0; 
            transform: translateY(30px) scale(0.98); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
        .reveal-on-scroll {
          opacity: 0;
          will-change: transform, opacity;
        }
        .reveal-on-scroll.visible {
          animation: fadeInUp 1.2s var(--ease-premium) forwards;
        }
        @media (max-width: 768px) {
          .floating-back-btn {
            bottom: 2rem;
            right: 1.5rem;
            height: 48px;
            min-width: 48px;
          }
          .floating-back-btn:hover span {
            width: 110px;
          }
          
          /* Responsive Drop Cap */
          .custom-content > p:first-of-type::first-letter,
          .custom-content h2 + p::first-letter {
            font-size: 3.2rem !important;
            margin: 0.1rem 0.6rem 0 0 !important;
          }
          
          .custom-content li:has(strong:first-child),
          .custom-content p:has(b:first-child) {
            padding: 1.5rem !important;
            margin: 2rem 1rem !important;
            font-size: 1.05rem;
          }

          .custom-content blockquote {
            font-size: 1.4rem;
            padding: 0 1.5rem;
          }
        }
      `}} />
    </main>
  );
}

