/**
 * Represents the data collected from the multi-step building form.
 */
export interface BuildingData {
  // Location
  locationRegion: 'Central' | 'East' | 'West' | 'South' | 'North' | 'Puerto Rico' | '';

  // Basics
  housingType: 'Luxury Apartment' | 'Studio Apartment' | 'Educational Center' | 'Community Center' | '';
  floors: '1-5' | '6-10' | '10-15' | '16-20' | '';
  roomsMin: number;
  roomsMax: number;
  elevators: number;
  spacePerRoom: '300-600 sq ft' | '500-800 sq ft' | '800-1100 sq ft' | '1100-1200 sq ft' | '1200+ sq ft' | '';
  
  // Style & Material
  architecturalStyle: 'Contemporary' | 'Neoclassical' | 'Art Deco' | 'Victorian' | 'Mid-century Modern' | 'Tudor' | '';
  materialType: 'Type 1: Fire-Resistive' | 'Type 2: Non-Combustible' | 'Type 3: Ordinary' | 'Type 4: Heavy Timber' | 'Type 5: Wood-Framed' | '';

  // Efficiency
  wasteReduction: string[];
  energyEfficiency: string[];
  resourceEfficiency: {
    thermalMass: boolean;
    buildingOrientation: string;
    envelopeUValue: number;
  };
  waterFixtures: 'Standard' | 'Low-Flow' | 'Rainwater Harvesting';

  // Additional
  additionalFeatures: string;
}

/**
 * Represents the AI-generated analysis of a selected geographical region.
 */
export interface LocationAnalysis {
  weatherSummary: string;
  sustainabilityMeasures: string[];
  transportationNotes: string;
}

/**
 * Represents the final, comprehensive sustainability analysis of the building.
 */
export interface AnalysisResult {
  sustainabilityScore: number;
  summary: string;
  recommendations: {
    'Energy Efficiency': string[];
    'Water Conservation': string[];
    'Sustainable Materials': string[];
    'Site & Waste Management': string[];
  };
}
