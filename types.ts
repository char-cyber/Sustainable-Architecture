
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


export const SOURCE_URLS = [
  { name: "GSA - Sustainable Design", url: "https://www.gsa.gov/real-estate/design-and-construction/sustainability/sustainable-design" },
  { name: "AIA - Putting Sustainability into Practice", url: "https://www.aia.org/resource-center/putting-sustainability-into-practice" },
  { name: "Barker Associates - What is Sustainable Architecture?", url: "https://www.barker-associates.co.uk/service/architecture/what-is-sustainable-architecture/" },
  { name: "Cemex Ventures - Green & Sustainable Architecture", url: "https://www.cemexventures.com/green-sustainable-architecture/" },
  { name: "USGBC - LEED", url: "https://www.usgbc.org/leed" },
  { name: "Passive House Institute", url: "https://passivehouse.com/02_informations/01_whatisapassivehouse/01_whatisapassivehouse.htm" },
  { name: "International Living Future Institute - Living Building Challenge", url: "https://living-future.org/lbc/" }
];
