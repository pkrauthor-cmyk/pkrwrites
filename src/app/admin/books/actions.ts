'use server';

import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { syncBooks as runAmazonSync } from '@/lib/scraper';

export async function syncBooks() {
  const result = await runAmazonSync();
  
  revalidatePath('/admin/books');
  revalidatePath('/books');
  revalidatePath('/');
  
  return result;
}

export async function saveBook(data: any) {
  try {
    const { id, ...bookData } = data;
    
    if (id) {
      // Update
      await prisma.book.update({
        where: { id },
        data: {
          ...bookData,
          updatedAt: new Date()
        },
      });
    } else {
      // Create
      await prisma.book.create({
        data: {
          ...bookData,
          updatedAt: new Date()
        },
      });
    }

    revalidatePath('/admin/books');
    revalidatePath('/books');
    revalidatePath('/');
    
    return { success: true };
  } catch (error: any) {
    console.error('Save Book Error:', error);
    return { success: false, error: error.message || 'Failed to save book' };
  }
}

export async function deleteBook(id: string) {
  await prisma.book.delete({
    where: { id },
  });

  revalidatePath('/admin/books');
  revalidatePath('/books');
  revalidatePath('/');
}

export async function toggleBookFeatured(id: string, isFeatured: boolean) {
  await prisma.book.update({
    where: { id },
    data: { isFeatured: !isFeatured },
  });

  revalidatePath('/admin/books');
  revalidatePath('/books');
  revalidatePath('/');
}
