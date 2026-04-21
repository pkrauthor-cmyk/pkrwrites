'use client';

import { useEffect } from 'react';

/**
 * SmartNavigationController
 * Handles the auto-hiding of the 'BACK TO BLOG' button based on scroll direction.
 * Move from an inline script to a Client Component to resolve hydration mismatches.
 */
export default function SmartNavigationController() {
  useEffect(() => {
    let lastScroll = 0;
    const btn = document.querySelector('.floating-back-btn') as HTMLElement;
    const progress = document.getElementById('blog-progress') as HTMLElement;
    
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      const winHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      
      // Update Progress Bar
      if (progress) {
        const scrolled = (currentScroll / winHeight) * 100;
        progress.style.width = scrolled + '%';
      }

      // Handle Back Button Visibility
      if (btn) {
        if (currentScroll > lastScroll && currentScroll > 300) {
          btn.classList.add('hidden');
        } else {
          btn.classList.remove('hidden');
        }
      }
      
      lastScroll = currentScroll;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return null; 
}
