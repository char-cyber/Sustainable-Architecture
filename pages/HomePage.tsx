import React from 'react';
import type { Page } from '../App';

interface HomePageProps {
  setPage: (page: Page) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ setPage }) => {
  return (
    <main className="h-full w-full flex items-center justify-center relative bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-gray-900 dark:to-emerald-900/60 p-4">
      {/* Background decorative SVG */}
      <div className="absolute inset-0 overflow-hidden opacity-10 dark:opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="a" patternUnits="userSpaceOnUse" width="80" height="80" patternTransform="scale(1) rotate(0)"><rect x="0" y="0" width="100%" height="100%" fill="hsla(0,0%,100%,0)"/><path d="M40 40 L0 80 M80 0 L40 40" stroke-width="1" stroke="hsl(150, 7%, 52%)" fill="none"/></pattern></defs><rect width="800%" height="800%" transform="translate(0,0)" fill="url(#a)"/></svg>
      </div>

      <div className="text-center z-10">
        <h1 className="text-4xl md:text-6xl font-extrabold text-emerald-800 dark:text-emerald-300 tracking-tight">
          Design a Greener Future
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400">
          Leverage AI to analyze and improve the sustainability of your architectural designs.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => setPage('addNewBuilding')}
            className="w-full sm:w-auto px-8 py-4 text-lg font-semibold text-white bg-emerald-600 rounded-full shadow-lg hover:bg-emerald-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-emerald-300 dark:focus:ring-emerald-800"
          >
            Add a New Building
          </button>
          <button
            onClick={() => setPage('viewMyBuildings')}
            className="w-full sm:w-auto px-8 py-4 text-lg font-semibold text-emerald-700 dark:text-emerald-300 bg-white/70 dark:bg-slate-800/50 backdrop-blur-sm rounded-full shadow-lg hover:bg-white dark:hover:bg-slate-800 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-emerald-300 dark:focus:ring-slate-700"
          >
            View My Buildings
          </button>
        </div>
      </div>
    </main>
  );
};