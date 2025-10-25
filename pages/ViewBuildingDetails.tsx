import React from 'react';
import { SavedBuilding, BuildingData } from '../types';

interface Props {
    building: SavedBuilding;
    onEdit: (building: SavedBuilding) => void;
}

// Helper function to determine the color based on the score
const getScoreColor = (score: number): string => {
    if (score >= 80) return 'text-emerald-500'; // Green for high scores
    if (score >= 50) return 'text-yellow-500'; // Yellow for medium scores
    return 'text-red-500'; // Red for low scores
};

// 1. NEW COMPONENT: SVG Circular Progress Bar
const CircularScoreGauge: React.FC<{ score: number }> = ({ score }) => {
    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    // Calculate how much of the circle (stroke-dashoffset) should be filled based on the score (out of 100)
    const offset = circumference - (score / 100) * circumference;
    const colorClass = getScoreColor(score);

    return (
        <div className="relative w-40 h-40">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 130 130">
                {/* Background Track */}
                <circle
                    cx="65" cy="65" r={radius}
                    strokeWidth="10"
                    fill="transparent"
                    className="text-slate-200 dark:text-slate-700"
                    stroke="currentColor"
                />
                {/* Progress Bar */}
                <circle
                    cx="65" cy="65" r={radius}
                    strokeWidth="10"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round" // Makes the end of the stroke rounded
                    className={`${colorClass} transition-all duration-1000 ease-out`}
                    stroke="currentColor"
                />
            </svg>
            {/* Score Text in Center */}
            <div className={`absolute top-0 left-0 w-full h-full flex items-center justify-center ${colorClass}`}>
                <p className="text-5xl font-extrabold drop-shadow-md">{score}</p>
            </div>
        </div>
    );
};


// 2. DataRow component remains the same (without index argument as before)
const DataRow: React.FC<{ label: string; value: React.ReactNode; index: number }> = ({ label, value, index }) => {
    const isEven = index % 2 === 0;
    const rowClasses = `py-3 px-4 sm:grid sm:grid-cols-3 sm:gap-4 ${
        isEven 
            ? 'bg-slate-50 dark:bg-slate-700/50' 
            : 'bg-white dark:bg-slate-800'
    }`;
    
    return (
        <div className={rowClasses}>
            <dt className="text-sm font-semibold text-slate-600 dark:text-slate-300">{label}</dt>
            <dd className="mt-1 text-sm text-slate-900 dark:text-slate-100 sm:mt-0 sm:col-span-2">
                {value || <span className="text-slate-400 dark:text-slate-500 italic">Not specified</span>}
            </dd>
        </div>
    );
};

const BuildingDataDisplay: React.FC<{ data: BuildingData }> = ({ data }) => {
    const dataPoints = [
        { label: "Region", value: data.locationRegion },
        { label: "Housing Type", value: data.housingType },
        { label: "Floors", value: data.floors },
        { label: "Rooms Range", value: `${data.roomsMin} - ${data.roomsMax}` },
        { label: "Elevators", value: data.elevators },
        { label: "Space per Room (sqft)", value: data.spacePerRoom },
        { label: "Architectural Style", value: data.architecturalStyle },
        { label: "Material Type", value: data.materialType },
        { label: "Waste Reduction", value: data.wasteReduction.join(', ') },
        { label: "Energy Efficiency", value: data.energyEfficiency.join(', ') },
        { label: "Water Fixtures", value: data.waterFixtures },
        { label: "Thermal Mass Used", value: data.resourceEfficiency.thermalMass ? 'Yes' : 'No' },
        { label: "Orientation Notes", value: data.resourceEfficiency.buildingOrientation },
        { label: "Envelope U-Value", value: data.resourceEfficiency.envelopeUValue },
        { label: "Additional Features", value: <p className="whitespace-pre-wrap">{data.additionalFeatures}</p> },
    ];
    
    return (
        <dl className="rounded-xl overflow-hidden shadow-inner border border-slate-200 dark:border-slate-700">
            {dataPoints.map((point, index) => (
                <DataRow key={index} index={index} label={point.label} value={point.value} />
            ))}
        </dl>
    );
};

export const ViewBuildingDetailsPage: React.FC<Props> = ({ building, onEdit }) => {
    const { analysisResult, buildingData } = building;
    // Ensure the score is treated as a number
    const score = Number(analysisResult.sustainabilityScore);

    return (
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="max-w-5xl mx-auto space-y-10">
                
                <header className="mb-8">
                    <h1 className="text-4xl font-extrabold text-slate-800 dark:text-slate-100 mb-2">{buildingData.projectName || 'Building Details'}</h1>
                    <p className="text-lg text-slate-500 dark:text-slate-400">Detailed report and saved input data.</p>
                </header>
                
                {/* Analysis Result Section (The Report Card) */}
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl p-6 md:p-10 border-2 border-emerald-500/50">
                    <h2 className="text-3xl font-bold mb-6 text-emerald-600 dark:text-emerald-400 border-b border-slate-200 dark:border-slate-700 pb-3">
                        Sustainability Report & Analysis
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* 3. IMPLEMENTATION: Score Block now uses the circular gauge */}
                        <div className="md:col-span-1 flex flex-col items-center justify-center border-r border-slate-200 dark:border-slate-700 md:pr-4">
                            <h3 className="text-lg font-semibold text-slate-600 dark:text-slate-300 mb-2 uppercase tracking-wider">Overall Score</h3>
                            <CircularScoreGauge score={score} /> 
                        </div>
                        
                        {/* Summary Block */}
                        <div className="md:col-span-3">
                            <h4 className="font-bold text-xl text-slate-700 dark:text-slate-200 mb-3">AI Summary</h4>
                            <p className="text-base text-slate-600 dark:text-slate-400 italic leading-relaxed">
                                &ldquo;{analysisResult.summary}&rdquo;
                            </p>
                        </div>
                    </div>
                    
                    {/* Recommendations Block */}
                    <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
                        <h4 className="font-bold text-2xl text-blue-600 dark:text-blue-400 mb-4">Improvement Recommendations</h4>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {Object.entries(analysisResult.recommendations).map(([category, recs]) => (
                                <div key={category} className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
                                    <h5 className="font-bold text-md text-slate-800 dark:text-slate-200 mb-2 border-b border-slate-200 dark:border-slate-600 pb-1">{category}</h5>
                                    <ul className="space-y-1 list-disc list-inside text-sm text-slate-600 dark:text-slate-400 ml-2">
                                        {(recs as string[]).map((rec, i) => <li key={i}>{rec}</li>)}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Building Data Section */}
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 md:p-10 border border-slate-200 dark:border-slate-700">
                    <h2 className="text-3xl font-bold mb-6 text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 pb-3">
                        Input Data Specifications
                    </h2>
                    
                    <BuildingDataDisplay data={buildingData} />
                    
                    <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-700 text-right">
                        <button
                            onClick={() => onEdit(building)}
                            className="px-8 py-3 bg-emerald-600 text-white font-bold rounded-full shadow-lg hover:bg-emerald-700 transition-all transform hover:scale-105"
                        >
                            Edit Building Specifications
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};