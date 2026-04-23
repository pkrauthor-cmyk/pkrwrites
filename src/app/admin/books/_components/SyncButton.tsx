'use client';

import { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { syncBooks } from '../actions';

export default function SyncButton() {
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = async () => {
    setIsSyncing(true);
    try {
      const result = await syncBooks();
      if (result.success) {
        alert(`Successfully synced ${result.count} books from Amazon!`);
      } else {
        alert(`Sync failed: ${result.error || 'Amazon is currently blocking the request. Please try again later.'}`);
      }
    } catch (error: any) {
      alert(`An error occurred during sync: ${error.message || 'Unknown error'}`);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <button 
      onClick={handleSync}
      disabled={isSyncing}
      className="btn btn-outline" 
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '0.5rem', 
        cursor: isSyncing ? 'not-allowed' : 'pointer',
        opacity: isSyncing ? 0.7 : 1
      }}
    >
      <RefreshCw size={18} className={isSyncing ? 'animate-spin' : ''} />
      <span>{isSyncing ? 'SYNCING...' : 'RUN SYNC'}</span>
    </button>
  );
}
