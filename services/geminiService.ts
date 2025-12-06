import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

// Ensure API key is present
const apiKey = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey });

export const analyzeSkills = async (resumeText: string, targetText: string): Promise<AnalysisResult> => {
  if (!apiKey) {
    throw new Error("API Key is missing. Please check your environment configuration.");
  }

  const modelId = "gemini-2.5-flash"; // Fast and efficient for text analysis

  const prompt = `
    Analyze the following Resume Text and Target Job/Role Description.
    
    Resume Text:
    "${resumeText.slice(0, 10000)}"

    Target Description:
    "${targetText.slice(0, 10000)}"

    Task:
    1. Identify key skills required for the target role.
    2. Evaluate the resume against these skills.
    3. Assign a 'currentScore' (0-100) based on the resume evidence (0 if missing).
    4. Assign a 'targetScore' (usually 80-100 for required skills).
    5. Categorize skills (e.g., Technical, Soft Skills, Tools, Domain Knowledge).
    6. Provide specific learning recommendations.

    Return the data in a strict JSON format.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            overallMatchPercentage: { type: Type.NUMBER, description: "Overall match score 0-100" },
            summary: { type: Type.STRING, description: "Executive summary of the analysis" },
            skills: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  category: { type: Type.STRING },
                  skillName: { type: Type.STRING },
                  currentScore: { type: Type.NUMBER },
                  targetScore: { type: Type.NUMBER },
                  importance: { type: Type.STRING, enum: ["Critical", "Moderate", "Nice-to-have"] },
                  gapDescription: { type: Type.STRING }
                },
                required: ["category", "skillName", "currentScore", "targetScore", "importance", "gapDescription"]
              }
            },
            recommendations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  priority: { type: Type.NUMBER },
                  skillCategory: { type: Type.STRING },
                  actionItem: { type: Type.STRING },
                  resources: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        title: { type: Type.STRING },
                        type: { type: Type.STRING, enum: ['Course', 'Article', 'Project', 'Mentorship'] },
                        provider: { type: Type.STRING },
                        estimatedDuration: { type: Type.STRING },
                        description: { type: Type.STRING }
                      }
                    }
                  }
                }
              }
            }
          },
          required: ["overallMatchPercentage", "summary", "skills", "recommendations"]
        }
      }
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("Empty response from AI");
    }

    return JSON.parse(resultText) as AnalysisResult;

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to analyze skill gap. Please try again.");
  }
};