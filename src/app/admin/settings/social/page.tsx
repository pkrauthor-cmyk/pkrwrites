'use client';

import { useState, useEffect } from 'react';
import { updateSetting } from '../actions';
import { 
  Plus, Trash2, Save, MoveUp, MoveDown, Eye, EyeOff, 
  Users, Share2, Briefcase, Camera, Video, ShoppingBag, Globe, Mail, Link as LinkIcon
} from 'lucide-react';
import { BrandIcons } from '@/lib/icons';

interface SocialLink {
  name: string;
  href: string;
  icon: string;
  visible: boolean;
}

const AVAILABLE_ICONS: Record<string, any> = {
  Facebook: BrandIcons.Facebook,
  Twitter: BrandIcons.Twitter,
  Instagram: BrandIcons.Instagram,
  Youtube: BrandIcons.Youtube,
  Linkedin: BrandIcons.Linkedin,
  Github: BrandIcons.Github,
  Amazon: BrandIcons.Amazon,
  ShoppingBag,
  Globe,
  Mail,
  LinkIcon,
  Users,
  Share2,
  Briefcase,
  Camera,
  Video
};

const IconPreview = ({ name, size = 18 }: { name: string; size?: number }) => {
  const IconComponent = AVAILABLE_ICONS[name] || LinkIcon;
  return <IconComponent size={size} />;
};

