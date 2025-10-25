
import React from 'react';
import type { BuildingData } from '../types';

interface BuildingFormProps {
  formData: BuildingData;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export const BuildingForm: React.FC<BuildingFormProps> = ({ formData, onFormChange, onSubmit, isLoading }) => {
  
  const renderLabel = (text: string) => (
    <label className="block text-sm font-medium text-gray-600 mb-1">{text}</label>
  );

  const inputClasses = "w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-150";
  const selectClasses = inputClasses;
  const textareaClasses = `${inputClasses} min-h-[80px]`;
  
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          {renderLabel('Building Purpose')}
          <select name="purpose" value={formData.purpose} onChange={onFormChange} className={selectClasses}>
            <option>Residential</option>
            <option>Commercial</option>
            <option>Mixed-Use</option>
            <option>Industrial</option>
          </select>
        </div>
        <div>
          {renderLabel('Location Type')}
          <select name="location" value={formData.location} onChange={onFormChange} className={selectClasses}>
            <option>Urban</option>
            <option>Suburban</option>
            <option>Rural</option>
          </select>
        </div>
        <div>
          {renderLabel('Number of Floors')}
          <input type="number" name="floors" value={formData.floors} onChange={onFormChange} min="1" className={inputClasses} />
        </div>
        <div>
          {renderLabel('Total Area (sq ft)')}
          <input type="number" name="area" value={formData.area} onChange={onFormChange} min="100" step="100" className={inputClasses} />
        </div>
      </div>

      <div>
        {renderLabel('Primary Materials (e.g., Concrete, Steel, Wood)')}
        <input type="text" name="materials" value={formData.materials} onChange={onFormChange} className={inputClasses} />
      </div>
      <div>
        {renderLabel('Primary Energy Source (e.g., Grid, Solar, Geothermal)')}
        <input type="text" name="energySource" value={formData.energySource} onChange={onFormChange} className={inputClasses} />
      </div>
      <div>
        {renderLabel('Water System (e.g., Municipal, Rainwater Harvesting)')}
        <input type="text" name="waterSystem" value={formData.waterSystem} onChange={onFormChange} className={inputClasses} />
      </div>
      <div>
        {renderLabel('Additional Features / Notes')}
        <textarea name="additionalFeatures" value={formData.additionalFeatures} onChange={onFormChange} className={textareaClasses}></textarea>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center items-center px-4 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </>
          ) : (
            'Analyze Sustainability'
          )}
        </button>
      </div>
    </form>
  );
};
