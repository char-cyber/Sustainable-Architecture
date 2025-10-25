import React, { useState, useEffect } from 'react';
import { getBuildings } from '../services/geminiService';
import { SavedBuilding } from '../types';
import { LeafIcon } from '../components/icons/LeafIcon';

interface Props {
    onViewDetails: (building: SavedBuilding) => void;
}

export const ViewMyBuildingsPage: React.FC<Props> = ({ onViewDetails }) => {
    const [buildings, setBuildings] = useState<SavedBuilding[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBuildings = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const fetchedBuildings = await getBuildings();
                setBuildings(fetchedBuildings);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to fetch buildings.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchBuildings();
    }, []);

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="text-center p-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
                    <p className="mt-4 text-slate-500">Loading your saved buildings...</p>
                </div>
            );
        }

        if (error) {
            return <div className="text-center p-8 text-red-500">{error}</div>;
        }

        if (buildings.length === 0) {
            return (
                <div className="text-center p-8 text-slate-500">
                    <h3 className="text-lg font-semibold">No Saved Buildings</h3>
                    <p>You haven't added any buildings yet. Get started by creating a new one!</p>
                </div>
            );
        }

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {buildings.map(building => (
                    <div 
                        key={building._id}
                        onClick={() => onViewDetails(building)}
                        className="bg-white dark:bg-slate-800 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 p-5 cursor-pointer hover:shadow-xl hover:border-emerald-500 transition-all transform hover:-translate-y-1"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="text-lg font-bold text-emerald-600 dark:text-emerald-400 truncate">{building.buildingData.housingType || 'Untitled Project'}</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400">{building.buildingData.locationRegion}</p>
                            </div>
                            <div className="flex items-center space-x-1 text-sm font-bold text-emerald-500">
                                <span>{building.analysisResult.sustainabilityScore}</span>
                                <LeafIcon className="w-4 h-4" />
                            </div>
                        </div>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-4">
                            Created on: {building.createdAt ? new Date(building.createdAt).toLocaleDateString() : 'N/A'}
                        </p>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <main className="flex-1 overflow-y-auto p-4 md:p-8 pt-24">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-200">My Buildings</h2>
                {renderContent()}
            </div>
        </main>
    );
};