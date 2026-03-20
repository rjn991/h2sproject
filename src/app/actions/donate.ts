"use server";

import { model } from "@/lib/gemini";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, GeoPoint } from "firebase/firestore";
import { z } from "zod";

const DonationSchema = z.object({
  items: z.array(z.object({
    name: z.string().min(1),
    qty: z.number().positive(),
    unit: z.string(),
    cat: z.string()
  })),
  rawText: z.string()
});

type GeminiOutput = z.infer<typeof DonationSchema>;

export async function processDonationNote(formData: FormData) {
  try {
    const file = formData.get("image") as File;
    if (!file) throw new Error("No image provided");

    // Basic size validation for efficiency/security
    if (file.size > 10 * 1024 * 1024) throw new Error("File too large (max 10MB)");

    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");

    const prompt = `
      Perform "Visual Reasoning" on this handwritten note image.
      Extract the items being donated.
      Items often contain a name, quantity, unit (kg, bags, units), and category (Food, Meds, Clothing).
      
      Return ONLY valid JSON matching this schema:
      {
        "items": Array<{ "name": string, "qty": number, "unit": string, "cat": string }>,
        "rawText": string (full OCR transcription)
      }
    `;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64,
          mimeType: file.type,
        },
      },
    ]);

    const response = await result.response;
    const text = response.text();
    
    // Extract JSON from potentially markdown-wrapped response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Could not extract JSON from Gemini response");
    
    // Validate with Zod for security and type safety
    const extraction = DonationSchema.parse(JSON.parse(jsonMatch[0]));

    // Save to Firestore
    await addDoc(collection(db, "donations"), {
      items: extraction.items,
      rawText: extraction.rawText,
      status: "pending",
      createdAt: serverTimestamp(),
      donorLocation: new GeoPoint(0, 0), // Default for now
    });

    return { success: true, data: extraction };
  } catch (error) {
    console.error("Donation Server Action error:", error);
    return { success: false, error: (error as Error).message };
  }
}
