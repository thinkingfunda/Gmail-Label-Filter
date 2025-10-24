
import { GoogleGenAI, Type } from "@google/genai";
import { Email, Label, CategorizedEmail } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const categorizeAndSummarizeEmail = async (email: Email): Promise<CategorizedEmail | null> => {
  const { subject, body } = email;
  const labels = Object.values(Label).join(', ');

  const prompt = `
    Analyze the following email content and categorize it into one of the following labels: ${labels}.
    Provide a concise one-sentence summary of the email's main point.

    From: ${email.sender}
    Subject: ${subject}
    Body: ${body}

    Respond with a JSON object containing the 'label' and 'summary'.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            label: {
              type: Type.STRING,
              enum: Object.values(Label),
              description: 'The most appropriate category for the email.',
            },
            summary: {
              type: Type.STRING,
              description: 'A concise one-sentence summary of the email.',
            },
          },
          required: ['label', 'summary'],
        },
      },
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);
    
    // Validate if the label from Gemini is a valid Label enum
    if (Object.values(Label).includes(result.label)) {
      return result as CategorizedEmail;
    } else {
      console.warn(`Gemini returned an invalid label: ${result.label}`);
      // Fallback or default categorization could happen here
      return { label: Label.UPDATES, summary: result.summary };
    }

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return null;
  }
};
