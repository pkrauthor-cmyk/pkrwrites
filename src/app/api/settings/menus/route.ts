import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const settings = await prisma.setting.findMany({
    where: {
      key: { in: ['navbar_menu', 'footer_menu'] }
    }
  });

  const header = settings.find(s => s.key === 'navbar_menu')?.value;
  const footer = settings.find(s => s.key === 'footer_menu')?.value;

  return NextResponse.json({
    header: header ? JSON.parse(header) : null,
    footer: footer ? JSON.parse(footer) : null
  });
}
