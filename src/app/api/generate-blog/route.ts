import { NextResponse } from 'next/server';
import { generateBlogPost } from '@/lib/blog-generator';
import { prisma } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { keyword } = await req.json();

    // 🔥 Step 1: Generate blog
    const result = await generateBlogPost(keyword);

    // 🔥 Step 2: Save to DB (VERY IMPORTANT)
    const savedPost = await prisma.blogPost.create({
      data: {
        title: result.title,
        content: result.content,
        excerpt: result.excerpt || '',
        imageUrl: result.imageUrl || '',
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

// Optional GET (test route)
export async function GET() {
  try {
    const result = await generateBlogPost();

    const savedPost = await prisma.blogPost.create({
      data: {
        title: result.title,
        content: result.content,
        excerpt: result.excerpt || '',
        imageUrl: result.imageUrl || '',
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