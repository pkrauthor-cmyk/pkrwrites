'use client';

import { useState, useEffect } from 'react';
import { updateSetting } from '../actions';
import { Plus, Trash2, Save, MoveUp, MoveDown } from 'lucide-react';

interface MenuItem {
  name: string;
  href: string;
}

export default function MenuSettingsPage() {
  const [headerMenu, setHeaderMenu] = useState<MenuItem[]>([]);
  const [footerMenu, setFooterMenu] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadMenus() {
      try {
        const res = await fetch('/api/settings/menus');
        const data = await res.json();
        
        setHeaderMenu(data.header && data.header.length > 0 ? data.header : [
          { name: 'BOOKS', href: '/books' },
          { name: 'BLOG', href: '/blog' },
          { name: 'ABOUT', href: '/about' },
          { name: 'CONTACT', href: '/contact' },
        ]);
        
        setFooterMenu(data.footer && data.footer.length > 0 ? data.footer : [
          { name: 'Our Books', href: '/books' },
          { name: 'Insights Blog', href: '/blog' },
          { name: 'About the Author', href: '/about' },
          { name: 'Contact', href: '/contact' },
        ]);

      } catch (e) {
        console.error('Failed to load menus');
      } finally {
        setLoading(false);
      }
    }
    loadMenus();
  }, []);

  async function handleSave() {
    setSaving(true);
    await updateSetting('navbar_menu', JSON.stringify(headerMenu));
    await updateSetting('footer_menu', JSON.stringify(footerMenu));
    setSaving(false);
    alert('Menus saved successfully!');
  }

  const MenuEditor = ({ title, items, setItems }: { title: string, items: MenuItem[], setItems: any }) => {
    const addItem = () => setItems([...items, { name: 'NEW LINK', href: '/' }]);
    const removeItem = (index: number) => setItems(items.filter((_, i) => i !== index));
    const updateItem = (index: number, field: keyof MenuItem, value: string) => {
      const newItems = [...items];
      newItems[index][field] = value;
      setItems(newItems);
    };
    const moveItem = (index: number, direction: 'up' | 'down') => {
      const newItems = [...items];
      const target = direction === 'up' ? index - 1 : index + 1;
      if (target >= 0 && target < items.length) {
        [newItems[index], newItems[target]] = [newItems[target], newItems[index]];
        setItems(newItems);
      }
    };

    return (
      <div className="glass-card" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.4rem', color: 'var(--primary)' }}>{title}</h2>
          <button onClick={addItem} className="btn btn-outline" style={{ padding: '0.6rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Plus size={16} /> Add Item
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {items.map((item, index) => (
            <div key={index} style={{ 
              display: 'flex', 
              gap: '1rem', 
              alignItems: 'center', 
              background: 'rgba(255, 255, 255, 0.03)', 
              padding: '1rem', 
              borderRadius: '8px',
              border: '1px solid var(--glass-border)'
            }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '0.7rem', opacity: 0.5, marginBottom: '0.3rem' }}>LABEL</label>
                <input 
                  value={item.name} 
                  onChange={(e) => updateItem(index, 'name', e.target.value)}
                  style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(212, 175, 55, 0.2)', color: 'white', padding: '0.5rem 0', outline: 'none' }}
                />
              </div>
              <div style={{ flex: 2 }}>
                <label style={{ display: 'block', fontSize: '0.7rem', opacity: 0.5, marginBottom: '0.3rem' }}>LINK (URL)</label>
                <input 
                  value={item.href} 
                  onChange={(e) => updateItem(index, 'href', e.target.value)}
                  style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(212, 175, 55, 0.2)', color: 'white', padding: '0.5rem 0', outline: 'none' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => moveItem(index, 'up')} disabled={index === 0} style={{ padding: '0.5rem', background: 'none', border: 'none', color: 'white', opacity: index === 0 ? 0.2 : 0.6, cursor: 'pointer' }}><MoveUp size={18} /></button>
                <button onClick={() => moveItem(index, 'down')} disabled={index === items.length - 1} style={{ padding: '0.5rem', background: 'none', border: 'none', color: 'white', opacity: index === items.length - 1 ? 0.2 : 0.6, cursor: 'pointer' }}><MoveDown size={18} /></button>
                <button onClick={() => removeItem(index)} style={{ padding: '0.5rem', background: 'none', border: 'none', color: '#ff4444', opacity: 0.8, cursor: 'pointer' }}><Trash2 size={18} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (loading) return <div>Loading menu data...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', fontFamily: 'var(--font-playfair)' }}>Menu Management</h1>
          <p style={{ color: 'var(--text-muted)' }}>Customize your site navigation and footer links.</p>
        </div>
        <button 
          onClick={handleSave} 
          disabled={saving}
          className="btn btn-primary" 
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2.5rem' }}
        >
          <Save size={20} />
          <span>{saving ? 'SAVING...' : 'SAVE CHANGES'}</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
        <MenuEditor title="Header Navigation" items={headerMenu} setItems={setHeaderMenu} />
        <MenuEditor title="Footer Quick Links" items={footerMenu} setItems={setFooterMenu} />
      </div>
    </div>
  );
}
