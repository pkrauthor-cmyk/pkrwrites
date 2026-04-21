import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const setting = await prisma.setting.findUnique({
      where: { key: 'social_links' }
    });

    return NextResponse.json({
      links: setting ? JSON.parse(setting.value) : []
    });
  } catch (error) {
    return NextResponse.json({ links: [] });
  }
}
