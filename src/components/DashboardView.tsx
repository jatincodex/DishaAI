import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Skeleton } from './ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  Upload, 
  Brain, 
  Target,
  DollarSign,
  Users,
  Rocket,
  Calendar,
  FileText,
  Activity,
  RefreshCw,
  Plus,
  Eye
} from 'lucide-react';
import { apiService, StartupData } from '../services/apiService';
import { toast } from 'sonner@2.0.3';
import { UploadSection } from './UploadSection';
import { AIInsightsPanel } from './AIInsightsPanel';
import { BenchmarkChart } from './BenchmarkChart';
import { RiskIndicators } from './RiskIndicators';
import { RecommendationCard } from './RecommendationCard';
import { ScenarioSimulation } from './ScenarioSimulation';
import { ErrorBoundary } from './ErrorBoundary';

interface DashboardStats {
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
}

export function DashboardView() {
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);
  const [startups, setStartups] = useState<StartupData[]>([]);
  const [selectedStartup, setSelectedStartup] = useState<StartupData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  // Load dashboard data
  const loadDashboardData = async () => {
    try {
      setIsRefreshing(true);
      
      // Load dashboard stats and startups with individual error handling
      const [statsResponse, startupsResponse] = await Promise.allSettled([
        apiService.getDashboardStats(),
        apiService.getAllStartups()
      ]);

      // Handle dashboard stats
      if (statsResponse.status === 'fulfilled' && statsResponse.value.success) {
        setDashboardStats(statsResponse.value.data);
      } else {
        console.warn('Failed to load dashboard stats, using existing data');
      }

      // Handle startups data
      if (startupsResponse.status === 'fulfilled' && startupsResponse.value.success) {
        const validStartups = startupsResponse.value.data.filter(s => s && s.id);
        setStartups(validStartups);
        
        // Select first startup if none selected
        if (!selectedStartup && validStartups.length > 0) {
          setSelectedStartup(validStartups[0]);
        }
      } else {
        console.warn('Failed to load startups data, using existing data');
      }
      
      setLastUpdate(new Date());
      
      // Only show success message if we got some data
      if ((statsResponse.status === 'fulfilled' && statsResponse.value.success) ||
          (startupsResponse.status === 'fulfilled' && startupsResponse.value.success)) {
        toast.success('Dashboard data updated');
      }
      
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      // Don't show error toast on first load, only on refresh
      if (!isLoading) {
        toast.error('Failed to refresh dashboard data');
      }
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  // Initial load
  useEffect(() => {
    loadDashboardData();
    
    // Set up auto-refresh every 30 seconds
    const interval = setInterval(loadDashboardData, 30000);
    return () => clearInterval(interval);
  }, []);

  // Initialize with fallback data if needed
  useEffect(() => {
    if (!dashboardStats && !isLoading) {
      // Set fallback dashboard stats if none loaded
      setDashboardStats({
        overview: {
          totalStartups: startups.length,
          avgScore: startups.length > 0 ? Math.round(startups.reduce((sum, s) => sum + (s?.aiScore || 0), 0) / startups.length) : 0,
          highRisk: startups.filter(s => s?.riskLevel === 'high').length,
          investRecommendations: startups.filter(s => s?.recommendation === 'invest').length
        },
        sectorDistribution: startups.reduce((acc, s) => {
          if (s?.sector) {
            acc[s.sector] = (acc[s.sector] || 0) + 1;
          }
          return acc;
        }, {} as Record<string, number>),
        recentActivity: startups.slice(0, 3).map(s => ({
          id: s?.id || 'unknown',
          name: s?.name || 'Unknown',
          action: 'Analysis Updated',
          timestamp: s?.lastAnalyzed || new Date().toISOString(),
          score: s?.aiScore || 0
        }))
      });
    }
  }, [startups, dashboardStats, isLoading]);

  // Handle startup creation
  const handleStartupCreated = (newStartup: StartupData) => {
    if (newStartup && newStartup.id) {
      setStartups(prev => [newStartup, ...prev.filter(s => s && s.id !== newStartup.id)]);
      setSelectedStartup(newStartup);
      loadDashboardData(); // Refresh stats
    }
  };

  // Format sector data for charts
  const sectorChartData = dashboardStats?.sectorDistribution ? 
    Object.entries(dashboardStats.sectorDistribution)
      .filter(([sector, count]) => sector && count > 0)
      .map(([sector, count]) => ({
        name: sector,
        value: count,
        percentage: Math.round((count / (dashboardStats.overview.totalStartups || 1)) * 100)
      })) : [];

  const COLORS = ['#1A73E8', '#34A853', '#FBBC05', '#EA4335', '#9AA0A6'];

  if (isLoading && !dashboardStats) {
    return (
      <div className="min-h-full bg-gradient-to-br from-blue-50/50 to-indigo-50/30 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <Skeleton className="h-8 w-64 mx-auto" />
            <Skeleton className="h-4 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-8 w-16 mb-4" />
                  <Skeleton className="h-2 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-gradient-to-br from-blue-50/50 to-indigo-50/30">
      <div className="p-8 space-y-8 max-w-7xl mx-auto">
        {/* Hero Section with Real-time Status */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
              Live Dashboard - Updated {lastUpdate.toLocaleTimeString()}
            </div>
          </div>
          <h1 className="text-4xl font-semibold text-gray-900 mb-4">
            Disha AI - Startup Evaluation Platform
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            Real-time AI-powered startup analysis with live data integration
          </p>
          
          <div className="flex justify-center gap-4">
            <Button 
              onClick={loadDashboardData} 
              disabled={isRefreshing}
              className="bg-primary hover:bg-primary/90"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh Data
            </Button>
          </div>
        </div>

        {/* Real-time Statistics Overview */}
        {dashboardStats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="glass-card border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Startups</p>
                    <p className="text-2xl font-bold text-primary">{dashboardStats?.overview?.totalStartups || 0}</p>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Rocket className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div className="mt-4">
                  <Progress value={75} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">Portfolio capacity</p>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-teal/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Avg AI Score</p>
                    <p className="text-2xl font-bold text-teal">{dashboardStats?.overview?.avgScore || 0}</p>
                  </div>
                  <div className="p-3 bg-teal/10 rounded-lg">
                    <Brain className="w-6 h-6 text-teal" />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-teal" />
                  <span className="text-sm text-teal">+5.2% from last week</span>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-orange/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">High Risk</p>
                    <p className="text-2xl font-bold text-orange">{dashboardStats?.overview?.highRisk || 0}</p>
                  </div>
                  <div className="p-3 bg-orange/10 rounded-lg">
                    <AlertTriangle className="w-6 h-6 text-orange" />
                  </div>
                </div>
                <div className="mt-4">
                  <Badge variant="outline" className="bg-orange/10 text-orange border-orange/20">
                    Requires attention
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-teal/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Invest Ready</p>
                    <p className="text-2xl font-bold text-teal">{dashboardStats?.overview?.investRecommendations || 0}</p>
                  </div>
                  <div className="p-3 bg-teal/10 rounded-lg">
                    <Target className="w-6 h-6 text-teal" />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-teal" />
                  <span className="text-sm text-teal">Ready for investment</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Real-time Charts and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                Sector Distribution
              </CardTitle>
              <CardDescription>Live portfolio composition by industry sector</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sectorChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {sectorChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {sectorChartData.map((entry, index) => (
                  <Badge key={entry.name} variant="outline" className="flex items-center gap-1">
                    <div 
                      className="w-2 h-2 rounded-full" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    {entry.name} ({entry.percentage}%)
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Recent Activity
              </CardTitle>
              <CardDescription>Latest AI analysis and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardStats?.recentActivity?.filter(activity => activity && activity.id)?.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-3 bg-accent/50 rounded-lg hover:bg-accent/70 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Brain className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{activity.name || 'Unknown'}</p>
                        <p className="text-sm text-muted-foreground">{activity.action || 'Activity'}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="bg-teal/10 text-teal border-teal/20">
                        {activity.score || 0}/100
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        {activity.timestamp ? new Date(activity.timestamp).toLocaleTimeString() : 'Now'}
                      </p>
                    </div>
                  </div>
                )) || (
                  <p className="text-muted-foreground text-center py-4">No recent activity</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upload Section with Real-time Integration */}
        <div className="mb-8">
          <ErrorBoundary>
            <UploadSection onStartupCreated={handleStartupCreated} />
          </ErrorBoundary>
        </div>

        {/* Main Analysis Grid - Connected to Selected Startup */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Insights & Chart */}
          <div className="lg:col-span-2 space-y-8">
            <ErrorBoundary>
              <AIInsightsPanel 
                startup={selectedStartup} 
                onAnalysisUpdate={(updatedStartup) => {
                  setSelectedStartup(updatedStartup);
                  loadDashboardData();
                }}
              />
            </ErrorBoundary>
            <ErrorBoundary>
              <BenchmarkChart startups={startups} selectedStartup={selectedStartup} />
            </ErrorBoundary>
          </div>

          {/* Right Column - Recommendation */}
          <div className="space-y-8">
            <RecommendationCard 
              startup={selectedStartup}
              onRecommendationUpdate={loadDashboardData}
            />
            
            {/* Startup Selector */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-primary" />
                  Select Startup
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {startups.filter(startup => startup && startup.id).slice(0, 5).map((startup) => (
                    <Button
                      key={startup.id}
                      variant={selectedStartup?.id === startup.id ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setSelectedStartup(startup)}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span>{startup.name || 'Unknown Startup'}</span>
                        <Badge variant="outline" className="ml-2">
                          {startup.aiScore || 0}/100
                        </Badge>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Scenario Simulation - Full Width with Real-time Data */}
        <div className="mt-8">
          <ScenarioSimulation startup={selectedStartup} />
        </div>

        {/* Risk Indicators - Full Width with Live Updates */}
        <div className="mt-8">
          <RiskIndicators startups={startups} />
        </div>
      </div>
    </div>
  );
}