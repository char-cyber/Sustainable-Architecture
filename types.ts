
export interface BuildingData {
  purpose: 'Residential' | 'Commercial' | 'Mixed-Use' | 'Industrial';
  floors: number;
  area: number;
  location: 'Urban' | 'Suburban' | 'Rural';
  materials: string;
  energySource: string;
  waterSystem: string;
  additionalFeatures: string;
}

export interface Suggestion {
  category: string;
  recommendations: string[];
}

export interface AnalysisResult {
  score: number;
  summary: string;
  suggestions: Suggestion[];
}
