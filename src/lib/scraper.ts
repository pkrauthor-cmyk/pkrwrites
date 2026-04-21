import { prisma } from './db';

const AUTHOR_URL = 'https://www.amazon.com/author/pk_r';

export async function syncBooks() {
  console.log('🔄 Starting Amazon Sync for PK R...');
  
  try {
    const response = await fetch(AUTHOR_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Amazon page: ${response.statusText}`);
    }

    const html = await response.text();
    
    // Look for stores_initial_state or amazonStoresData
    const stateMatch = html.match(/window\.__stores_initial_state__\s*=\s*({.+?});/) || 
                       html.match(/window\.amazonStoresData\s*=\s*({.+?});/);
    
    if (stateMatch) {
      const state = JSON.parse(stateMatch[1]);
      // Extract books from the Redux/Initial state
      const products = findProductsInState(state);
      
      let syncedCount = 0;
      for (const product of products) {
        await prisma.book.upsert({
          where: { asin: product.asin },
          update: {
            title: product.title,
            coverUrl: product.imageUrl,
            amznLink: `https://www.amazon.com/dp/${product.asin}`,
            description: product.description,
            price: product.price,
          },
          create: {
            asin: product.asin,
            title: product.title,
            author: 'PK R',
            coverUrl: product.imageUrl,
            amznLink: `https://www.amazon.com/dp/${product.asin}`,
            description: product.description,
            price: product.price,
          }
        });
        syncedCount++;
      }
      
      return { success: true, count: syncedCount };
    } else {
      // Fallback to manual selector parsing if state is not found
      console.warn('⚠️ Could not find initial state, falling back to basic parsing...');
      return { success: false, error: 'Amazon layout changed or blocking active.' };
    }
  } catch (error) {
    console.error('❌ Sync Error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

function findProductsInState(state: any): any[] {
  const booksMap = new Map<string, any>();

  // Helper to recursively find objects with asin properties
  function search(obj: any) {
    if (!obj || typeof obj !== 'object') return;

    if (obj.asin && obj.title && (obj.imageUrl || obj.image?.url)) {
      if (!booksMap.has(obj.asin)) {
        booksMap.set(obj.asin, {
          asin: obj.asin,
          title: obj.title,
          imageUrl: obj.imageUrl || obj.image?.url,
          description: obj.description?.text || obj.productDescription || obj.description,
          price: obj.price?.displayString || obj.price?.amount || obj.price,
        });
      }
    }

    Object.values(obj).forEach(val => search(val));
  }

  search(state);
  return Array.from(booksMap.values());
}
