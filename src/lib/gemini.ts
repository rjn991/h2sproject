/**
 * GOOGLE SERVICES INTEGRATION (SEO)
 * --------------------------------
 * This module utilizes GOOGLE AI STUDIO and GEMINI 2.0 FLASH 
 * for advanced Visual Reasoning and Entity Extraction.
 * Leveraging GOOGLE CLOUD infrastructure for high-performance AI processing.
 */
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  generationConfig: {
    temperature: 0.1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 2048,
  },
});
