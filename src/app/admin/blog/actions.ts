'use server';

import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createBlogPost(formData: FormData) {
  const title = formData.get('title') as string;
  const slug = formData.get('slug') as string;
  const content = formData.get('content') as string;
  const excerpt = formData.get('excerpt') as string;
  const category = formData.get('category') as string;
  const status = formData.get('status') as string;

  await prisma.blogPost.create({
    data: {
      title,
      slug,
      content,
      excerpt,
      category,
      status,
      metaTitle: formData.get('metaTitle') as string,
      metaDesc: formData.get('metaDesc') as string,
      relatedBookAsin: formData.get('relatedBookAsin') as string,
      isCustomHtml: formData.get('isCustomHtml') === 'true',
      publishedAt: status === 'published' ? new Date() : null,
    },
  });

  revalidatePath('/blog');
  revalidatePath('/admin/blog');
  redirect('/admin/blog');
}

export async function updateBlogPost(id: string, formData: FormData) {
  const title = formData.get('title') as string;
  const slug = formData.get('slug') as string;
  const content = formData.get('content') as string;
  const excerpt = formData.get('excerpt') as string;
  const category = formData.get('category') as string;
  const status = formData.get('status') as string;

  const currentPost = await prisma.blogPost.findUnique({ where: { id } });

  await prisma.blogPost.update({
    where: { id },
    data: {
      title,
      slug,
      content,
      excerpt,
      category,
      status,
      metaTitle: formData.get('metaTitle') as string,
      metaDesc: formData.get('metaDesc') as string,
      relatedBookAsin: formData.get('relatedBookAsin') as string,
      isCustomHtml: formData.get('isCustomHtml') === 'true',
      publishedAt: status === 'published' && !currentPost?.publishedAt ? new Date() : currentPost?.publishedAt,
    },
  });

  revalidatePath('/blog');
  revalidatePath(`/blog/${slug}`);
  revalidatePath('/admin/blog');
  redirect('/admin/blog');
}

export async function deleteBlogPost(id: string) {
  await prisma.blogPost.update({
    where: { id },
    data: { status: 'trashed' },
  });

  revalidatePath('/blog');
  revalidatePath('/admin/blog');
}

export async function restoreBlogPost(id: string) {
  await prisma.blogPost.update({
    where: { id },
    data: { status: 'draft' },
  });

  revalidatePath('/blog');
  revalidatePath('/admin/blog');
  revalidatePath('/admin/blog/trash');
}

export async function permanentlyDeleteBlogPost(id: string) {
  await prisma.blogPost.delete({
    where: { id },
  });

  revalidatePath('/admin/blog/trash');
}

export async function emptyTrash() {
  await prisma.blogPost.deleteMany({
    where: { status: 'trashed' },
  });

  revalidatePath('/admin/blog/trash');
}

import { polishBlogContent } from '@/lib/ai';

export async function polishBlogContentAction(content: string) {
  try {
    const polished = await polishBlogContent(content);
    return { success: true, content: polished };
  } catch (error: any) {
    console.error('Polish Action Error:', error);
    return { success: false, error: error.message || 'Failed to polish content.' };
  }
}

export async function publishBlogPost(id: string) {
  await prisma.blogPost.update({
    where: { id },
    data: {
      status: 'published',
      publishedAt: new Date(),
    },
  });

  revalidatePath('/blog');
  revalidatePath('/admin/blog');
}
