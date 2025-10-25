import React from 'react';
import { SavedBuilding, BuildingData } from '../types';

interface Props {
    building: SavedBuilding;
    onEdit: (building: SavedBuilding) => void;
}

const DataRow: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
    <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4">
        <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</dt>
        <dd className="mt-1 text-sm text-slate-900 dark:text-slate-200 sm:mt-0 sm:col-span-2">{value || 'N/A'}</dd>
    </div>
);

const BuildingDataDisplay: React.FC<{ data: BuildingData }> = ({ data }) => {
    return (
        <dl className="divide-y divide-slate-200 dark:divide-slate-700">
            <DataRow label="Region" value={data.locationRegion} />
            <DataRow label="Housing Type" value={data.housingType} />
            <DataRow label="Floors" value={data.floors} />
            <DataRow label="Rooms" value={`${data.roomsMin} - ${data.roomsMax}`} />
            <DataRow label="Elevators" value={data.elevators} />
            <DataRow label="Space per Room" value={data.spacePerRoom} />
            <DataRow label="Architectural Style" value={data.architecturalStyle} />
            <DataRow label="Material Type" value={data.materialType} />
            <DataRow label="Waste Reduction" value={data.wasteReduction.join(', ')} />
            <DataRow label="Energy Efficiency" value={data.energyEfficiency.join(', ')} />
            <DataRow label="Water Fixtures" value={data.waterFixtures} />
            <DataRow label="Thermal Mass" value={data.resourceEfficiency.thermalMass ? 'Yes' : 'No'} />
            <DataRow label="Orientation Notes" value={data.resourceEfficiency.buildingOrientation} />
            <DataRow label="Envelope U-Value" value={data.resourceEfficiency.envelopeUValue} />
            <DataRow label="Additional Features" value={<p className="whitespace-pre-wrap">{data.additionalFeatures}</p>} />
        </dl>
    );
};

export const ViewBuildingDetailsPage: React.FC<Props> = ({ building, onEdit }) => {
    const { analysisResult, buildingData } = building;

    return (
        <main className="flex-1 overflow-y-auto p-4 md:p-8 pt-24">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Analysis Result Section */}
                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6 md:p-8 border border-slate-200 dark:border-slate-700">
                    <h2 className="text-2xl font-bold mb-4 text-emerald-600 dark:text-emerald-400">Sustainability Report</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                        <div className="md:col-span-1 flex flex-col items-center justify-center">
                            <h3 className="text-lg font-medium text-slate-600 dark:text-slate-300">Sustainability Score</h3>
                            <p className="text-6xl font-bold text-emerald-500 my-2">{analysisResult.sustainabilityScore}</p>
                        </div>
                        <div className="md:col-span-2 text-left">
                             <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-2">AI Summary</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">{analysisResult.summary}</p>
                        </div>
                    </div>
                    <div className="mt-6">
                        <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">Recommendations</h4>
                        {Object.entries(analysisResult.recommendations).map(([category, recs]) => (
                            <div key={category} className="mb-3">
                                <h5 className="font-semibold text-sm text-slate-600 dark:text-slate-300">{category}</h5>
                                <ul className="space-y-1 list-disc list-inside text-sm text-slate-600 dark:text-slate-400">
                                    {(recs as string[]).map((rec, i) => <li key={i}>{rec}</li>)}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Building Data Section */}
                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6 md:p-8 border border-slate-200 dark:border-slate-700">
                    <h2 className="text-2xl font-bold mb-4 text-slate-700 dark:text-slate-300">Your Building Data</h2>
                    <BuildingDataDisplay data={buildingData} />
                    <div className="mt-6 text-right">
                        <button
                            onClick={() => onEdit(building)}
                            className="px-6 py-2 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
                        >
                            Edit Building
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};