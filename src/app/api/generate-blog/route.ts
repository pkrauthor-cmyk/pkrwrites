import { NextResponse } from 'next/server';
import { generateBlogPost } from '@/lib/blog-generator';
import { prisma } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { keyword } = await req.json();

    // 🔥 Generate blog
    const result = await generateBlogPost(keyword);

    const blog = result?.post;

    // ✅ SAFETY CHECK (FIXES ERROR)
    if (!blog) {
      return NextResponse.json(
        { success: false, error: 'Blog generation failed' },
        { status: 500 }
      );
    }

    // 🔥 Save to DB
    const savedPost = await prisma.blogPost.create({
      data: {
        title: blog.title,
        content: blog.content,
        excerpt: blog.excerpt || '',
        imageUrl: blog.imageUrl || '',
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

// Optional GET
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

    const savedPost = await prisma.blogPost.create({
      data: {
        title: blog.title,
        content: blog.content,
        excerpt: blog.excerpt || '',
        imageUrl: blog.imageUrl || '',
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