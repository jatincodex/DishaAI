import { Hono } from 'npm:hono';
import { logger } from 'npm:hono/logger';
import { cors } from 'npm:hono/cors';
import { createClient } from 'npm:@supabase/supabase-js@2';
import * as kv from './kv_store.tsx';

const app = new Hono();

// Middleware
app.use('*', logger(console.log));
app.use('*', cors({
  origin: '*',
  allowHeaders: ['*'],
  allowMethods: ['*'],
}));

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
);

// Initialize storage buckets
async function initializeStorage() {
  const bucketName = 'make-abe1fece-startup-docs';
  try {
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === bucketName);
    
    if (!bucketExists) {
      await supabase.storage.createBucket(bucketName, { public: false });
      console.log('Created storage bucket:', bucketName);
    }
  } catch (error) {
    console.error('Storage initialization error:', error);
  }
}

// Initialize storage on startup
initializeStorage();

// Startup data schema
interface StartupData {
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

// AI Analysis Results
interface AIAnalysis {
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

// Mock AI Analysis Engine
function generateAIAnalysis(startup: Partial<StartupData>): AIAnalysis {
  const financialScore = Math.min(95, Math.max(20, 
    (startup.revenue || 0) / 1000000 * 30 + 
    (startup.growthRate || 0) * 0.8 + 
    Math.max(0, 24 - (startup.burnRate || 0) / 100000) * 2
  ));
  
  const marketScore = Math.min(95, Math.max(25, 
    70 + (Math.random() - 0.5) * 40
  ));
  
  const teamScore = Math.min(95, Math.max(30, 
    (startup.teamSize || 0) * 8 + 40 + (Math.random() - 0.5) * 20
  ));
  
  const technologyScore = Math.min(95, Math.max(35, 
    65 + (Math.random() - 0.5) * 30
  ));
  
  const overallScore = Math.round(
    (financialScore * 0.3 + marketScore * 0.25 + teamScore * 0.25 + technologyScore * 0.2)
  );
  
  const riskFlags: string[] = [];
  if (financialScore < 40) riskFlags.push('Low Financial Performance');
  if ((startup.burnRate || 0) > 500000) riskFlags.push('High Burn Rate');
  if ((startup.runway || 0) < 12) riskFlags.push('Short Runway');
  if (marketScore < 50) riskFlags.push('Market Size Concerns');
  
  let recommendation: 'invest' | 'watch' | 'decline';
  if (overallScore >= 75 && riskFlags.length <= 1) recommendation = 'invest';
  else if (overallScore >= 50) recommendation = 'watch';
  else recommendation = 'decline';
  
  const keyInsights = [
    `Strong ${financialScore >= 70 ? 'financial' : marketScore >= 70 ? 'market' : 'team'} fundamentals`,
    `${riskFlags.length === 0 ? 'Low' : riskFlags.length === 1 ? 'Moderate' : 'High'} risk profile`,
    `${startup.growthRate && startup.growthRate > 100 ? 'Rapid growth trajectory' : 'Steady growth potential'}`,
  ];
  
  return {
    overallScore,
    financialScore: Math.round(financialScore),
    marketScore: Math.round(marketScore),
    teamScore: Math.round(teamScore),
    technologyScore: Math.round(technologyScore),
    riskFlags,
    recommendation,
    confidence: Math.round(80 + Math.random() * 15),
    keyInsights,
  };
}

// Routes

// Get all startups
app.get('/make-server-abe1fece/startups', async (c) => {
  try {
    const startups = await kv.getByPrefix('startup:');
    const validStartups = startups.map(s => s?.value).filter(s => s && s.id);
    return c.json({ 
      success: true, 
      data: validStartups,
      count: validStartups.length 
    });
  } catch (error) {
    console.error('Error fetching startups:', error);
    return c.json({ 
      success: false, 
      error: 'Failed to fetch startups',
      data: [],
      count: 0
    }, 500);
  }
});

// Get single startup with analysis
app.get('/make-server-abe1fece/startups/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const startup = await kv.get(`startup:${id}`);
    
    if (!startup) {
      return c.json({ success: false, error: 'Startup not found' }, 404);
    }
    
    const analysis = await kv.get(`analysis:${id}`);
    
    return c.json({ 
      success: true, 
      data: {
        startup: startup.value,
        analysis: analysis?.value || null
      }
    });
  } catch (error) {
    console.error('Error fetching startup:', error);
    return c.json({ success: false, error: 'Failed to fetch startup' }, 500);
  }
});

