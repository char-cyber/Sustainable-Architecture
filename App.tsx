import React, { useState } from 'react';
import { HomePage } from './pages/HomePage';
import { AboutAiPage } from './pages/aboutAi';
import { AddNewBuildingPage } from './pages/addNewBuilding';
import { ViewMyBuildingsPage } from './pages/viewMyBuildings';
import { AboutProjPage } from './pages/aboutProj';
import { ViewBuildingDetailsPage } from './pages/ViewBuildingDetails';
import { EditBuildingPage } from './pages/editBuilding';
import { LeafIcon } from './components/icons/LeafIcon';
import { SavedBuilding } from './types';
import LoginPage from './pages/login/loginForm';

export type Page = 'home' | 'addNewBuilding' | 'viewMyBuildings' | 'aboutProj' | 'aboutAi' | 'viewBuildingDetails' | 'editBuilding';

const App: React.FC = () => {
    const [page, setPage] = useState<Page>('home');
    const [selectedBuilding, setSelectedBuilding] = useState<SavedBuilding | null>(null);

    const navButtonClasses = `px-3 py-2 text-sm font-medium rounded-md transition-colors text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700/50`;

    const handleViewDetails = (building: SavedBuilding) => {
        setSelectedBuilding(building);
        setPage('viewBuildingDetails');
    };
    
    const handleEditBuilding = (building: SavedBuilding) => {
        setSelectedBuilding(building);
        setPage('editBuilding');
    };

    const handleSaveComplete = (savedBuilding: SavedBuilding) => {
        setSelectedBuilding(savedBuilding);
        setPage('viewBuildingDetails');
    };

    const renderPage = () => {
        switch(page) {
            case 'home':
                return <HomePage setPage={setPage} />;
            case 'addNewBuilding':
                return <AddNewBuildingPage onSaveComplete={handleSaveComplete} />;
            case 'logIn':
                return < LoginPage />;
            case 'viewMyBuildings':
                return <ViewMyBuildingsPage onViewDetails={handleViewDetails} />;
            case 'aboutProj':
                return <AboutProjPage />;
            case 'aboutAi':
                return <AboutAiPage />;
            case 'viewBuildingDetails':
                if (!selectedBuilding) {
                    setPage('viewMyBuildings'); // Redirect if no building is selected
                    return null;
                }
                return <ViewBuildingDetailsPage building={selectedBuilding} onEdit={handleEditBuilding} />;
            case 'editBuilding':
                 if (!selectedBuilding) {
                    setPage('viewMyBuildings'); // Redirect if no building is selected
                    return null;
                }
                return <EditBuildingPage building={selectedBuilding} onSaveComplete={handleSaveComplete} />;
            default:
                return <HomePage setPage={setPage} />;
        }
    };

    return (
        <div className="flex flex-col h-screen max-h-screen font-sans bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
            {/* MODIFIED: Removed 'absolute top-0 left-0 right-0', added 'bg-slate-100 dark:bg-slate-900' for a solid background, and added 'sticky top-0' to keep it at the top when scrolling. */}
            <header className="flex items-center justify-between p-4 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 z-10 sticky top-0">
                <div 
                    className="flex items-center cursor-pointer group" 
                    onClick={() => setPage('home')}
                    aria-label="Go to home page"
                    role="button"
                >
                    <LeafIcon className="h-8 w-8 text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-500 transition-colors" />
                    <h1 className="ml-3 text-xl font-bold text-slate-800 dark:text-slate-200 group-hover:text-slate-600 dark:group-hover:text-white transition-colors">
                        Sustainable Architecture AI
                    </h1>
                </div>
                <nav className="flex items-center space-x-2">
                    <button onClick={() => setPage('home')} className={navButtonClasses}>
                        Home
                    </button>
                    <button onClick={() => setPage('logIn')} className={navButtonClasses}>
                        Log In
                    </button>
                    <button onClick={() => setPage('aboutProj')} className={navButtonClasses}>
                        About
                    </button>
                    <button onClick={() => setPage('aboutAi')} className={navButtonClasses}>
                        Our AI Model
                    </button>
                </nav>
            </header>
            
            {/* MODIFIED: The header is no longer absolutely positioned, so the content wrapper no longer needs a top offset. The existing flex-1 handles the rest. */}
            <div className="flex-1 overflow-y-auto">
              {renderPage()}
            </div>
        </div>
    );
};

export default App;