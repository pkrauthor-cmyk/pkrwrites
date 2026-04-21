'use client';

import { useEffect } from 'react';

/**
 * ScrollReveal Component
 * Automatically detects elements with the 'reveal-on-scroll' class 
 * and applies a 'visible' class when they enter the viewport.
 */
export default function ScrollReveal() {
  useEffect(() => {
    // Delay slightly to ensure dangerouslySetInnerHTML has finished rendering
    const timer = setTimeout(() => {
      const observerOptions = {
        threshold: 0.1
      };

      const handleIntersect = (entries: IntersectionObserverEntry[]) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      };

      const observer = new IntersectionObserver(handleIntersect, observerOptions);
      
      // Target headings, paragraphs, blockquotes, images, lists, and hr inside the custom content
      const elements = document.querySelectorAll('.custom-content h1, .custom-content h2, .custom-content h3, .custom-content p, .custom-content blockquote, .custom-content img, .custom-content li, .custom-content hr');
      
      elements.forEach((el, index) => {
        const element = el as HTMLElement;
        element.classList.add('reveal-on-scroll');
        
        // Add a slight delay based on viewport position to create a staggered feel
        // but only for elements that appear close to each other
        const delay = (index % 4) * 0.15;
        element.style.animationDelay = `${delay}s`;
        
        observer.observe(element);
      });

      return () => observer.disconnect();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return null;
}
