'use client';

import { Trash2, RefreshCcw } from 'lucide-react';
import { restoreBlogPost, permanentlyDeleteBlogPost, emptyTrash } from '@/app/admin/blog/actions';

export function EmptyTrashButton() {
  return (
    <button 
      className="btn btn-outline" 
      style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ff4444', borderColor: 'rgba(255, 68, 68, 0.4)' }}
      onClick={async () => {
        if (confirm('Are you sure you want to permanently delete ALL items in the trash? This cannot be undone.')) {
          await emptyTrash();
        }
      }}
    >
      <Trash2 size={20} />
      <span>Empty Trash</span>
    </button>
  );
}

export function RestoreButton({ id }: { id: string }) {
  return (
    <button 
      style={{ background: 'none', border: 'none', color: '#4ade80', opacity: 0.8, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, fontSize: '0.85rem' }} 
      onClick={async () => {
        await restoreBlogPost(id);
      }}
    >
      <RefreshCcw size={18} />
      Restore
    </button>
  );
}

export function PermanentDeleteButton({ id }: { id: string }) {
  return (
    <button 
      style={{ background: 'none', border: 'none', color: '#ff4444', opacity: 0.8, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, fontSize: '0.85rem' }} 
      onClick={async () => {
        if (confirm('Are you sure you want to permanently delete this post? This cannot be undone.')) {
          await permanentlyDeleteBlogPost(id);
        }
      }}
    >
      <Trash2 size={18} />
      Delete Permanently
    </button>
  );
}
