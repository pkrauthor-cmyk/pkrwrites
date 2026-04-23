import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';
import BookEditor from '../../_components/BookEditor';

export const dynamic = 'force-dynamic';

interface EditBookPageProps {
  params: { id: string };
}

export default async function EditBookPage({ params }: EditBookPageProps) {
  const { id } = await params;
  const book = await prisma.book.findUnique({
    where: { id }
  });

  if (!book) {
    notFound();
  }

  return <BookEditor initialData={book} />;
}
