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

// 🚀 FIXED: Prevent Vercel build crash
export async function generateStaticParams() {
  if (process.env.VERCEL) {
    return [];
  }

  const posts = await prisma.blogPost.findMany({
    select: { slug: true },
  });

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// 🚀 SAFE metadata
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  try {
    if (process.env.VERCEL) {
      return { title: "Blog | PKR Writes" };
    }

    const post = await prisma.blogPost.findUnique({
      where: { slug: params.slug },
    });

    if (!post) return { title: 'Post Not Found' };

    return {
      title: post.metaTitle || post.title,
      description: post.metaDesc || post.excerpt,
    };
  } catch {
    return { title: "Blog" };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  let post: any = null;

  try {
    if (!process.env.VERCEL) {
      post = await prisma.blogPost.findUnique({
        where: { slug: params.slug },
      });
    }
  } catch (e) {
    console.log("DB disabled on Vercel");
  }

  if (!post) {
    return (
      <main style={{ padding: "5rem", textAlign: "center" }}>
        <h1>Content unavailable</h1>
        <p>This page is not accessible in production yet.</p>
        <Link href="/blog">Back to Blog</Link>
      </main>
    );
  }

  const sanitizedContent = sanitizeBlogContent(post.content);

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <article style={{ paddingTop: '120px', paddingBottom: '6rem' }}>
        <div className="container" style={{ maxWidth: '850px' }}>
          <h1 style={{ marginBottom: '2rem' }}>{post.title}</h1>

          <div
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          />
        </div>
      </article>

      <Footer />
    </main>
  );
}