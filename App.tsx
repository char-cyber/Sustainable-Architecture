import React, { useState } from 'react';
import { HomePage } from './pages/HomePage';
import { AboutAiPage } from './pages/aboutAi';
import { AddNewBuildingPage } from './pages/addNewBuilding';
import { ViewMyBuildingsPage } from './pages/viewMyBuildings';
import { AboutProjPage } from './pages/aboutProj';
import { LeafIcon } from './components/icons/LeafIcon';
import { ChatPage } from './pages/ChatPage';
import { CustomizeBuildingPage } from './pages/CustomizeBuildingPage';

export type Page = 'home' | 'addNewBuilding' | 'viewMyBuildings' | 'aboutProj' | 'aboutAi';

const App: React.FC = () => {
    const [page, setPage] = useState<Page>('home');

    const navButtonClasses = `px-3 py-2 text-sm font-medium rounded-md transition-colors text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700/50`;

    const renderPage = () => {
        switch(page) {
            case 'home':
                return <HomePage setPage={setPage} />;
                case 'addNewBuilding':
                  return <AddNewBuildingPage setPage={setPage} />;
                case 'textbuilding':
                  return <CustomizeBuildingPage setPage={setPage} />;
            case 'viewMyBuildings':
                return <ViewMyBuildingsPage />;
            case 'aboutProj':
                return <AboutProjPage />;
            case 'aboutAi':
                return <AboutAiPage />;
            default:
                return <HomePage setPage={setPage} />;
        }
    };

    return (
        <div className="flex flex-col h-screen max-h-screen font-sans bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
            <header className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 bg-transparent z-10">
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
                    <button onClick={() => setPage('aboutProj')} className={navButtonClasses}>
                        About
                    </button>
                    <button onClick={() => setPage('aboutAi')} className={navButtonClasses}>
                        Our AI Model
                    </button>
                </nav>
            </header>
            
            <div className="flex-1 overflow-y-auto">
              {renderPage()}
            </div>
        </div>
    );
};

export default App;