import { NextResponse } from 'next/server';
import { generateBlogPost } from '@/lib/blog-generator';

export async function POST(req: Request) {
  try {
    const { keyword } = await req.json();
    const result = await generateBlogPost(keyword);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal server error during blog generation' },
      { status: 500 }
    );
  }
}

// Allow GET for easy testing/manual trigger
export async function GET() {
  try {
    const result = await generateBlogPost();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal server error during blog generation' },
      { status: 500 }
    );
  }
}
