import React, { useState } from 'react';
import type { Page } from '../App';
import { analyzeSustainability } from '../services/geminiService'; // placeholder, replace with real API

interface AddNewBuildingPageProps {
  setPage: (page: Page) => void;
}

export const AddNewBuildingPage: React.FC<AddNewBuildingPageProps> = ({ setPage }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleImageUploadClick = () => {
    const fileInput = document.getElementById('file-upload');
    fileInput?.click();
  };

  const handleTextClick = () => {
    alert('Text input functionality coming soon!');
  };

  const handleAnalyze = async () => {
    if (!selectedImage) {
      alert('Please select an image first.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      // TODO: Replace with real Gemini API
      const result = await fakeGeminiImageAnalysis(selectedImage);
      setAnalysisResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  // Mock Gemini image analysis
  const fakeGeminiImageAnalysis = async (file: File) => {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve({
          summary: 'This is a mock analysis of your image.',
          pros: ['Good lighting', 'Modern design features'],
          cons: ['No green roof', 'High energy consumption'],
          suggestions: ['Add solar panels', 'Use sustainable materials', 'Optimize HVAC'],
          sustainabilityScore: 72,
        });
      }, 1500)
    );
  };

  return (
    <main className="h-full w-full flex flex-col items-center justify-start relative bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-gray-900 dark:to-emerald-900/60 p-4 pt-24">
      {/* Background SVG */}
      <div className="absolute inset-0 overflow-hidden opacity-10 dark:opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="a"
              patternUnits="userSpaceOnUse"
              width="80"
              height="80"
              patternTransform="scale(1) rotate(0)"
            >
              <rect x="0" y="0" width="100%" height="100%" fill="hsla(0,0%,100%,0)" />
              <path
                d="M40 40 L0 80 M80 0 L40 40"
                strokeWidth="1"
                stroke="hsl(150, 7%, 52%)"
                fill="none"
              />
            </pattern>
          </defs>
          <rect width="800%" height="800%" transform="translate(0,0)" fill="url(#a)" />
        </svg>
      </div>

      <div className="z-10 w-full max-w-6xl flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-emerald-800 dark:text-emerald-300 tracking-tight text-center">
          Add a New Building
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400 text-center">
          Upload an image or enter text to define your building’s parameters for sustainability analysis.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleTextClick}
            className="w-full sm:w-auto px-8 py-4 text-lg font-semibold text-white bg-emerald-600 rounded-full shadow-lg hover:bg-emerald-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-emerald-300 dark:focus:ring-emerald-800"
          >
            Text
          </button>

          <button
            onClick={handleImageUploadClick}
            className="w-full sm:w-auto px-8 py-4 text-lg font-semibold text-white bg-emerald-600 rounded-full shadow-lg hover:bg-emerald-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-emerald-300 dark:focus:ring-emerald-800"
          >
            Upload Image
          </button>

          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          {selectedImage && (
            <button
              onClick={handleAnalyze}
              className="w-full sm:w-auto px-8 py-4 text-lg font-semibold text-white bg-teal-600 rounded-full shadow-lg hover:bg-teal-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-teal-300 dark:focus:ring-teal-800"
            >
              {isLoading ? 'Analyzing...' : 'Analyze Image'}
            </button>
          )}
        </div>

        {/* Image + Analysis layout */}
        <div className="mt-10 w-full flex flex-col lg:flex-row gap-8 items-start justify-center">
          {/* Image Preview */}
          {previewUrl && (
            <div className="flex-shrink-0 w-full lg:w-1/2 flex flex-col items-center">
              <h3 className="text-lg font-semibold mb-2 text-slate-700 dark:text-slate-300">
                Selected Image Preview
              </h3>
              <img
                src={previewUrl}
                alt="Preview"
                className="max-w-full h-auto rounded-lg shadow-md border border-gray-300"
              />
            </div>
          )}

          {/* Analysis Result */}
          {analysisResult && (
            <div className="w-full lg:w-1/2 bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700 text-left overflow-auto max-h-[600px]">
              <h3 className="text-xl font-bold mb-2 text-emerald-600 dark:text-emerald-400">
                Analysis Result
              </h3>
              <p><strong>Summary:</strong> {analysisResult.summary}</p>
              <p><strong>Sustainability Score:</strong> {analysisResult.sustainabilityScore}</p>
              <p><strong>Pros:</strong></p>
              <ul className="list-disc list-inside">
                {analysisResult.pros.map((pro: string, i: number) => <li key={i}>{pro}</li>)}
              </ul>
              <p><strong>Cons:</strong></p>
              <ul className="list-disc list-inside">
                {analysisResult.cons.map((con: string, i: number) => <li key={i}>{con}</li>)}
              </ul>
              <p><strong>Suggestions:</strong></p>
              <ul className="list-disc list-inside">
                {analysisResult.suggestions.map((s: string, i: number) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
