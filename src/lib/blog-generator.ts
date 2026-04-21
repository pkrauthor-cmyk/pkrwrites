import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from './db';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const BLOG_KEYWORDS = [
  'amazon kdp',
  'self publishing books',
  'passive income books',
  'writing tips',
  'kindle publishing'
];

export async function generateBlogPost(keyword?: string) {
  const targetKeyword = keyword || BLOG_KEYWORDS[Math.floor(Math.random() * BLOG_KEYWORDS.length)];
  
  console.log(`🤖 Generating blog post with Gemini for keyword: ${targetKeyword}`);

  // Fetch some books to interlink
  const books = await prisma.book.findMany({ take: 3 });
  const booksContext = books.map(b => `${b.title} (${b.amznLink || `https://www.amazon.com/dp/${b.asin}`})`).join(', ');

  const prompt = `
    Write a high-quality, SEO-optimized blog post for an author website named "PKR Writes".
    Topic: ${targetKeyword}
    
    Requirements:
    1. Length: 1200-1500 words.
    2. Style: Professional, inspiring, and authoritative.
    3. Structure: 
       - Catchy SEO title.
       - Engaging introduction.
       - Multiple H2 and H3 subheadings with detailed body text.
       - Practical, actionable advice for readers.
       - Conclusion with a Call to Action (CTA).
    4. Keywords: Include "${targetKeyword}" and related terms naturally throughout.
    5. Internal Linking: Mention at least one of these books naturally as a recommended resource: ${booksContext}.
    6. Tone: Author-focused, premium, and helpful.
    
    IMPORTANT: Format THE ENTIRE RESPONSE as a single JSON object with these EXACT keys:
    - title: The blog post title
    - slug: A URL-friendly slug (kebab-case)
    - excerpt: A 2-sentence summary
    - content: The full HTML content (beginning with <p>, include <h2>, <h3>, <ul>, <li> tags)
    - metaTitle: SEO title (max 60 chars)
    - metaDesc: SEO description (max 160 chars)
    
    Do not include any Markdown formatting like \`\`\`json blocks in your response. Just the raw JSON.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean potential markdown wrappers if Gemini includes them
    const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();
    const data = JSON.parse(cleanText);
    
    // Save to DB
    const post = await prisma.blogPost.create({
      data: {
        title: data.title,
        slug: `${data.slug}-${Date.now()}`, // Ensure uniqueness
        content: data.content,
        excerpt: data.excerpt,
        metaTitle: data.metaTitle,
        metaDesc: data.metaDesc,
        status: 'published',
        publishedAt: new Date(),
        category: 'Self-Publishing',
      }
    });

    return { success: true, post };
  } catch (error) {
    console.error('❌ Gemini Blog Generation Error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
