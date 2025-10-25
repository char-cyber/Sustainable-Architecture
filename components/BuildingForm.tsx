
import React from 'react';
import type { BuildingData } from '../types';

interface BuildingFormProps {
  formData: BuildingData;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

// FIX: Rewrote form to use fields from the correct BuildingData type.
export const BuildingForm: React.FC<BuildingFormProps> = ({ formData, onFormChange, onSubmit, isLoading }) => {
  const commonInputClasses = "w-full p-2 rounded-md border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500";
  const labelClasses = "block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1";
  
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="housingType" className={labelClasses}>Housing Type</label>
          <select id="housingType" name="housingType" value={formData.housingType} onChange={onFormChange} className={commonInputClasses}>
            <option value="">Select Type</option>
            <option>Luxury Apartment</option>
            <option>Studio Apartment</option>
            <option>Educational Center</option>
            <option>Community Center</option>
          </select>
        </div>
        <div>
          <label htmlFor="locationRegion" className={labelClasses}>Location Region</label>
          <select id="locationRegion" name="locationRegion" value={formData.locationRegion} onChange={onFormChange} className={commonInputClasses}>
            <option value="">Select a Region</option>
            <option>Central</option><option>East</option><option>West</option><option>South</option><option>North</option><option>Puerto Rico</option>
          </select>
        </div>
        <div>
          <label htmlFor="floors" className={labelClasses}>Number of Floors</label>
          <select id="floors" name="floors" value={formData.floors} onChange={onFormChange} className={commonInputClasses}>
            <option>1-5</option><option>6-10</option><option>10-15</option><option>16-20</option>
          </select>
        </div>
        <div>
            <label htmlFor="elevators" className={labelClasses}>Number of Elevators</label>
            <input type="number" id="elevators" name="elevators" value={formData.elevators} onChange={onFormChange} className={commonInputClasses} min="0"/>
        </div>
        <div>
            <label htmlFor="roomsMin" className={labelClasses}>Min Rooms</label>
            <input type="number" id="roomsMin" name="roomsMin" value={formData.roomsMin} onChange={onFormChange} className={commonInputClasses} min="1"/>
        </div>
        <div>
            <label htmlFor="roomsMax" className={labelClasses}>Max Rooms</label>
            <input type="number" id="roomsMax" name="roomsMax" value={formData.roomsMax} onChange={onFormChange} className={commonInputClasses} min={formData.roomsMin}/>
        </div>
        <div>
          <label htmlFor="spacePerRoom" className={labelClasses}>Avg. Space per Room</label>
          <select id="spacePerRoom" name="spacePerRoom" value={formData.spacePerRoom} onChange={onFormChange} className={commonInputClasses}>
            <option>300-600 sq ft</option><option>500-800 sq ft</option><option>800-1100 sq ft</option><option>1100-1200 sq ft</option><option>1200+ sq ft</option>
          </select>
        </div>
         <div>
          <label htmlFor="materialType" className={labelClasses}>Primary Material Type</label>
          <select id="materialType" name="materialType" value={formData.materialType} onChange={onFormChange} className={commonInputClasses}>
            <option>Type 1: Fire-Resistive</option><option>Type 2: Non-Combustible</option><option>Type 3: Ordinary</option><option>Type 4: Heavy Timber</option><option>Type 5: Wood-Framed</option>
          </select>
        </div>
        <div>
          <label htmlFor="waterFixtures" className={labelClasses}>Water System</label>
          <select id="waterFixtures" name="waterFixtures" value={formData.waterFixtures} onChange={onFormChange} className={commonInputClasses}>
            <option>Standard</option><option>Low-Flow</option><option>Rainwater Harvesting</option>
          </select>
        </div>
        <div>
          <label htmlFor="architecturalStyle" className={labelClasses}>Architectural Style</label>
          <select id="architecturalStyle" name="architecturalStyle" value={formData.architecturalStyle} onChange={onFormChange} className={commonInputClasses}>
            <option>Contemporary</option><option>Neoclassical</option><option>Art Deco</option><option>Victorian</option><option>Mid-century Modern</option><option>Tudor</option>
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="additionalFeatures" className={labelClasses}>Additional Features</label>
        <textarea id="additionalFeatures" name="additionalFeatures" value={formData.additionalFeatures} onChange={onFormChange} className={commonInputClasses} rows={3} placeholder="e.g., Green roof, high-efficiency windows, smart HVAC"></textarea>
      </div>
      <div>
        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full mt-2 px-4 py-2.5 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 dark:focus:ring-offset-slate-800 disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Analyzing...' : 'Analyze Sustainability'}
        </button>
      </div>
    </form>
  );
};
