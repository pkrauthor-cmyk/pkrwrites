'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

// Icons for the toggle
const CodeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
);

const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
);

// Use dynamic import to avoid SSR issues with Quill
const ReactQuill = dynamic(() => import('react-quill-new'), { 
  ssr: false,
  loading: () => <div style={{ minHeight: '400px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }} />
});

const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'font': [] }],
    [{ 'size': ['small', false, 'large', 'huge'] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'script': 'sub' }, { 'script': 'super' }],
    ['blockquote', 'code-block'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'indent': '-1' }, { 'indent': '+1' }],
    [{ 'direction': 'rtl' }],
    [{ 'align': [] }],
    ['link', 'image', 'video'],
    ['clean']
  ],
};

const formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'indent',
  'link', 'image', 'video', 'color', 'background', 'align', 'code-block',
  'script'
];

interface ModernEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
  isCustomHtml?: boolean;
}

export default function ModernEditor({ value, onChange, placeholder, isCustomHtml }: ModernEditorProps) {
  const [isHtmlMode, setIsHtmlMode] = useState(isCustomHtml || false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // If the user toggles isCustomHtml from parent, update the local view mode
  useEffect(() => {
    if (isCustomHtml) setIsHtmlMode(true);
  }, [isCustomHtml]);

  function handleToggle() {
    if (!isHtmlMode && isCustomHtml) {
      setIsHtmlMode(true);
    } else if (isHtmlMode && isCustomHtml) {
      const confirmSwitch = window.confirm(
        "WARNING: This post is in Custom HTML Mode. Switching to Visual View will strip out your <style> tags and complex CSS. Are you sure?"
      );
      if (confirmSwitch) setIsHtmlMode(false);
    } else {
      setIsHtmlMode(!isHtmlMode);
    }
  }

  if (!mounted) {
    return <div style={{ minHeight: '500px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }} />;
  }

  return (
    <div className="modern-editor-container">
      <div className="editor-controls">
        {isCustomHtml && (
          <span style={{ marginRight: 'auto', fontSize: '0.7rem', color: 'var(--primary)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            🔒 CUSTOM HTML MODE ENABLED
          </span>
        )}
        <button 
          type="button" 
          onClick={handleToggle}
          className={`toggle-btn ${isHtmlMode ? 'active' : ''}`}
          title={isHtmlMode ? "Switch to Visual Editor" : "Switch to HTML Editor"}
        >
          {isHtmlMode ? (
            <><EyeIcon /> Visual View</>
          ) : (
            <><CodeIcon /> HTML View</>
          )}
        </button>
      </div>

      <div className={`modern-editor-wrapper ${isHtmlMode ? 'html-mode' : ''}`}>
        {!isHtmlMode ? (
          <ReactQuill
            theme="snow"
            value={value}
            onChange={onChange}
            modules={modules}
            placeholder={placeholder || "Start writing your cosmic story..."}
            style={{ height: '500px', marginBottom: '3rem' }}
          />
        ) : (
          <textarea
            className="html-editor"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Paste or write your raw HTML here..."
          />
        )}
      </div>

      <style jsx global>{`
        .modern-editor-container {
          position: relative;
        }
        .editor-controls {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 0.5rem;
        }
        .toggle-btn {
          cursor: pointer;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--glass-border);
          color: rgba(255, 255, 255, 0.6);
          padding: 0.4rem 0.8rem;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.2s ease;
          text-transform: uppercase;
        }
        .toggle-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }
        .toggle-btn.active {
          color: var(--primary);
          border-color: var(--primary);
          background: rgba(212, 175, 55, 0.1);
        }
        .modern-editor-wrapper {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 8px;
          border: 1px solid var(--glass-border);
          overflow: hidden;
          transition: all 0.3s ease;
        }
        .modern-editor-wrapper.html-mode {
          border-color: rgba(212, 175, 55, 0.3);
        }
        .html-editor {
          width: 100%;
          height: 500px;
          background: #0d1117;
          color: #d1d5db;
          border: none;
          padding: 2rem;
          font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
          font-size: 0.95rem;
          line-height: 1.6;
          outline: none;
          resize: vertical;
        }
        .ql-toolbar.ql-snow {
          border: none !important;
          border-bottom: 1px solid var(--glass-border) !important;
          background: rgba(255, 255, 255, 0.05) !important;
          padding: 1rem !important;
        }
        .ql-container.ql-snow {
          border: none !important;
          font-family: var(--font-inter) !important;
          font-size: 1.1rem !important;
          color: #DDD !important;
        }
        .ql-editor {
          min-height: 400px !important;
          line-height: 1.8 !important;
          padding: 2rem !important;
        }
        .ql-editor.ql-blank::before {
          color: rgba(255, 255, 255, 0.2) !important;
          font-style: normal !important;
          left: 2rem !important;
        }
        .ql-snow .ql-stroke {
          stroke: rgba(255, 255, 255, 0.6) !important;
        }
        .ql-snow .ql-fill {
          fill: rgba(255, 255, 255, 0.6) !important;
        }
        .ql-snow .ql-picker {
          color: rgba(255, 255, 255, 0.6) !important;
        }
        .ql-snow.ql-toolbar button:hover,
        .ql-snow.ql-toolbar button:focus,
        .ql-snow.ql-toolbar button.ql-active,
        .ql-snow.ql-toolbar .ql-picker-label:hover,
        .ql-snow.ql-toolbar .ql-picker-label.ql-active,
        .ql-snow.ql-toolbar .ql-picker-item:hover,
        .ql-snow.ql-toolbar .ql-picker-item.ql-selected {
          color: var(--primary) !important;
        }
        .ql-snow.ql-toolbar button:hover .ql-stroke,
        .ql-snow.ql-toolbar button:focus .ql-stroke,
        .ql-snow.ql-toolbar button.ql-active .ql-stroke,
        .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke,
        .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke,
        .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke,
        .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke {
          stroke: var(--primary) !important;
        }
        .ql-snow .ql-picker-options {
          background-color: var(--bg-darker) !important;
          border-color: var(--glass-border) !important;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5) !important;
        }
        .ql-snow .ql-tooltip {
          background-color: var(--bg-darker) !important;
          border-color: var(--glass-border) !important;
          color: white !important;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5) !important;
          border-radius: 8px !important;
        }
        .ql-snow .ql-tooltip input[type=text] {
          background: rgba(255,255,255,0.05) !important;
          border: 1px solid var(--glass-border) !important;
          color: white !important;
          border-radius: 4px !important;
        }
        .ql-editor h1, .ql-editor h2, .ql-editor h3 {
          color: white !important;
          margin-top: 2rem !important;
        }
        .ql-editor a {
          color: var(--primary) !important;
          text-decoration: underline !important;
        }
      `}</style>
    </div>
  );
}
