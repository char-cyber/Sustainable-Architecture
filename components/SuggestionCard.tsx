
import React from 'react';
import { EnergyIcon } from './icons/EnergyIcon';
import { WaterIcon } from './icons/WaterIcon';
import { MaterialsIcon } from './icons/MaterialsIcon';
import { WasteIcon } from './icons/WasteIcon';
import { CheckIcon } from './icons/CheckIcon';

interface SuggestionCardProps {
  category: string;
  recommendations: string[];
}

const categoryIcons: { [key: string]: React.ReactNode } = {
  'Energy Efficiency': <EnergyIcon className="w-6 h-6 text-yellow-500" />,
  'Water Conservation': <WaterIcon className="w-6 h-6 text-blue-500" />,
  'Sustainable Materials': <MaterialsIcon className="w-6 h-6 text-green-500" />,
  'Site & Waste Management': <WasteIcon className="w-6 h-6 text-purple-500" />,
};

export const SuggestionCard: React.FC<SuggestionCardProps> = ({ category, recommendations }) => {
  const icon = categoryIcons[category] || <div className="w-6 h-6 bg-gray-400 rounded" />;

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
      <div className="flex items-center mb-3">
        {icon}
        <h4 className="ml-3 font-semibold text-gray-700">{category}</h4>
      </div>
      <ul className="space-y-2">
        {recommendations.map((rec, index) => (
          <li key={index} className="flex items-start">
            <CheckIcon className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
            <span className="text-gray-600 text-sm">{rec}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
