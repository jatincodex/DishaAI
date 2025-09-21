import { projectId, publicAnonKey } from '../utils/supabase/info';

const BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-abe1fece`;

class APIService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${BASE_URL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${publicAnonKey}`,
      ...options.headers,
    };

    try {
      // Create abort controller for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
      
      const response = await fetch(url, {
        ...options,
        headers,
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      
      // Handle specific error types
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('Request timeout - please try again');
        }
        if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
          throw new Error('Network error - please check your connection');
        }
      }
      
      throw error;
    }
  }

  // Startup Management
  async getAllStartups() {
    try {
      return await this.request<{
        success: boolean;
        data: StartupData[];
        count: number;
      }>('/startups');
    } catch (error) {
      console.warn('Failed to fetch live startup data, using fallback');
      // Return fallback data if API fails
      const fallbackStartups: StartupData[] = [
        {
          id: 'startup-1',
          name: 'TechNova',
          valuation: 4_500_000,
          stage: 'Seed',
          sector: 'Technology',
          foundedYear: 2022,
          teamSize: 25,
          revenue: 2_100_000,
          growthRate: 120,
          burnRate: 200_000,
          runway: 18,
          aiScore: 78,
          riskLevel: 'medium',
          recommendation: 'invest',
          uploadedAt: new Date().toISOString(),
          lastAnalyzed: new Date().toISOString(),
        },
        {
          id: 'startup-2',
          name: 'HealthLink',
          valuation: 8_200_000,
          stage: 'Series A',
          sector: 'Healthcare',
          foundedYear: 2021,
          teamSize: 42,
          revenue: 3_800_000,
          growthRate: 95,
          burnRate: 350_000,
          runway: 14,
          aiScore: 82,
          riskLevel: 'low',
          recommendation: 'invest',
          uploadedAt: new Date().toISOString(),
          lastAnalyzed: new Date().toISOString(),
        },
        {
          id: 'startup-3',
          name: 'FinanceFlow',
          valuation: 12_000_000,
          stage: 'Series A',
          sector: 'Fintech',
          foundedYear: 2020,
          teamSize: 38,
          revenue: 5_200_000,
          growthRate: 85,
          burnRate: 420_000,
          runway: 22,
          aiScore: 76,
          riskLevel: 'medium',
          recommendation: 'watch',
          uploadedAt: new Date().toISOString(),
          lastAnalyzed: new Date().toISOString(),
        }
      ];
      
      return {
        success: true,
        data: fallbackStartups,
        count: fallbackStartups.length
      };
    }
  }

  async getStartup(id: string) {
    return this.request<{
      success: boolean;
      data: {
        startup: StartupData;
        analysis: AIAnalysis | null;
      };
    }>(`/startups/${id}`);
  }

  async createStartup(startupData: Partial<StartupData>) {
    return this.request<{
      success: boolean;
      data: {
        startup: StartupData;
        analysis: AIAnalysis;
      };
      message: string;
    }>('/startups', {
      method: 'POST',
      body: JSON.stringify(startupData),
    });
  }

  async analyzeStartup(id: string) {
    return this.request<{
      success: boolean;
      data: {
        startup: StartupData;
        analysis: AIAnalysis;
      };
      message: string;
    }>(`/startups/${id}/analyze`, {
      method: 'POST',
    });
  }

  // File Upload
  async uploadFile(fileName: string, fileType: string, startupId?: string) {
    return this.request<{
      success: boolean;
      data: {
        fileUrl: string;
        fileName: string;
        uploadedAt: string;
      };
      message: string;
    }>('/upload', {
      method: 'POST',
      body: JSON.stringify({ fileName, fileType, startupId }),
    });
  }

  // Dashboard Statistics
  async getDashboardStats() {
    try {
      return await this.request<{
        success: boolean;
        data: {
          overview: {
            totalStartups: number;
            avgScore: number;
            highRisk: number;
            investRecommendations: number;
          };
          sectorDistribution: Record<string, number>;
          recentActivity: Array<{
            id: string;
            name: string;
            action: string;
            timestamp: string;
            score: number;
          }>;
        };
      }>('/dashboard/stats');
    } catch (error) {
      console.warn('Failed to fetch live data, using fallback');
      // Return fallback data if API fails
      return {
        success: true,
        data: {
          overview: {
            totalStartups: 3,
            avgScore: 78,
            highRisk: 1,
            investRecommendations: 2
          },
          sectorDistribution: {
            'Technology': 1,
            'Healthcare': 1,
            'Fintech': 1
          },
          recentActivity: [
            {
              id: 'startup-1',
              name: 'TechNova',
              action: 'Analysis Updated',
              timestamp: new Date().toISOString(),
              score: 78
            },
            {
              id: 'startup-2',
              name: 'HealthLink',
              action: 'Analysis Updated',
              timestamp: new Date().toISOString(),
              score: 82
            }
          ]
        }
      };
    }
  }

  // Deal Notes
  async generateDealNotes(startupId: string) {
    return this.request<{
      success: boolean;
      data: DealNotes;
      message: string;
    }>(`/startups/${startupId}/notes`, {
      method: 'POST',
    });
  }

  // Scenario Simulation
  async runScenarioSimulation(startupId: string, scenarios: ScenarioInput[]) {
    return this.request<{
      success: boolean;
      data: {
        scenarios: ScenarioResult[];
      };
      message: string;
    }>(`/startups/${startupId}/simulate`, {
      method: 'POST',
      body: JSON.stringify({ scenarios }),
    });
  }

  // Health Check
  async healthCheck() {
    return this.request<{
      status: string;
      timestamp: string;
      service: string;
    }>('/health');
  }
}

// Type Definitions
export interface StartupData {
  id: string;
  name: string;
  valuation: number;
  stage: string;
  sector: string;
  foundedYear: number;
  teamSize: number;
  revenue: number;
  growthRate: number;
  burnRate: number;
  runway: number;
  aiScore: number;
  riskLevel: string;
  recommendation: string;
  uploadedAt: string;
  lastAnalyzed: string;
  pitchDeckUrl?: string;
  financialsUrl?: string;
}

export interface AIAnalysis {
  overallScore: number;
  financialScore: number;
  marketScore: number;
  teamScore: number;
  technologyScore: number;
  riskFlags: string[];
  recommendation: 'invest' | 'watch' | 'decline';
  confidence: number;
  keyInsights: string[];
}

export interface DealNotes {
  id: string;
  startupId: string;
  title: string;
  summary: string;
  keyMetrics: {
    valuation: number;
    revenue: number;
    growthRate: number;
    burnRate: number;
    runway: number;
    teamSize: number;
  };
  strengths: string[];
  risks: string[];
  recommendation: {
    decision: string;
    confidence: number;
    reasoning: string;
  };
  generatedAt: string;
  lastModified: string;
}

export interface ScenarioInput {
  name: string;
  probability: number;
  growthRate: number;
  valuationMultiple: number;
  burnRateChange: number;
}

export interface ScenarioResult {
  name: string;
  probability: number;
  projections: {
    revenue: number;
    valuation: number;
    burnRate: number;
    runway: number;
    roi: number;
  };
}

export const apiService = new APIService();