// Create/Update startup
app.post('/make-server-abe1fece/startups', async (c) => {
  try {
    const body = await c.req.json();
    const startupId = body.id || crypto.randomUUID();
    
    const startupData: StartupData = {
      id: startupId,
      name: body.name || 'Unnamed Startup',
      valuation: body.valuation || 0,
      stage: body.stage || 'Seed',
      sector: body.sector || 'Technology',
      foundedYear: body.foundedYear || new Date().getFullYear(),
      teamSize: body.teamSize || 5,
      revenue: body.revenue || 0,
      growthRate: body.growthRate || 0,
      burnRate: body.burnRate || 0,
      runway: body.runway || 12,
      aiScore: 0,
      riskLevel: 'medium',
      recommendation: 'analyzing',
      uploadedAt: body.uploadedAt || new Date().toISOString(),
      lastAnalyzed: new Date().toISOString(),
      pitchDeckUrl: body.pitchDeckUrl,
      financialsUrl: body.financialsUrl,
    };
    
    // Generate AI analysis
    const analysis = generateAIAnalysis(startupData);
    startupData.aiScore = analysis.overallScore;
    startupData.riskLevel = analysis.riskFlags.length > 1 ? 'high' : analysis.riskFlags.length === 1 ? 'medium' : 'low';
    startupData.recommendation = analysis.recommendation;
    
    // Store in database
    await kv.set(`startup:${startupId}`, startupData);
    await kv.set(`analysis:${startupId}`, analysis);
    
    return c.json({ 
      success: true, 
      data: { startup: startupData, analysis },
      message: 'Startup analysis completed'
    });
  } catch (error) {
    console.error('Error creating/updating startup:', error);
    return c.json({ success: false, error: 'Failed to process startup data' }, 500);
  }
});

// Trigger AI re-analysis
app.post('/make-server-abe1fece/startups/:id/analyze', async (c) => {
  try {
    const id = c.req.param('id');
    const startupRecord = await kv.get(`startup:${id}`);
    
    if (!startupRecord) {
      return c.json({ success: false, error: 'Startup not found' }, 404);
    }
    
    const startup = startupRecord.value as StartupData;
    const analysis = generateAIAnalysis(startup);
    
    // Update startup with new scores
    startup.aiScore = analysis.overallScore;
    startup.riskLevel = analysis.riskFlags.length > 1 ? 'high' : analysis.riskFlags.length === 1 ? 'medium' : 'low';
    startup.recommendation = analysis.recommendation;
    startup.lastAnalyzed = new Date().toISOString();
    
    await kv.set(`startup:${id}`, startup);
    await kv.set(`analysis:${id}`, analysis);
    
    return c.json({ 
      success: true, 
      data: { startup, analysis },
      message: 'AI analysis updated successfully'
    });
  } catch (error) {
    console.error('Error re-analyzing startup:', error);
    return c.json({ success: false, error: 'Failed to re-analyze startup' }, 500);
  }
});

// Upload endpoint (simulated)
app.post('/make-server-abe1fece/upload', async (c) => {
  try {
    const body = await c.req.json();
    const { fileName, fileType, startupId } = body;
    
    // Simulate file upload processing
    const fileUrl = `https://example.com/storage/${crypto.randomUUID()}-${fileName}`;
    
    // Update startup with file URL
    if (startupId) {
      const startupRecord = await kv.get(`startup:${startupId}`);
      if (startupRecord) {
        const startup = startupRecord.value as StartupData;
        if (fileType === 'pitch-deck') {
          startup.pitchDeckUrl = fileUrl;
        } else if (fileType === 'financials') {
          startup.financialsUrl = fileUrl;
        }
        await kv.set(`startup:${startupId}`, startup);
      }
    }
    
    return c.json({ 
      success: true, 
      data: { fileUrl, fileName, uploadedAt: new Date().toISOString() },
      message: 'File uploaded successfully'
    });
  } catch (error) {
    console.error('Upload error:', error);
    return c.json({ success: false, error: 'File upload failed' }, 500);
  }
});

