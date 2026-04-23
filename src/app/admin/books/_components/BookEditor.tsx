'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveBook } from '../actions';
import { ArrowLeft, Save, Book as BookIcon } from 'lucide-react';
import Link from 'next/link';

interface BookEditorProps {
  initialData?: {
    id?: string;
    asin: string;
    title: string;
    author: string;
    coverUrl?: string;
    amznLink?: string;
    description?: string;
    price?: string;
  };
}

export default function BookEditor({ initialData }: BookEditorProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    id: initialData?.id || '',
    asin: initialData?.asin || '',
    title: initialData?.title || '',
    author: initialData?.author || 'PK R',
    coverUrl: initialData?.coverUrl || '',
    amznLink: initialData?.amznLink || '',
    description: initialData?.description || '',
    price: initialData?.price || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const result = await saveBook(formData);
      if (result.success) {
        router.push('/admin/books');
        router.refresh();
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error: any) {
      alert(`Error saving book: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fade-in">
      <div style={{ marginBottom: '2rem' }}>
        <Link href="/admin/books" className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
          <ArrowLeft size={18} />
          <span>BACK TO LIBRARY</span>
        </Link>
        <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-playfair)' }}>
          {initialData?.id ? 'Edit Book' : 'Add New Book'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="glass-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '0.5rem', opacity: 0.8 }}>Book Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="glass-input"
              style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white' }}
            />
          </div>
          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '0.5rem', opacity: 0.8 }}>ASIN (Amazon ID)</label>
            <input
              type="text"
              name="asin"
              value={formData.asin}
              onChange={handleChange}
              required
              className="glass-input"
              style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white' }}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '0.5rem', opacity: 0.8 }}>Author Name</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
              className="glass-input"
              style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white' }}
            />
          </div>
          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '0.5rem', opacity: 0.8 }}>Price (e.g. $12.99)</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="glass-input"
              style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white' }}
            />
          </div>
        </div>

        <div className="form-group">
          <label style={{ display: 'block', marginBottom: '0.5rem', opacity: 0.8 }}>Cover Image URL</label>
          <input
            type="url"
            name="coverUrl"
            value={formData.coverUrl}
            onChange={handleChange}
            className="glass-input"
            placeholder="https://..."
            style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white' }}
          />
        </div>

        <div className="form-group">
          <label style={{ display: 'block', marginBottom: '0.5rem', opacity: 0.8 }}>Amazon Link</label>
          <input
            type="url"
            name="amznLink"
            value={formData.amznLink}
            onChange={handleChange}
            className="glass-input"
            placeholder="https://www.amazon.com/dp/..."
            style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white' }}
          />
        </div>

        <div className="form-group">
          <label style={{ display: 'block', marginBottom: '0.5rem', opacity: 0.8 }}>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            className="glass-input"
            style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white', resize: 'vertical' }}
          />
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className="btn btn-primary"
          style={{ padding: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginTop: '1rem' }}
        >
          <Save size={20} />
          <span>{isSaving ? 'SAVING...' : 'SAVE BOOK'}</span>
        </button>
      </form>
    </div>
  );
}
