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
    const post = await prisma.blogPost.findUnique({
      where: { slug: params.slug },
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


export default async function BlogPostPage({ params }: BlogPostPageProps) {
  let post: any = null;

  try {
    post = await prisma.blogPost.findUnique({
      where: { slug: params.slug },
    });

  } catch (e) {
    console.log("DB disabled on Vercel");
  }

  if (!post) {
    return notFound();
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