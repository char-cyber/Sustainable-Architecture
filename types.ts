
export interface BuildingData {
  purpose: 'Residential' | 'Commercial' | 'Industrial' | 'Mixed-Use';
  floors: number;
  area: number;
  location: 'Urban' | 'Suburban' | 'Rural';
  materials: string;
  energySource: 'Grid' | 'Solar' | 'Geothermal' | 'Mixed';
  waterSystem: 'Standard Municipal' | 'Rainwater Harvesting' | 'Greywater Recycling';
  additionalFeatures: string;
}

export interface AnalysisResult {
  sustainabilityScore: number;
  pros: string[];
  cons:string[];
  suggestions: string[];
  summary: string;
}
