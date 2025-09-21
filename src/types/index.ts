export interface Startup {
  id: string;
  name: string;
  sector: string;
  stage: string;
  valuation: number;
  revenue: number;
  employees: number;
  fundingRounds: number;
  lastFunding: string;
  growthRate: number;
  burnRate: number;
  runwayMonths: number;
}

export interface BenchmarkData {
  metric: string;
  startup: number;
  sectorAverage: number;
  topQuartile: number;
}

export interface RiskIndicator {
  id: string;
  type: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  impact: string;
}

export interface InvestmentRecommendation {
  decision: 'invest' | 'watch' | 'decline';
  confidence: number;
  reasoning: string;
  keyFactors: string[];
  nextSteps: string[];
}

export interface DealNote {
  id: string;
  startupName: string;
  dateCreated: string;
  summary: string;
  strengths: string[];
  concerns: string[];
  marketOpportunity: string;
  teamAssessment: string;
  financialHighlights: string;
  recommendation: InvestmentRecommendation;
}