'use client';

export default function BlogListStyles() {
  return (
    <style jsx global>{`
      .post-title-hover:hover {
        color: var(--primary) !important;
      }
      .read-more-link span {
        transition: transform 0.3s ease;
      }
      .read-more-link:hover span {
        transform: translateX(5px);
      }
      .blog-entry {
        opacity: 0;
        transform: translateY(20px);
        animation: fadeIn 0.8s forwards;
      }
      @keyframes fadeIn {
        to { opacity: 1; transform: translateY(0); }
      }
      @media (max-width: 768px) {
        .blog-entry {
          grid-template-columns: 1fr;
          gap: 2rem;
          text-align: center;
        }
        .blog-entry div {
          margin: 0 auto;
        }
      }
    `}</style>
  );
}
