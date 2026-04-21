import { NextResponse } from 'next/server';
import { syncBooks } from '@/lib/scraper';

export async function POST() {
  try {
    const result = await syncBooks();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal server error during sync' },
      { status: 500 }
    );
  }
}

// Allow GET for easy testing during development
export async function GET() {
  try {
    const result = await syncBooks();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal server error during sync' },
      { status: 500 }
    );
  }
}
