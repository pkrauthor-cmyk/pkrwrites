import { NextResponse } from 'next/server';
import { generateBlogPost } from '@/lib/blog-generator';
import { prisma } from '@/lib/db';

// ✅ Helper function to generate slug
function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export async function POST(req: Request) {
  try {
    const { keyword } = await req.json();

    const result = await generateBlogPost(keyword);
    const blog = result?.post;

    if (!blog) {
      return NextResponse.json(
        { success: false, error: 'Blog generation failed' },
        { status: 500 }
      );
    }

    // ✅ Generate slug (FIX)
    const slug = generateSlug(blog.title);

    const savedPost = await prisma.blogPost.create({
      data: {
        title: blog.title,
        slug: slug, // ✅ REQUIRED FIELD FIXED
        content: blog.content,
        excerpt: blog.excerpt || '',
      },
    });

    return NextResponse.json({
      success: true,
      post: savedPost,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, error: 'Failed to generate & save blog' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const result = await generateBlogPost();
    const blog = result?.post;

    if (!blog) {
      return NextResponse.json(
        { success: false, error: 'Blog generation failed' },
        { status: 500 }
      );
    }

    const slug = generateSlug(blog.title);

    const savedPost = await prisma.blogPost.create({
      data: {
        title: blog.title,
        slug: slug,
        content: blog.content,
        excerpt: blog.excerpt || '',
      },
    });

    return NextResponse.json({
      success: true,
      post: savedPost,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, error: 'Failed to generate & save blog' },
      { status: 500 }
    );
  }
}