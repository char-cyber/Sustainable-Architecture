import { GoogleGenAI, Type } from "@google/genai";
import { SOURCE_URLS } from '../constants';
import { BuildingData, AnalysisResult, LocationAnalysis } from '../types';

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

export const analyzeLocation = async (region: BuildingData['locationRegion']): Promise<LocationAnalysis> => {
    const prompt = `
      Analyze the specified US region for a sustainable building project.
      Consider general weather conditions (hot/cold, humidity, sun exposure), climate risks (flooding, high winds), water availability, and typical proximity to public transportation hubs.
      Provide a brief weather summary.
      Suggest at least 3 key sustainability measures to prioritize for this region (e.g., solar panels in sunny areas, flood resilience in coastal areas).
      Provide a note on integrating with local public transport.

      Region: "${region}"

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
                        weatherSummary: { type: Type.STRING },
                        sustainabilityMeasures: { type: Type.ARRAY, items: { type: Type.STRING } },
                        transportationNotes: { type: Type.STRING }
                    },
                    required: ["weatherSummary", "sustainabilityMeasures", "transportationNotes"]
                }
            }
        });
        return JSON.parse(response.text.trim());
    } catch (error) {
        console.error("Error analyzing location with Gemini API:", error);
        throw new Error("Failed to get a valid location analysis from the AI.");
    }
};

export const analyzeSustainability = async (buildingData: BuildingData): Promise<AnalysisResult> => {
    const prompt = `
      Analyze the sustainability of the following building concept based on the principles of sustainable architecture (like LEED, Passive House, etc.).
      Provide a holistic sustainability score from 0 to 100.
      Provide a brief summary of the analysis.
      Provide categorized recommendations for improvement. The categories are: 'Energy Efficiency', 'Water Conservation', 'Sustainable Materials', and 'Site & Waste Management'. Provide at least two actionable recommendations per category.

      Building Data:
      ${JSON.stringify(buildingData, null, 2)}

      Return the analysis in a JSON object.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro', // Using a more powerful model for complex analysis
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        sustainabilityScore: { type: Type.NUMBER },
                        summary: { type: Type.STRING },
                        recommendations: {
                            type: Type.OBJECT,
                            properties: {
                                'Energy Efficiency': { type: Type.ARRAY, items: { type: Type.STRING } },
                                'Water Conservation': { type: Type.ARRAY, items: { type: Type.STRING } },
                                'Sustainable Materials': { type: Type.ARRAY, items: { type: Type.STRING } },
                                'Site & Waste Management': { type: Type.ARRAY, items: { type: Type.STRING } }
                            },
                             required: ['Energy Efficiency', 'Water Conservation', 'Sustainable Materials', 'Site & Waste Management']
                        }
                    },
                    required: ["sustainabilityScore", "summary", "recommendations"]
                }
            }
        });

        return JSON.parse(response.text.trim());
    } catch (error) {
        console.error("Error analyzing sustainability with Gemini API:", error);
        throw new Error("Failed to get a valid analysis from the AI. Please try again.");
    }
};

export const saveBuildingAnalysis = async (data: BuildingData): Promise<{ buildingId: string }> => {
    // This is a placeholder for a real API call to a secure backend.
    // The backend would handle the connection to MongoDB.
    console.log("Saving building data to database via API call:", data);

    try {
        const response = await fetch("http://localhost:5000/api/buildings", { // Fictional endpoint
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `API Error: ${response.statusText}`);
        }

        const result = await response.json();
        console.log("Saved successfully, received ID:", result.buildingId);
        return result; // Assuming backend returns { buildingId: '...' }
    } catch (error) {
        console.error("Failed to save building analysis:", error);
        alert("This is a demo. Data is not being saved to a live database.");
        // For demonstration, return a mock ID on failure to allow UI to proceed.
        return { buildingId: `mock_id_${Date.now()}` };
    }
};