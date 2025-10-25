
import React from 'react';

interface ScoreGaugeProps {
  score: number;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({ score }) => {
  const getScoreColor = (s: number) => {
    if (s < 40) return 'text-red-500';
    if (s < 75) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getTrackColor = (s: number) => {
    if (s < 40) return 'stroke-red-500';
    if (s < 75) return 'stroke-yellow-500';
    return 'stroke-green-500';
  }

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-48 h-48 mx-auto">
      <svg className="w-full h-full" viewBox="0 0 140 140">
        <circle
          className="stroke-current text-gray-200"
          strokeWidth="10"
          fill="transparent"
          r={radius}
          cx="70"
          cy="70"
        />
        <circle
          className={`transform -rotate-90 origin-center transition-all duration-1000 ease-out ${getTrackColor(score)}`}
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx="70"
          cy="70"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className={`text-5xl font-bold ${getScoreColor(score)}`}>
          {score}
        </span>
        <span className="text-sm font-medium text-gray-500">/ 100</span>
      </div>
    </div>
  );
};
