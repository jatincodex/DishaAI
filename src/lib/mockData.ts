import { Startup, BenchmarkData, RiskIndicator, DealNote } from '../types/index';

export const mockStartup: Startup = {
  id: '1',
  name: 'TechNova',
  sector: 'Enterprise SaaS',
  stage: 'Series A',
  valuation: 4500000,
  revenue: 1200000,
  employees: 28,
  fundingRounds: 2,
  lastFunding: '2024-08-15',
  growthRate: 78,
  burnRate: 85000,
  runwayMonths: 14
};

export const benchmarkData: BenchmarkData[] = [
  { metric: 'Revenue Growth', startup: 78, sectorAverage: 120, topQuartile: 200 },
  { metric: 'Employee Growth', startup: 65, sectorAverage: 45, topQuartile: 80 },
  { metric: 'Customer Acquisition', startup: 35, sectorAverage: 35, topQuartile: 50 },
  { metric: 'Burn Multiple', startup: 2.4, sectorAverage: 1.8, topQuartile: 1.2 },
  { metric: 'Gross Margin', startup: 72, sectorAverage: 72, topQuartile: 85 },
  { metric: 'Net Revenue Retention', startup: 108, sectorAverage: 110, topQuartile: 130 }
];

export const riskIndicators: RiskIndicator[] = [
  {
    id: '1',
    type: 'high',
    title: 'Market Size Overstated',
    description: 'TAM projections appear inflated by 40-60% compared to industry benchmarks',
    impact: 'Actual addressable market may limit long-term growth potential'
  },
  {
    id: '2',
    type: 'high',
    title: 'Customer Concentration Risk',
    description: 'Top 3 customers represent 65% of total revenue',
    impact: 'Loss of major customer could significantly impact revenue'
  },
  {
    id: '3',
    type: 'medium',
    title: 'Competitive Market Positioning',
    description: 'Operating in highly competitive enterprise software market',
    impact: 'May face pricing pressure from established players'
  },
  {
    id: '4',
    type: 'medium',
    title: 'Limited Runway',
    description: '14 months of runway at current burn rate',
    impact: 'Will need to raise additional funding within 12 months'
  },
  {
    id: '5',
    type: 'low',
    title: 'Regulatory Compliance',
    description: 'Operating in regulated industry with compliance requirements',
    impact: 'Ongoing compliance costs and potential regulatory changes'
  }
];

export const mockDealNote: DealNote = {
  id: '1',
  startupName: 'TechNova',
  dateCreated: '2024-12-15',
  summary: 'Enterprise SaaS company showing moderate growth metrics with developing product-market fit in the workflow automation space. Revenue growth of 78% YoY with expanding customer base, though market size concerns and concentration risk exist.',
  strengths: [
    'Solid revenue growth (78% YoY)',
    'Experienced founding team with domain expertise',
    'Developing product-market fit with enterprise customers',
    'Competitive gross margins (72%)',
    'Good customer retention metrics'
  ],
  concerns: [
    'Market size projections appear overstated',
    'High customer concentration (top 3 = 65% revenue)',
    'Limited runway (14 months)',
    'Intense competition from established players',
    'Higher than average burn multiple'
  ],
  marketOpportunity: 'Operating in the $12B enterprise workflow automation market, which is expected to grow at 15% CAGR. However, TAM projections may be inflated by 40-60% based on industry analysis.',
  teamAssessment: 'Founding team has strong technical background and relevant industry experience. CEO previously scaled similar company to $50M ARR.',
  financialHighlights: 'ARR: $1.2M, Growth: 78% YoY, Gross Margin: 72%, Burn: $85K/month, Runway: 14 months',
  recommendation: {
    decision: 'watch',
    confidence: 65,
    reasoning: 'Decent fundamentals but key risks around market sizing and customer concentration need addressing',
    keyFactors: [
      'Validate realistic market opportunity',
      'Diversify customer base significantly',
      'Extend runway through efficient growth',
      'Demonstrate scalable go-to-market strategy'
    ],
    nextSteps: [
      'Request detailed market analysis with bottom-up TAM',
      'Schedule follow-up in 3 months',
      'Monitor customer diversification progress',
      'Review updated metrics and fundraising plans'
    ]
  }
};

export const portfolioData = [
  { month: 'Jan', investments: 12, valuations: 45.2, exits: 2 },
  { month: 'Feb', investments: 8, valuations: 52.1, exits: 1 },
  { month: 'Mar', investments: 15, valuations: 38.9, exits: 3 },
  { month: 'Apr', investments: 11, valuations: 41.7, exits: 2 },
  { month: 'May', investments: 9, valuations: 48.3, exits: 1 },
  { month: 'Jun', investments: 13, valuations: 55.8, exits: 4 }
];

export const sectorBreakdown = [
  { sector: 'Enterprise SaaS', count: 28, percentage: 35 },
  { sector: 'FinTech', count: 18, percentage: 22.5 },
  { sector: 'HealthTech', count: 14, percentage: 17.5 },
  { sector: 'E-commerce', count: 12, percentage: 15 },
  { sector: 'Other', count: 8, percentage: 10 }
];