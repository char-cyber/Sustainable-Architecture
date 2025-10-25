import React, { useState, useCallback } from 'react';
import { BuildingForm } from '../components/BuildingForm';
import { ResultsDisplay } from '../components/ResultsDisplay';
import { BuildingData, AnalysisResult } from '../types';
import { analyzeSustainability } from '../services/geminiService';

export const CustomizeBuildingPage: React.FC = () => {
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
      [name]: name === 'floors' || name === 'area' ? parseInt(value, 10) || 0 : value,
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
    <main className="p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
            <h2 className="text-xl font-semibold mb-4 text-emerald-600 dark:text-emerald-400">Describe Your Building Concept</h2>
            <BuildingForm
              formData={buildingData}
              onFormChange={handleFormChange}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 sticky top-8">
             <h2 className="text-xl font-semibold mb-4 text-emerald-600 dark:text-emerald-400">Sustainability Analysis</h2>
            <ResultsDisplay
              result={analysisResult}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </div>
      </div>
    </main>
  );
};