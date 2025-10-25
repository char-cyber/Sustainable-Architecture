import React, { useState, useCallback, ChangeEvent } from 'react';
import { BuildingData, LocationAnalysis, AnalysisResult } from '../types';
import { analyzeLocation, analyzeSustainability, saveBuildingAnalysis } from '../services/geminiService';

const initialBuildingData: BuildingData = {
  locationRegion: '',
  housingType: '',
  floors: '1-5',
  roomsMin: 1,
  roomsMax: 6,
  elevators: 1,
  spacePerRoom: '500-800 sq ft',
  architecturalStyle: 'Contemporary',
  materialType: 'Type 2: Non-Combustible',
  wasteReduction: [],
  energyEfficiency: [],
  resourceEfficiency: {
    thermalMass: false,
    buildingOrientation: '',
    envelopeUValue: 0.5,
  },
  waterFixtures: 'Standard',
  additionalFeatures: '',
};

const commonInputClasses = "w-full p-2 rounded-md border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500";
const labelClasses = "block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1";
const checkboxLabelClasses = "flex items-center space-x-2 text-sm text-slate-700 dark:text-slate-300";

export const CustomizeBuildingPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [buildingData, setBuildingData] = useState<BuildingData>(initialBuildingData);
  
  const [locationAnalysis, setLocationAnalysis] = useState<LocationAnalysis | null>(null);
  const [isLocationLoading, setIsLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const [finalResult, setFinalResult] = useState<AnalysisResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [savedBuildingId, setSavedBuildingId] = useState<string | null>(null);

  const handleAnalyzeLocation = useCallback(async () => {
    if (!buildingData.locationRegion) return;
    setIsLocationLoading(true);
    setLocationError(null);
    setLocationAnalysis(null);
    try {
      const result = await analyzeLocation(buildingData.locationRegion);
      setLocationAnalysis(result);
    } catch (err) {
      setLocationError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLocationLoading(false);
    }
  }, [buildingData.locationRegion]);

  const handleFormChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    if (name.startsWith('resourceEfficiency.')) {
        const key = name.split('.')[1];
        setBuildingData(prev => ({
            ...prev,
            resourceEfficiency: {
                ...prev.resourceEfficiency,
                [key]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
            }
        }));
    } else {
        setBuildingData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    }
  };

  const handleMultiSelectChange = (field: 'wasteReduction' | 'energyEfficiency', value: string) => {
    setBuildingData(prev => {
      const currentValues = prev[field];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      return { ...prev, [field]: newValues };
    });
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 5));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));
  const goToStep = (step: number) => setCurrentStep(step);

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    setFinalResult(null);
      setSavedBuildingId(null);
    try {
      // Step 1: Run the sustainability analysis
      const result = await analyzeSustainability(buildingData);
      setAnalysisResult(result);
  
      // Step 2: Save to database (assuming userId is stored in localStorage or context)
      const userId = localStorage.getItem("userId");
      if (userId) {
        const saveResponse = await fetch(`http://localhost:5000/api/user/${userId}/buildings`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...buildingData,
            analysisResult: result,
          }),
        });
  
        if (!saveResponse.ok) {
          throw new Error("Failed to save building to database");
        }
        console.log("Building saved successfully");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  }, [buildingData]);

  const renderFormStep = () => {
    switch (currentStep) {
      case 1: // Basic
        return (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Basics</h3>
            <div>
              <label htmlFor="housingType" className={labelClasses}>Type of Housing</label>
              <select name="housingType" value={buildingData.housingType} onChange={handleFormChange} className={commonInputClasses}>
                <option value="">Select Type</option>
                <option>Luxury Apartment</option><option>Studio Apartment</option><option>Educational Center</option><option>Community Center</option>
              </select>
            </div>
             <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClasses}>Floors</label>
                  <select name="floors" value={buildingData.floors} onChange={handleFormChange} className={commonInputClasses}>
                    <option>1-5</option><option>6-10</option><option>10-15</option><option>16-20</option>
                  </select>
                </div>
                <div>
                  <label className={labelClasses}>Elevators</label>
                  <input type="number" name="elevators" value={buildingData.elevators} onChange={handleFormChange} className={commonInputClasses} min="0"/>
                </div>
                <div>
                    <label className={labelClasses}>Min Rooms</label>
                    <input type="number" name="roomsMin" value={buildingData.roomsMin} onChange={handleFormChange} className={commonInputClasses} min="1"/>
                </div>
                <div>
                    <label className={labelClasses}>Max Rooms</label>
                    <input type="number" name="roomsMax" value={buildingData.roomsMax} onChange={handleFormChange} className={commonInputClasses} min={buildingData.roomsMin}/>
                </div>
            </div>
             <div>
              <label className={labelClasses}>Avg. Space per Room</label>
              <select name="spacePerRoom" value={buildingData.spacePerRoom} onChange={handleFormChange} className={commonInputClasses}>
                <option>300-600 sq ft</option><option>500-800 sq ft</option><option>800-1100 sq ft</option><option>1100-1200 sq ft</option><option>1200+ sq ft</option>
              </select>
            </div>
          </div>
        );
      case 2: // Styles and Material
        return (
            <div className="space-y-4">
                <h3 className="font-semibold text-lg">Styles & Material</h3>
                <div>
                    <label className={labelClasses}>Architectural Style</label>
                    <select name="architecturalStyle" value={buildingData.architecturalStyle} onChange={handleFormChange} className={commonInputClasses}>
                       <option>Contemporary</option><option>Neoclassical</option><option>Art Deco</option><option>Victorian</option><option>Mid-century Modern</option><option>Tudor</option>
                    </select>
                </div>
                <div>
                    <label className={labelClasses}>Primary Material Type</label>
                    <select name="materialType" value={buildingData.materialType} onChange={handleFormChange} className={commonInputClasses}>
                        <option>Type 1: Fire-Resistive</option><option>Type 2: Non-Combustible</option><option>Type 3: Ordinary</option><option>Type 4: Heavy Timber</option><option>Type 5: Wood-Framed</option>
                    </select>
                </div>
            </div>
        );
      case 3: // Efficiency
        return (
            <div className="space-y-6">
                <h3 className="font-semibold text-lg">Efficiency</h3>
                <div>
                    <label className={labelClasses}>Waste Reduction</label>
                    <div className="space-y-2">
                        <label className={checkboxLabelClasses}><input type="checkbox" checked={buildingData.wasteReduction.includes('Trash System')} onChange={() => handleMultiSelectChange('wasteReduction', 'Trash System')} /><span>Trash Chute/System</span></label>
                        <label className={checkboxLabelClasses}><input type="checkbox" checked={buildingData.wasteReduction.includes('Recycling System')} onChange={() => handleMultiSelectChange('wasteReduction', 'Recycling System')} /><span>Integrated Recycling System</span></label>
                    </div>
                </div>
                <div>
                    <label className={labelClasses}>Energy Efficiency</label>
                    <div className="space-y-2">
                        <label className={checkboxLabelClasses}><input type="checkbox" checked={buildingData.energyEfficiency.includes('Solar Power')} onChange={() => handleMultiSelectChange('energyEfficiency', 'Solar Power')} /><span>Solar Power</span></label>
                        <label className={checkboxLabelClasses}><input type="checkbox" checked={buildingData.energyEfficiency.includes('Solar Thermal')} onChange={() => handleMultiSelectChange('energyEfficiency', 'Solar Thermal')} /><span>Solar Thermal Water Heating</span></label>
                        <label className={checkboxLabelClasses}><input type="checkbox" checked={buildingData.energyEfficiency.includes('Geothermal')} onChange={() => handleMultiSelectChange('energyEfficiency', 'Geothermal')} /><span>Geothermal Heating/Cooling</span></label>
                        <label className={checkboxLabelClasses}><input type="checkbox" checked={buildingData.energyEfficiency.includes('Wind/Bioenergy')} onChange={() => handleMultiSelectChange('energyEfficiency', 'Wind/Bioenergy')} /><span>Wind/Bioenergy</span></label>
                    </div>
                </div>
                 <div>
                    <label className={labelClasses}>Resource Efficiency</label>
                    <div className="space-y-3">
                         <label className={checkboxLabelClasses}><input type="checkbox" name="resourceEfficiency.thermalMass" checked={buildingData.resourceEfficiency.thermalMass} onChange={handleFormChange} /><span>Utilize Thermal Mass (e.g., concrete, brick)</span></label>
                         <div>
                            <label className={labelClasses}>Building Orientation Notes</label>
                            <input type="text" name="resourceEfficiency.buildingOrientation" value={buildingData.resourceEfficiency.buildingOrientation} onChange={handleFormChange} className={commonInputClasses} placeholder="e.g., Maximize southern exposure"/>
                         </div>
                         <div>
                            <label className={labelClasses}>Envelope U-Value (Thermal Transmittance)</label>
                            <input type="number" step="0.01" name="resourceEfficiency.envelopeUValue" value={buildingData.resourceEfficiency.envelopeUValue} onChange={handleFormChange} className={commonInputClasses}/>
                         </div>
                    </div>
                </div>
                 <div>
                    <label className={labelClasses}>Water System</label>
                    <select name="waterFixtures" value={buildingData.waterFixtures} onChange={handleFormChange} className={commonInputClasses}>
                        <option>Standard</option><option>Low-Flow</option><option>Rainwater Harvesting</option>
                    </select>
                </div>
            </div>
        );
      case 4: // Additional
        return (
            <div className="space-y-4">
                <h3 className="font-semibold text-lg">Additional Considerations</h3>
                <div>
                    <label htmlFor="additionalFeatures" className={labelClasses}>Features & Notes</label>
                    <textarea id="additionalFeatures" name="additionalFeatures" value={buildingData.additionalFeatures} onChange={handleFormChange} className={commonInputClasses} rows={8} placeholder="e.g., Green roof, high-efficiency windows, smart HVAC, proximity to parks..."></textarea>
                </div>
            </div>
        );
      case 5: // Review
        return (
            <div className="space-y-4">
                <h3 className="font-semibold text-lg">Review Information</h3>
                <div className="text-sm space-y-2 p-4 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
                    <p><strong>Region:</strong> {buildingData.locationRegion}</p>
                    <p><strong>Type:</strong> {buildingData.housingType}, {buildingData.floors} floors</p>
                    <p><strong>Style:</strong> {buildingData.architecturalStyle} using {buildingData.materialType}</p>
                    <p><strong>Energy:</strong> {buildingData.energyEfficiency.join(', ') || 'None specified'}</p>
                </div>
                <p className="text-sm text-slate-500">Please review your selections. When you are ready, submit for a full sustainability analysis.</p>
            </div>
        );
      default: return null;
    }
  };

  const renderResults = () => {
    if (isSubmitting) return <div className="text-center p-8"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-500 mx-auto"></div><p className="mt-4">Analyzing and saving...</p></div>;
    if (submitError) return <div className="bg-red-100 dark:bg-red-900/50 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg">{submitError}</div>;
    if (!finalResult) return null;

    return (
        <div className="space-y-6">
             <div className="p-4 text-center bg-green-100 dark:bg-green-900/50 border border-green-400 dark:border-green-600 rounded-lg">
                <h3 className="font-semibold text-lg text-green-800 dark:text-green-300">Analysis Complete!</h3>
                {savedBuildingId && <p className="text-sm text-green-700 dark:text-green-400">Project saved with ID: {savedBuildingId}</p>}
            </div>
            <div className="text-center">
                <h3 className="text-lg font-medium text-slate-600 dark:text-slate-300 mb-2">Sustainability Score</h3>
                <p className="text-5xl font-bold text-emerald-500">{finalResult.sustainabilityScore}</p>
            </div>
            <div>
                <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-2">Summary</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">{finalResult.summary}</p>
            </div>
            <div>
                <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">Recommendations</h4>
                {Object.entries(finalResult.recommendations).map(([category, recs]) => (
                    <div key={category} className="mb-3">
                        <h5 className="font-semibold text-sm text-slate-600 dark:text-slate-300">{category}</h5>
                        <ul className="space-y-1 list-disc list-inside text-sm text-slate-600 dark:text-slate-400">
                            {recs.map((rec, i) => <li key={i}>{rec}</li>)}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
  };
  
  const steps = ['Basic', 'Styles', 'Efficiency', 'Additional', 'Review'];

  return (
    <main className="p-4 md:p-8 pt-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left Column */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 sticky top-24">
          <h2 className="text-xl font-semibold mb-4 text-emerald-600 dark:text-emerald-400">Site Analysis</h2>
          <div>
            <label htmlFor="locationRegion" className={labelClasses}>Where are you building?</label>
            <div className="flex gap-2">
              <select 
                id="locationRegion" 
                name="locationRegion" 
                value={buildingData.locationRegion}
                onChange={handleFormChange} 
                className={commonInputClasses}
              >
                <option value="">Select a Region</option>
                <option>Central</option><option>East</option><option>West</option><option>South</option><option>North</option><option>Puerto Rico</option>
              </select>
              <button onClick={handleAnalyzeLocation} disabled={!buildingData.locationRegion || isLocationLoading} className="px-4 py-2 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 disabled:bg-slate-400">
                {isLocationLoading ? '...' : 'Analyze'}
              </button>
            </div>
          </div>
          <div className="mt-4 min-h-[10rem]">
            {isLocationLoading && <div className="text-center p-4">Loading location data...</div>}
            {locationError && <div className="text-red-500 p-4">{locationError}</div>}
            {locationAnalysis && (
              <div className="space-y-3 text-sm">
                <div>
                  <h4 className="font-semibold text-slate-700 dark:text-slate-200">Weather Summary</h4>
                  <p className="text-slate-600 dark:text-slate-400">{locationAnalysis.weatherSummary}</p>
                </div>
                 <div>
                  <h4 className="font-semibold text-slate-700 dark:text-slate-200">Sustainability Measures</h4>
                  <ul className="list-disc list-inside text-slate-600 dark:text-slate-400">
                    {locationAnalysis.sustainabilityMeasures.map((measure, i) => <li key={i}>{measure}</li>)}
                  </ul>
                </div>
                 <div>
                  <h4 className="font-semibold text-slate-700 dark:text-slate-200">Transportation Notes</h4>
                  <p className="text-slate-600 dark:text-slate-400">{locationAnalysis.transportationNotes}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
           <h2 className="text-xl font-semibold mb-4 text-emerald-600 dark:text-emerald-400">Building Details</h2>
           
            {finalResult || isSubmitting || submitError ? renderResults() : (
                 <>
                    {/* Mini Nav Bar */}
                    <div className="flex border-b border-slate-200 dark:border-slate-700 mb-6">
                        {steps.map((step, index) => (
                            <button key={step} onClick={() => goToStep(index + 1)} className={`px-4 py-2 text-sm font-medium transition-colors ${currentStep === index + 1 ? 'border-b-2 border-emerald-500 text-emerald-600 dark:text-emerald-400' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}>
                                {step}
                            </button>
                        ))}
                    </div>

                    <div className="min-h-[20rem]">
                        {renderFormStep()}
                    </div>
                
                    {/* Form Navigation */}
                    <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
                        <button onClick={prevStep} disabled={currentStep === 1} className="px-4 py-2 bg-slate-200 dark:bg-slate-600 text-slate-800 dark:text-slate-200 font-semibold rounded-lg hover:bg-slate-300 dark:hover:bg-slate-500 disabled:opacity-50">
                            Previous
                        </button>
                        {currentStep < 5 ? (
                            <button onClick={nextStep} className="px-4 py-2 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600">
                                Next
                            </button>
                        ) : (
                            <button onClick={handleSubmit} disabled={isSubmitting} className="px-4 py-2 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 disabled:bg-slate-400">
                                {isSubmitting ? 'Submitting...' : 'Review & Submit'}
                            </button>
                        )}
                    </div>
                </>
            )}
        </div>
      </div>
    </main>
  );
};
