
import React, { useState } from 'react';
import  HomePage  from './pages/HomePage';
import ChatPage  from './pages/text';
import { AboutAiPage } from './pages/about_ai';
import CustomizeBuildingPage from './pages/newbuilding';
import { LeafIcon } from './components/icons/LeafIcon';

type Page = 'home' | 'chat' | 'customize' | 'about';

const App: React.FC = () => {
    const [page, setPage] = useState<Page>('home');

    const navButtonClasses = (pageName: Page) => 
        `px-3 py-2 text-sm font-medium rounded-md transition-colors ${
            page === pageName 
            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300' 
            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700/50'
        }`;

    const renderPage = () => {
        switch(page) {
            case 'home':
                return <HomePage setPage={setPage} />;
            case 'chat':
                return <ChatPage />;
            case 'customize':
                return <CustomizeBuildingPage />;
            case 'about':
                return <AboutAiPage />;
            default:
                return <HomePage setPage={setPage} />;
        }
    };

    return (
        <div className="flex flex-col h-screen max-h-screen font-sans bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
            <header className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 backdrop-blur-sm z-10 shrink-0">
                <div 
                    className="flex items-center cursor-pointer" 
                    onClick={() => setPage('home')}
                    aria-label="Go to home page"
                    role="button"
                >
                    <LeafIcon className="h-8 w-8 text-emerald-500" />
                    <h1 className="ml-3 text-xl font-bold text-slate-800 dark:text-slate-200">
                        Sustainable Architecture AI
                    </h1>
                </div>
                <nav className="hidden md:flex items-center space-x-2">
                    <button onClick={() => setPage('home')} className={navButtonClasses('home')}>
                        Home
                    </button>
                    <button onClick={() => setPage('chat')} className={navButtonClasses('chat')}>
                        AI Chat
                    </button>
                    <button onClick={() => setPage('customize')} className={navButtonClasses('customize')}>
                        Customize Building
                    </button>
                    <button onClick={() => setPage('about')} className={navButtonClasses('about')}>
                        About AI
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
