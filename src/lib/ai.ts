import 'dotenv/config';

// Ensure the API key is loaded and trimmed
const apiKey = (process.env.GEMINI_API_KEY || "").trim();

export async function polishBlogContent(content: string) {
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing in .env.local");
  }

  const prompt = `
    You are a world-class author and digital philosopher. 
    Your task is to take the following draft blog post content and "polish" it into a highly professional, sophisticated, and engaging authorial voice.
    Guidelines: Return ONLY the polished HTML content.
    Draft Content: ${content}
  `;

  // Explicitly versioned models to try - updated based on available models for this environment
  const modelNames = [
    "gemini-flash-latest",
    "gemini-2.0-flash",
    "gemini-2.5-flash",
    "gemini-pro-latest",
    "gemini-1.5-flash-latest", // Fallbacks
    "gemini-1.5-flash",
    "gemini-1.5-pro-latest",
    "gemini-3.1-flash-lite-preview"
  ];
  
  let diagnosticInfo = "";

  for (const modelName of modelNames) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 404) {
          diagnosticInfo += `[${modelName}: NOT FOUND] `;
        } else if (response.status === 403) {
          diagnosticInfo += `[${modelName}: ACCESS FORBIDDEN - Is Generative Language API enabled? Check console.cloud.google.com] `;
        } else {
          diagnosticInfo += `[${modelName}: ${response.status} ${data.error?.message || "Error"}] `;
        }
        continue;
      }

      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) return text.replace(/```html/g, "").replace(/```/g, "").trim();
    } catch (err: any) {
      diagnosticInfo += `[${modelName} Connection Error: ${err.message}] `;
    }
  }

  throw new Error(`
    AI Connection Failed. 
    Models Tried: ${diagnosticInfo}
    
    IMPORTANT: The "NOT FOUND" or "FORBIDDEN" error usually means the Generative AI service is not enabled for this specific API key.
    
    PLEASE ACTION: Create a new API key at https://aistudio.google.com/ and update your .env.local file.
  `);
}