export default function SocialSettingsPage() {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadSocialLinks() {
      try {
        const res = await fetch('/api/settings/social');
        if (res.ok) {
          const linksData = await res.json();
          setSocialLinks(linksData.links || []);
        } else {
          // Default links if none exist
          setSocialLinks([
            { name: 'Amazon Store', href: 'https://www.amazon.com/author/pk_r', icon: 'ShoppingBag', visible: true },
            { name: 'Twitter / X', href: '#', icon: 'Share2', visible: true },
            { name: 'LinkedIn', href: '#', icon: 'Briefcase', visible: true },
          ]);
        }
      } catch (e) {
        console.error('Failed to load social links');
      } finally {
        setLoading(false);
      }
    }
    loadSocialLinks();
  }, []);

  async function handleSave() {
    setSaving(true);
    try {
      await updateSetting('social_links', JSON.stringify(socialLinks));
      alert('Social links saved successfully!');
    } catch (error) {
      console.error('Failed to save social links:', error);
      alert('Failed to save changes. Please check if the server is running correctly.');
    } finally {
      setSaving(false);
    }
  }

  const addItem = () => setSocialLinks(prev => [...prev, { name: 'New Link', href: 'https://', icon: 'Globe', visible: true }]);
  
  const removeItem = (index: number) => setSocialLinks(prev => prev.filter((_, i) => i !== index));
  
  const updateItem = (index: number, field: keyof SocialLink, value: any) => {
    setSocialLinks(prev => {
      const newItems = [...prev];
      newItems[index] = { ...newItems[index], [field]: value };
      return newItems;
    });
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    setSocialLinks(prev => {
      const newItems = [...prev];
      const target = direction === 'up' ? index - 1 : index + 1;
      if (target >= 0 && target < prev.length) {
        [newItems[index], newItems[target]] = [newItems[target], newItems[index]];
      }
      return newItems;
    });
  };

  if (loading) return <div>Loading social links...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', fontFamily: 'var(--font-playfair)' }}>Social Media Links</h1>
          <p style={{ color: 'var(--text-muted)' }}>Manage your social media presence and icons in the website footer.</p>
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

      <div className="glass-card" style={{ padding: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.4rem', color: 'var(--primary)' }}>Connect Section Links</h2>
          <button onClick={addItem} className="btn btn-outline" style={{ padding: '0.6rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Plus size={16} /> Add Link
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {socialLinks.map((item, index) => (
            <div key={index} style={{ 
              display: 'flex', 
              gap: '1rem', 
              alignItems: 'center', 
              background: 'rgba(255, 255, 255, 0.03)', 
              padding: '1.2rem', 
              borderRadius: '12px',
              border: '1px solid var(--glass-border)',
              opacity: item.visible ? 1 : 0.6,
              transition: 'opacity 0.3s'
            }}>
              <div style={{ 
                width: '50px', 
                height: '50px', 
                background: 'rgba(212, 175, 55, 0.1)', 
                borderRadius: '8px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: 'var(--primary)',
                flexShrink: 0
              }}>
                <IconPreview name={item.icon} size={24} />
              </div>

              <div style={{ flex: 1.5 }}>
                <label style={{ display: 'block', fontSize: '0.7rem', opacity: 0.5, marginBottom: '0.3rem', letterSpacing: '0.05em' }}>PLATFORM NAME</label>
                <input 
                  value={item.name} 
                  onChange={(e) => updateItem(index, 'name', e.target.value)}
                  placeholder="e.g. Instagram"
                  style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(212, 175, 55, 0.2)', color: 'white', padding: '0.5rem 0', outline: 'none', fontSize: '1.1rem' }}
                />
              </div>

              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '0.7rem', opacity: 0.5, marginBottom: '0.3rem', letterSpacing: '0.05em' }}>ICON</label>
                <select 
                  value={item.icon} 
                  onChange={(e) => updateItem(index, 'icon', e.target.value)}
                  style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(212, 175, 55, 0.2)', color: 'white', padding: '0.5rem', borderRadius: '4px', outline: 'none' }}
                >
                  {Object.keys(AVAILABLE_ICONS).map(iconName => (
                    <option key={iconName} value={iconName} style={{ background: '#1a1a1a' }}>{iconName}</option>
                  ))}
                </select>
              </div>

              <div style={{ flex: 2 }}>
                <label style={{ display: 'block', fontSize: '0.7rem', opacity: 0.5, marginBottom: '0.3rem', letterSpacing: '0.05em' }}>LINK (URL)</label>
                <input 
                  value={item.href} 
                  onChange={(e) => updateItem(index, 'href', e.target.value)}
                  placeholder="https://..."
                  style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(212, 175, 55, 0.2)', color: 'white', padding: '0.5rem 0', outline: 'none' }}
                />
              </div>
              
              <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                <button 
                  onClick={() => updateItem(index, 'visible', !item.visible)} 
                  title={item.visible ? 'Hide from Website' : 'Show on Website'}
                  style={{ 
                    padding: '0.6rem', 
                    background: item.visible ? 'rgba(212, 175, 55, 0.1)' : 'rgba(255,255,255,0.05)', 
                    border: 'none', 
                    borderRadius: '8px',
                    color: item.visible ? 'var(--primary)' : 'var(--text-muted)', 
                    cursor: 'pointer' 
                  }}
                >
                  {item.visible ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>

                <div style={{ display: 'flex', gap: '0.4rem', borderLeft: '1px solid var(--glass-border)', paddingLeft: '0.8rem' }}>
                  <button onClick={() => moveItem(index, 'up')} disabled={index === 0} style={{ padding: '0.5rem', background: 'none', border: 'none', color: 'white', opacity: index === 0 ? 0.2 : 0.6, cursor: index === 0 ? 'default' : 'pointer' }}><MoveUp size={18} /></button>
                  <button onClick={() => moveItem(index, 'down')} disabled={index === socialLinks.length - 1} style={{ padding: '0.5rem', background: 'none', border: 'none', color: 'white', opacity: index === socialLinks.length - 1 ? 0.2 : 0.6, cursor: index === socialLinks.length - 1 ? 'default' : 'pointer' }}><MoveDown size={18} /></button>
                </div>

                <button 
                  onClick={() => removeItem(index)} 
                  style={{ 
                    padding: '0.6rem', 
                    background: 'rgba(255, 68, 68, 0.1)', 
                    border: 'none', 
                    borderRadius: '8px',
                    color: '#ff4444', 
                    cursor: 'pointer' 
                  }}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}

          {socialLinks.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px dashed var(--glass-border)' }}>
              <p style={{ color: 'var(--text-muted)' }}>No social links added yet. Click "Add Link" to get started.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
