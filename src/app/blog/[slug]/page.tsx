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

// 🚀 IMPORTANT: Prevent static build crash on Vercel
export const dynamic = "force-dynamic";

function sanitizeBlogContent(content: string): string {
  if (!content) return '';
  return content;
}

interface BlogPostPageProps {
  params: { slug: string };
}

// 🚀 SAFE metadata
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const post = await prisma.blogPost.findUnique({
      where: { slug },
    });

    if (!post) return { title: 'Post Not Found' };

    return {
      title: post.metaTitle || post.title,
      description: post.metaDesc || post.excerpt,
    };
  } catch (error) {
    console.error("Metadata generation error:", error);
    return { title: "Blog | PKR Writes" };
  }
}


import BlogStyles from '@/app/blog/_components/BlogStyles';

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  let post: any = null;
  let relatedBook: any = null;

  try {
    const { slug } = await params;
    post = await prisma.blogPost.findUnique({
      where: { slug },
    });

    if (post) {
      const tags = post.tags?.split(',').map((t: string) => t.trim()) || [];
      const postTitle = post.title.toLowerCase();
      
      // 1. Priority: Match by ASIN in tags
      relatedBook = await prisma.book.findFirst({
        where: { asin: { in: tags } }
      });

      // 2. Secondary: Match by Title Keywords in the blog post title
      if (!relatedBook) {
        const books = await prisma.book.findMany();
        relatedBook = books.find(b => 
          postTitle.includes(b.title.toLowerCase()) || 
          b.title.split(' ').some(word => word.length > 4 && postTitle.includes(word.toLowerCase()))
        );
      }

      // 3. Fallback: Featured book
      if (!relatedBook) {
        relatedBook = await prisma.book.findFirst({
          where: { isFeatured: true }
        });
      }
    }
  } catch (e) {
    console.error("DB error in blog post page:", e);
  }

  if (!post) {
    return notFound();
  }

  const sanitizedContent = sanitizeBlogContent(post.content);

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#050505' }}>
      <Navbar />
      <BlogStyles />
      <ReadingProgress />
      <SmartNavigationController />
      <ScrollReveal />
      <ScriptExecutor content={post.content} isEnabled={post.isCustomHtml || false} />

      <article style={{ paddingTop: '160px', paddingBottom: '10rem' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          {/* Editorial Header */}
          <header style={{ marginBottom: '5rem', textAlign: 'center' }}>
            <div style={{ 
              color: 'var(--primary)', 
              fontSize: '0.9rem', 
              letterSpacing: '0.3em', 
              textTransform: 'uppercase', 
              marginBottom: '1.5rem',
              fontWeight: 600 
            }}>
              {post.category} • {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
            <h1 style={{ 
              fontSize: '4.5rem', 
              lineHeight: '1.1', 
              marginBottom: '2.5rem', 
              fontFamily: 'var(--font-playfair)',
              fontWeight: 800,
              letterSpacing: '-0.02em'
            }}>
              {post.title}
            </h1>
            <div className="underline" style={{ width: '80px', height: '3px', background: 'var(--primary)', margin: '0 auto 3rem' }}></div>
            <p style={{ 
              fontSize: '1.4rem', 
              color: 'var(--text-muted)', 
              lineHeight: '1.6', 
              fontStyle: 'italic',
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              {post.excerpt}
            </p>
          </header>

          {/* Main Content Area */}
          <div 
            className="editorial-content author-style"
            style={{ 
              fontSize: '1.15rem', 
              lineHeight: '2.1', 
              color: 'rgba(255,255,255,0.85)',
              marginBottom: '8rem'
            }}
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          />

          {/* Related Book Callout */}
          {relatedBook && (
            <div style={{ marginTop: '6rem', borderTop: '1px solid rgba(212, 175, 55, 0.1)', paddingTop: '6rem' }}>
              <BookCallout book={relatedBook} />
            </div>
          )}

          {/* Back to Blog */}
          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <Link href="/blog" className="btn btn-outline" style={{ padding: '1rem 2.5rem' }}>
              BACK TO STORIES
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}