
import React, { useState, useCallback } from 'react';
import { BuildingForm } from './components/BuildingForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { LeafIcon } from './components/icons/LeafIcon';
import { BuildingData, AnalysisResult } from './types';
import { analyzeSustainability } from './services/geminiService';

const App: React.FC = () => {
  const [buildingData, setBuildingData] = useState<BuildingData>({
    purpose: 'Residential',
    floors: 3,
    area: 5000,
    location: 'Suburban',
    materials: 'Concrete, Steel, Glass',
    energySource: 'Grid',
    waterSystem: 'Standard Municipal',
    additionalFeatures: 'Standard HVAC system, no green roof.',
  });
  
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBuildingData(prev => ({
      ...prev,
      [name]: name === 'floors' || name === 'area' ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const result = await analyzeSustainability(buildingData);
      setAnalysisResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [buildingData]);

  return (
    <div className="min-h-screen bg-green-50/50 text-gray-800 font-sans">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <LeafIcon className="w-10 h-10 text-green-600" />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
            Sustainable Building Analyzer
          </h1>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Describe Your Building Concept</h2>
            <BuildingForm
              formData={buildingData}
              onFormChange={handleFormChange}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
             <h2 className="text-xl font-semibold mb-4 text-gray-700">Sustainability Analysis</h2>
            <ResultsDisplay
              result={analysisResult}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </div>
      </main>

      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>Powered by Gemini API. Designed for a Greener Future.</p>
      </footer>
    </div>
  );
};

export default App;
