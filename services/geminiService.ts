
import { GoogleGenAI, Type } from "@google/genai";
import type { BuildingData, AnalysisResult } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const generatePrompt = (data: BuildingData): string => {
  return `
    Act as an expert in sustainable architecture and green building design (LEED certified professional).
    Analyze the following building proposal for its environmental sustainability.

    Building Details:
    - Purpose: ${data.purpose}
    - Number of Floors: ${data.floors}
    - Total Area (sq ft): ${data.area}
    - Location Type: ${data.location}
    - Primary Materials: ${data.materials}
    - Primary Energy Source: ${data.energySource}
    - Water System: ${data.waterSystem}
    - Additional Features/Notes: ${data.additionalFeatures}

    Based on these details, perform the following tasks:
    1.  Generate a sustainability score from 0 to 100. A score of 0 indicates a building with no sustainable features, while 100 represents a carbon-neutral, fully regenerative building.
    2.  Provide a brief, insightful summary (2-3 sentences) of the building's current sustainability profile.
    3.  Provide specific, actionable suggestions for improvement. Group these suggestions into the following categories: 'Energy Efficiency', 'Water Conservation', 'Sustainable Materials', and 'Site & Waste Management'. Provide at least 2 recommendations per category.

    Your entire response MUST be a single, valid JSON object that adheres to the provided schema. Do not include any text, explanation, or markdown formatting before or after the JSON object.
  `;
};

export const analyzeSustainability = async (data: BuildingData): Promise<AnalysisResult> => {
  try {
    const prompt = generatePrompt(data);

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: {
              type: Type.NUMBER,
              description: "The sustainability score from 0 to 100."
            },
            summary: {
              type: Type.STRING,
              description: "A brief summary of the sustainability analysis."
            },
            suggestions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  category: {
                    type: Type.STRING,
                    description: "The category of sustainability suggestions (e.g., 'Energy Efficiency')."
                  },
                  recommendations: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.STRING,
                      description: "A specific recommendation for improvement."
                    }
                  }
                },
                required: ["category", "recommendations"]
              }
            }
          },
          required: ["score", "summary", "suggestions"]
        },
      },
    });

    const jsonText = response.text.trim();
    const result: AnalysisResult = JSON.parse(jsonText);
    return result;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get sustainability analysis. Please check your API key and try again.");
  }
};
