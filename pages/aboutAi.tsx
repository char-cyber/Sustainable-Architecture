import React from 'react';
import { SOURCE_URLS } from '../constants';

export const AboutAiPage: React.FC = () => {
    return (
        <main className="flex-1 overflow-y-auto p-4 md:p-8 pt-24">
            <a href='HomePage.tsx'className = "px-3 py-2 text-sm font-medium rounded-md transition-colors text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700/50"> Home </a>
            <div className="max-w-4xl mx-auto">
                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6 md:p-8 border border-slate-200 dark:border-slate-700">
                    <h2 className="text-2xl font-bold mb-4 text-emerald-600 dark:text-emerald-400">About Our AI Model</h2>
                    <p className="mb-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                        This is a specialized AI assistant designed to provide expert information on sustainable architecture and green building practices.
                    </p>
                    <p className="mb-2 text-slate-600 dark:text-slate-400 leading-relaxed">
                        Its knowledge is strictly derived from a curated list of leading industry resources, ensuring the information is accurate, relevant, and based on established standards and practices. The AI does not use general web knowledge and will only answer questions based on the content of the sources listed below.
                    </p>
                </div>

                <div className="mt-8">
                    <h3 className="text-lg font-semibold text-slate-600 dark:text-slate-300 mb-4">Knowledge Sources</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {SOURCE_URLS.map(source => (
                            <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer"
                               className="block p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-emerald-400 dark:hover:border-emerald-500 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1">
                                <p className="font-semibold text-emerald-700 dark:text-emerald-400 truncate">{source.name}</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Click to view source</p>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
};