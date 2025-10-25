
import React from 'react';
import { ScoreGauge } from './ScoreGauge';
import { SuggestionCard } from './SuggestionCard';
import { InfoIcon } from './icons/InfoIcon';
import type { AnalysisResult } from '../types';

interface ResultsDisplayProps {
  result: AnalysisResult | null;
  isLoading: boolean;
  error: string | null;
}

const LoadingSkeleton: React.FC = () => (
  <div className="animate-pulse space-y-6">
    <div className="flex justify-center">
      <div className="w-40 h-40 bg-gray-200 rounded-full"></div>
    </div>
    <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
    <div className="space-y-4 pt-4">
      <div className="h-8 bg-gray-200 rounded w-1/3"></div>
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
    </div>
    <div className="space-y-4 pt-4">
      <div className="h-8 bg-gray-200 rounded w-1/3"></div>
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
    </div>
  </div>
);

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, isLoading, error }) => {
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center text-red-600 bg-red-50 p-4 rounded-lg">
        <h3 className="font-bold">Analysis Failed</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="text-center text-gray-500 flex flex-col items-center justify-center h-full">
        <InfoIcon className="w-16 h-16 text-gray-300 mb-4" />
        <p className="text-lg">Your building's sustainability report will appear here.</p>
        <p className="text-sm">Fill out the form and click "Analyze" to begin.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <ScoreGauge score={result.score} />
        <p className="mt-4 text-lg text-gray-600 max-w-md mx-auto">{result.summary}</p>
      </div>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Improvement Suggestions</h3>
        {result.suggestions.map((suggestion, index) => (
          <SuggestionCard key={index} category={suggestion.category} recommendations={suggestion.recommendations} />
        ))}
      </div>
    </div>
  );
};
