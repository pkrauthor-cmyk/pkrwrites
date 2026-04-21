'use server';

import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function updateSetting(key: string, value: string) {
  await prisma.setting.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });

  revalidatePath('/', 'layout');
}

export async function getSetting(key: string, defaultValue: string = '') {
  const setting = await prisma.setting.findUnique({
    where: { key },
  });
  return setting?.value || defaultValue;
}