// Get dashboard statistics
app.get('/make-server-abe1fece/dashboard/stats', async (c) => {
  try {
    const startups = await kv.getByPrefix('startup:');
    const startupData = startups.map(s => s?.value).filter(s => s && s.id) as StartupData[];
    
    const totalStartups = startupData.length;
    const avgScore = totalStartups > 0 ? Math.round(
      startupData.reduce((sum, s) => sum + (s?.aiScore || 0), 0) / totalStartups
    ) : 0;
    const highRisk = startupData.filter(s => s?.riskLevel === 'high').length;
    const investRecommendations = startupData.filter(s => s?.recommendation === 'invest').length;
    
    const sectorDistribution = startupData.reduce((acc, s) => {
      if (s?.sector) {
        acc[s.sector] = (acc[s.sector] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);
    
    const recentActivity = startupData
      .filter(s => s && s.lastAnalyzed)
      .sort((a, b) => new Date(b.lastAnalyzed).getTime() - new Date(a.lastAnalyzed).getTime())
      .slice(0, 5)
      .map(s => ({
        id: s.id || 'unknown',
        name: s.name || 'Unknown',
        action: 'Analysis Updated',
        timestamp: s.lastAnalyzed || new Date().toISOString(),
        score: s.aiScore || 0
      }));
    
    return c.json({
      success: true,
      data: {
        overview: {
          totalStartups,
          avgScore,
          highRisk,
          investRecommendations
        },
        sectorDistribution,
        recentActivity
      }
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return c.json({ 
      success: false, 
      error: 'Failed to fetch dashboard statistics',
      data: {
        overview: {
          totalStartups: 0,
          avgScore: 0,
          highRisk: 0,
          investRecommendations: 0
        },
        sectorDistribution: {},
        recentActivity: []
      }
    }, 500);
  }
});

// Generate deal notes
app.post('/make-server-abe1fece/startups/:id/notes', async (c) => {
  try {
    const id = c.req.param('id');
    const startupRecord = await kv.get(`startup:${id}`);
    const analysisRecord = await kv.get(`analysis:${id}`);
    
    if (!startupRecord || !analysisRecord) {
      return c.json({ success: false, error: 'Startup or analysis not found' }, 404);
    }
    
    const startup = startupRecord.value as StartupData;
    const analysis = analysisRecord.value as AIAnalysis;
    
    const dealNotes = {
      id: crypto.randomUUID(),
      startupId: id,
      title: `Investment Analysis: ${startup.name}`,
      summary: `${startup.name} is a ${startup.stage}-stage ${startup.sector} company with a current valuation of $${(startup.valuation / 1000000).toFixed(1)}M. Our AI analysis scored the company ${analysis.overallScore}/100 with a ${analysis.recommendation.toUpperCase()} recommendation.`,
      
      keyMetrics: {
        valuation: startup.valuation,
        revenue: startup.revenue,
        growthRate: startup.growthRate,
        burnRate: startup.burnRate,
        runway: startup.runway,
        teamSize: startup.teamSize
      },
      
      strengths: analysis.keyInsights,
      
      risks: analysis.riskFlags.length > 0 ? analysis.riskFlags : ['No major risks identified'],
      
      recommendation: {
        decision: analysis.recommendation,
        confidence: analysis.confidence,
        reasoning: `Based on comprehensive analysis across financial performance (${analysis.financialScore}/100), market opportunity (${analysis.marketScore}/100), team quality (${analysis.teamScore}/100), and technology innovation (${analysis.technologyScore}/100).`
      },
      
      generatedAt: new Date().toISOString(),
      lastModified: new Date().toISOString()
    };
    
    await kv.set(`notes:${id}`, dealNotes);
    
    return c.json({
      success: true,
      data: dealNotes,
      message: 'Deal notes generated successfully'
    });
  } catch (error) {
    console.error('Error generating deal notes:', error);
    return c.json({ success: false, error: 'Failed to generate deal notes' }, 500);
  }
});

// Scenario simulation
app.post('/make-server-abe1fece/startups/:id/simulate', async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    const { scenarios } = body;
    
    const startupRecord = await kv.get(`startup:${id}`);
    if (!startupRecord) {
      return c.json({ success: false, error: 'Startup not found' }, 404);
    }
    
    const startup = startupRecord.value as StartupData;
    
    const simulations = scenarios.map((scenario: any) => {
      const projectedRevenue = startup.revenue * (1 + scenario.growthRate / 100);
      const projectedValuation = startup.valuation * (1 + scenario.valuationMultiple);
      const projectedBurn = startup.burnRate * (1 + scenario.burnRateChange / 100);
      const projectedRunway = projectedRevenue / projectedBurn * 12;
      
      return {
        name: scenario.name,
        probability: scenario.probability,
        projections: {
          revenue: projectedRevenue,
          valuation: projectedValuation,
          burnRate: projectedBurn,
          runway: projectedRunway,
          roi: ((projectedValuation - startup.valuation) / startup.valuation) * 100
        }
      };
    });
    
    return c.json({
      success: true,
      data: { scenarios: simulations },
      message: 'Scenario simulation completed'
    });
  } catch (error) {
    console.error('Error running simulation:', error);
    return c.json({ success: false, error: 'Simulation failed' }, 500);
  }
});

// Health check
app.get('/make-server-abe1fece/health', (c) => {
  return c.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    service: 'Disha AI Backend'
  });
});

console.log('🚀 Disha AI Backend Server starting...');

Deno.serve(app.fetch);