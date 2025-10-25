
import { GoogleGenAI, Type } from "@google/genai";
import { SOURCE_URLS } from '../constants';
import { BuildingData, AnalysisResult } from '../types';

// It is assumed that process.env.API_KEY is available in the execution environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const generateResponse = async (userPrompt: string): Promise<string> => {
  if (!userPrompt.trim()) {
    throw new Error("Prompt cannot be empty.");
  }

  const sourcesText = SOURCE_URLS.map(source => `- ${source.name}: ${source.url}`).join('\n');

  const fullPrompt = `
    You are an expert AI assistant specializing in sustainable architecture. Your knowledge is based on leading industry resources.
    Answer the following question based ONLY on the information that could be found in the provided sources.
    Do not use any external knowledge. Format your answer using Markdown for readability (e.g., use headings, lists, and bold text).

    QUESTION:
    "${userPrompt}"

    SOURCES:
    ${sourcesText}

    Provide a comprehensive and well-structured answer.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: fullPrompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating response from Gemini API:", error);
    if (error instanceof Error) {
        return `An error occurred while contacting the AI. Please check your API key and network connection. Details: ${error.message}`;
    }
    return "An unknown error occurred while contacting the AI.";
  }
};

export const analyzeSustainability = async (buildingData: BuildingData): Promise<AnalysisResult> => {
    const prompt = `
      Analyze the sustainability of the following building concept based on the principles of sustainable architecture (like LEED, Passive House, etc.).
      Provide a sustainability score from 0 to 100, where 100 is perfectly sustainable.
      List the key pros and cons regarding sustainability.
      Provide at least 3 actionable suggestions for improvement.
      Write a brief summary of the analysis.

      Building Data:
      - Purpose: ${buildingData.purpose}
      - Location: ${buildingData.location}
      - Floors: ${buildingData.floors}
      - Total Area (sq ft): ${buildingData.area}
      - Primary Materials: ${buildingData.materials}
      - Energy Source: ${buildingData.energySource}
      - Water System: ${buildingData.waterSystem}
      - Additional Features: ${buildingData.additionalFeatures}

      Return the analysis in a JSON object.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        sustainabilityScore: { type: Type.NUMBER, description: "A score from 0-100." },
                        pros: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Positive sustainability aspects." },
                        cons: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Negative sustainability aspects." },
                        suggestions: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Suggestions for improvement." },
                        summary: { type: Type.STRING, description: "A brief summary of the analysis." }
                    },
                    required: ["sustainabilityScore", "pros", "cons", "suggestions", "summary"]
                }
            }
        });

        const jsonText = response.text.trim();
        return JSON.parse(jsonText);
    } catch (error) {
        console.error("Error analyzing sustainability with Gemini API:", error);
        throw new Error("Failed to get a valid analysis from the AI. Please try again.");
    }
};