// Simple in-memory key-value store for demo purposes
// In production, this would use a real database like Supabase

interface KVRecord {
  key: string;
  value: any;
  timestamp: string;
}

class InMemoryKVStore {
  private store: Map<string, KVRecord> = new Map();

  async set(key: string, value: any): Promise<void> {
    this.store.set(key, {
      key,
      value,
      timestamp: new Date().toISOString()
    });
  }

  async get(key: string): Promise<KVRecord | null> {
    const record = this.store.get(key);
    return record || null;
  }

  async delete(key: string): Promise<boolean> {
    return this.store.delete(key);
  }

  async getByPrefix(prefix: string): Promise<KVRecord[]> {
    const results: KVRecord[] = [];
    for (const [key, record] of this.store.entries()) {
      if (key.startsWith(prefix)) {
        results.push(record);
      }
    }
    return results;
  }

  async clear(): Promise<void> {
    this.store.clear();
  }

  async keys(): Promise<string[]> {
    return Array.from(this.store.keys());
  }

  async values(): Promise<any[]> {
    return Array.from(this.store.values()).map(record => record.value);
  }

  async size(): Promise<number> {
    return this.store.size;
  }
}

// Create a singleton instance
const kvStore = new InMemoryKVStore();

// Export functions that match the expected interface
export async function set(key: string, value: any): Promise<void> {
  return kvStore.set(key, value);
}

export async function get(key: string): Promise<KVRecord | null> {
  return kvStore.get(key);
}

export async function del(key: string): Promise<boolean> {
  return kvStore.delete(key);
}

export async function getByPrefix(prefix: string): Promise<KVRecord[]> {
  return kvStore.getByPrefix(prefix);
}

export async function clear(): Promise<void> {
  return kvStore.clear();
}

export async function keys(): Promise<string[]> {
  return kvStore.keys();
}

export async function values(): Promise<any[]> {
  return kvStore.values();
}

export async function size(): Promise<number> {
  return kvStore.size();
}

// Initialize with some demo data
(async () => {
  try {
    // Check if we already have data
    const existingStartups = await getByPrefix('startup:');
    if (existingStartups.length === 0) {
      console.log('Initializing demo data in KV store...');
      
      // Demo startups
      const demoStartups = [
        {
          id: 'startup-1',
          name: 'TechNova',
          valuation: 4_500_000,
          stage: 'Seed',
          sector: 'Technology',
          revenue: 2_100_000,
          growthRate: 120,
          teamSize: 25,
          burnRate: 200_000,
          runway: 18,
          foundedYear: 2022,
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
          revenue: 3_800_000,
          growthRate: 95,
          teamSize: 42,
          burnRate: 350_000,
          runway: 14,
          foundedYear: 2021,
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
          revenue: 5_200_000,
          growthRate: 85,
          teamSize: 38,
          burnRate: 420_000,
          runway: 22,
          foundedYear: 2020,
          aiScore: 76,
          riskLevel: 'medium',
          recommendation: 'watch',
          uploadedAt: new Date().toISOString(),
          lastAnalyzed: new Date().toISOString(),
        }
      ];

      // Demo analyses
      const demoAnalyses = [
        {
          overallScore: 78,
          financialScore: 75,
          marketScore: 80,
          teamScore: 78,
          technologyScore: 82,
          riskFlags: ['Market Size Overstated'],
          recommendation: 'invest',
          confidence: 85,
          keyInsights: [
            'Strong financial fundamentals with consistent revenue growth',
            'Experienced team with proven track record',
            'Large addressable market in growing sector'
          ]
        },
        {
          overallScore: 82,
          financialScore: 88,
          marketScore: 85,
          teamScore: 80,
          technologyScore: 75,
          riskFlags: [],
          recommendation: 'invest',
          confidence: 92,
          keyInsights: [
            'Excellent financial performance with strong unit economics',
            'Healthcare market experiencing rapid digital transformation',
            'Proven product-market fit with enterprise customers'
          ]
        },
        {
          overallScore: 76,
          financialScore: 82,
          marketScore: 70,
          teamScore: 75,
          technologyScore: 78,
          riskFlags: ['High Competition', 'Customer Concentration'],
          recommendation: 'watch',
          confidence: 78,
          keyInsights: [
            'Solid financial metrics but facing increased competition',
            'Strong technology platform with good scalability',
            'Need to diversify customer base to reduce concentration risk'
          ]
        }
      ];

      // Store demo data
      for (let i = 0; i < demoStartups.length; i++) {
        await set(`startup:${demoStartups[i].id}`, demoStartups[i]);
        await set(`analysis:${demoStartups[i].id}`, demoAnalyses[i]);
      }
      
      console.log('Demo data initialized successfully');
    }
  } catch (error) {
    console.error('Error initializing demo data:', error);
  }
})();