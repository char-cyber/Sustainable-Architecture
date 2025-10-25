import React from 'react';

export const AboutProjPage: React.FC = () => {
    return (
        <main className="flex-1 overflow-y-auto p-4 md:p-8 pt-24">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6 md:p-8 border border-slate-200 dark:border-slate-700">
                    <h2 className="text-2xl font-bold mb-4 text-emerald-600 dark:text-emerald-400">About the Project</h2>
                    <p className="text-slate-600 dark:text-slate-400">
                        This page is under construction. Information about the goals and technology behind this application will be available here soon.
                    </p>
                </div>
            </div>
        </main>
    );
};