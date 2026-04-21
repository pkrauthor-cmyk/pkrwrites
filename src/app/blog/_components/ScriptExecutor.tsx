'use client';

import { useEffect } from 'react';

/**
 * ScriptExecutor specifically handles extracting and running <script> tags
 * from custom HTML blog content. Moving this logic to a Client Component's 
 * useEffect resolves hydration mismatches and React's script-in-component warning.
 */
interface ScriptExecutorProps {
  content: string;
  isEnabled: boolean;
}

export default function ScriptExecutor({ content, isEnabled }: ScriptExecutorProps) {
  useEffect(() => {
    if (!isEnabled || !content) return;

    // Delay slightly to ensure post-content-node is fully rendered
    const timer = setTimeout(() => {
      try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(content, 'text/html');
        const scripts = doc.querySelectorAll('script');

        let inlineContent = '';
        
        scripts.forEach((oldScript) => {
          if (oldScript.src) {
            // External scripts are handled individually
            const newScript = document.createElement('script');
            Array.from(oldScript.attributes).forEach((attr) => {
              newScript.setAttribute(attr.name, attr.value);
            });
            newScript.setAttribute('data-blog-injected', 'true');
            document.body.appendChild(newScript);
          } else {
            // Collect inline content
            inlineContent += `\n/* Script Block */\n${oldScript.textContent}\n`;
          }
        });

        if (inlineContent) {
          const combinedScript = document.createElement('script');
          combinedScript.setAttribute('data-blog-injected', 'true');
          // Wrap everything in a single block to prevent 'already declared' 
          // errors on re-execution while preserving internal visibility.
          combinedScript.textContent = `{\n${inlineContent}\n}`;
          document.body.appendChild(combinedScript);
        }
      } catch (err) {
        console.error('Failed to execute blog scripts:', err);
      }
    }, 50);

    return () => {
      clearTimeout(timer);
      // Clean up injected scripts to prevent memory leaks/duplicate execution
      const injected = document.querySelectorAll('script[data-blog-injected="true"]');
      injected.forEach(s => s.remove());
    };
  }, [content, isEnabled]);

  return null;
}
