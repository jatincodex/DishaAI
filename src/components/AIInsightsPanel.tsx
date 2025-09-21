import { TrendingUp, Users, DollarSign, AlertTriangle, Brain, Sparkles, RefreshCw, Target, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { StartupData, AIAnalysis, apiService } from '../services/apiService';
import { toast } from 'sonner@2.0.3';

interface AIInsightsPanelProps {
  startup?: StartupData | null;
  onAnalysisUpdate?: (startup: StartupData) => void;
}

function AnimatedCounter({ value, duration = 2000 }: { value: string; duration?: number }) {
  const [displayValue, setDisplayValue] = useState(value);
  
  useEffect(() => {
    // Extract numeric value for animation
    const numMatch = value.match(/(\d+\.?\d*)/);
    if (numMatch) {
      const targetNum = parseFloat(numMatch[1]);
      const prefix = value.substring(0, numMatch.index || 0);
      const suffix = value.substring((numMatch.index || 0) + numMatch[0].length);
      
      let startValue = 0;
      const increment = targetNum / (duration / 50);
      
      const timer = setInterval(() => {
        startValue += increment;
        if (startValue >= targetNum) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          setDisplayValue(`${prefix}${startValue.toFixed(1)}${suffix}`);
        }
      }, 50);
      
      return () => clearInterval(timer);
    }
  }, [value, duration]);
  
  return <span>{displayValue}</span>;
}

export function AIInsightsPanel({ startup, onAnalysisUpdate }: AIInsightsPanelProps) {
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Load analysis data when startup changes
  useEffect(() => {
    if (startup) {
      loadAnalysis();
    } else {
      setAnalysis(null);
    }
  }, [startup]);

  const loadAnalysis = async () => {
    if (!startup) return;
    
    setIsLoading(true);
    try {
      const response = await apiService.getStartup(startup.id);
      if (response.success && response.data.analysis) {
        setAnalysis(response.data.analysis);
      }
    } catch (error) {
      console.error('Error loading analysis:', error);
      toast.error('Failed to load analysis data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReAnalyze = async () => {
    if (!startup) return;
    
    setIsAnalyzing(true);
    try {
      const response = await apiService.analyzeStartup(startup.id);
      if (response.success) {
        setAnalysis(response.data.analysis);
        onAnalysisUpdate?.(response.data.startup);
        toast.success('Analysis updated successfully!');
      }
    } catch (error) {
      console.error('Error re-analyzing startup:', error);
      toast.error('Failed to re-analyze startup');
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (!startup) {
    return (
      <Card className="glass-card rounded-xl border-white/30 shadow-2xl">
        <CardContent className="p-12 text-center">
          <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto mb-4">
            <Brain className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-lg font-medium mb-2">No Startup Selected</h3>
          <p className="text-muted-foreground">Upload a startup or select one from the list to view AI insights</p>
        </CardContent>
      </Card>
    );
  }

  const insights = analysis ? [
    {
      title: 'Financial Score',
      value: `${analysis.financialScore}/100`,
      change: analysis.financialScore >= 70 ? 'Strong performance' : analysis.financialScore >= 50 ? 'Moderate performance' : 'Needs improvement',
      icon: DollarSign,
      trend: analysis.financialScore >= 70 ? 'up' : analysis.financialScore >= 50 ? 'neutral' : 'down',
      description: `Revenue: $${(startup.revenue / 1_000_000).toFixed(1)}M, Growth: ${startup.growthRate}%`
    },
    {
      title: 'Market Opportunity',
      value: `${analysis.marketScore}/100`,
      change: analysis.marketScore >= 70 ? 'Large market potential' : analysis.marketScore >= 50 ? 'Moderate market' : 'Limited market',
      icon: Target,
      trend: analysis.marketScore >= 70 ? 'up' : analysis.marketScore >= 50 ? 'neutral' : 'caution',
      description: `${startup.sector} sector, ${startup.stage} stage`
    },
    {
      title: 'Team Quality',
      value: `${analysis.teamScore}/100`,
      change: analysis.teamScore >= 70 ? 'Excellent team' : analysis.teamScore >= 50 ? 'Good team' : 'Team concerns',
      icon: Users,
      trend: analysis.teamScore >= 70 ? 'up' : analysis.teamScore >= 50 ? 'neutral' : 'caution',
      description: `${startup.teamSize} members, founded ${startup.foundedYear}`
    },
    {
      title: 'Risk Assessment',
      value: analysis.riskFlags.length === 0 ? 'Low' : analysis.riskFlags.length <= 2 ? 'Medium' : 'High',
      change: `${analysis.riskFlags.length} risk flags`,
      icon: AlertTriangle,
      trend: analysis.riskFlags.length === 0 ? 'up' : analysis.riskFlags.length <= 2 ? 'neutral' : 'caution',
      description: analysis.riskFlags.length > 0 ? analysis.riskFlags[0] : 'No major risks identified'
    }
  ] : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="glass-card rounded-xl border-white/30 shadow-2xl">
        <CardHeader className="pb-4">
          <motion.div
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-3">
                  <motion.div 
                    className="p-3 gradient-primary rounded-xl shadow-lg relative overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    >
                      <Brain className="w-6 h-6 text-white" />
                    </motion.div>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{ x: [-100, 100] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                  </motion.div>
                  <div>
                    <span className="text-xl font-semibold bg-gradient-to-r from-primary to-teal bg-clip-text text-transparent">
                      AI Analysis: {startup.name}
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        Score: {startup.aiScore}/100
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className={`${
                          startup.recommendation === 'invest' ? 'bg-teal/10 text-teal border-teal/20' :
                          startup.recommendation === 'watch' ? 'bg-orange/10 text-orange border-orange/20' :
                          'bg-red/10 text-red border-red/20'
                        }`}
                      >
                        {startup.recommendation.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </CardTitle>
                <p className="text-muted-foreground mt-2">
                  Last analyzed: {new Date(startup.lastAnalyzed).toLocaleDateString()}
                </p>
              </div>
              
              <Button
                onClick={handleReAnalyze}
                disabled={isAnalyzing}
                variant="outline"
                size="sm"
                className="rounded-lg"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isAnalyzing ? 'animate-spin' : ''}`} />
                {isAnalyzing ? 'Analyzing...' : 'Re-analyze'}
              </Button>
            </div>
          </motion.div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="grid grid-cols-2 gap-6">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="space-y-3 p-6">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-3 w-32" />
                  <Skeleton className="h-3 w-full" />
                </div>
              ))}
            </div>
          ) : analysis ? (
            <div className="space-y-6">
              {/* Key Insights */}
              <div className="grid grid-cols-2 gap-6">
                {insights.map((insight, index) => {
                  const Icon = insight.icon;
                  return (
                    <motion.div 
                      key={index} 
                      className="group glass-card p-6 rounded-xl border-white/20 hover:shadow-lg transition-all duration-300 hover:scale-105"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * index + 0.5, duration: 0.4 }}
                      whileHover={{ y: -5 }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className={`p-2 rounded-lg ${
                          insight.trend === 'up' ? 'bg-teal/10' :
                          insight.trend === 'neutral' ? 'bg-primary/10' :
                          'bg-orange/10'
                        }`}>
                          <Icon className={`w-5 h-5 ${
                            insight.trend === 'up' ? 'text-teal' :
                            insight.trend === 'neutral' ? 'text-primary' :
                            'text-orange'
                          }`} />
                        </div>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            insight.trend === 'up' ? 'bg-teal/10 text-teal border-teal/20' :
                            insight.trend === 'neutral' ? 'bg-primary/10 text-primary border-primary/20' :
                            'bg-orange/10 text-orange border-orange/20'
                          }`}
                        >
                          {insight.change}
                        </Badge>
                      </div>
                      
                      <h4 className="font-medium text-sm text-muted-foreground mb-1">{insight.title}</h4>
                      <p className="text-2xl font-bold mb-2 text-foreground">
                        <AnimatedCounter value={insight.value} />
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {insight.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
              
              {/* AI Insights Summary */}
              <div className="space-y-4">
                <h4 className="font-medium">Key AI Insights</h4>
                <div className="grid gap-3">
                  {analysis.keyInsights.map((insight, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="flex items-start gap-3 p-3 bg-gradient-to-r from-primary/5 to-teal/5 rounded-lg border border-primary/10"
                    >
                      <CheckCircle2 className="w-4 h-4 text-teal mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{insight}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Risk Flags */}
              {analysis.riskFlags.length > 0 && (
                <div className="space-y-4">
                  <h4 className="font-medium text-orange">Risk Flags</h4>
                  <div className="grid gap-3">
                    {analysis.riskFlags.map((risk, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.2 + index * 0.1 }}
                        className="flex items-start gap-3 p-3 bg-orange/5 rounded-lg border border-orange/20"
                      >
                        <AlertTriangle className="w-4 h-4 text-orange mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{risk}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="p-4 bg-orange/10 rounded-full w-fit mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-orange" />
              </div>
              <h3 className="text-lg font-medium mb-2">No Analysis Available</h3>
              <p className="text-muted-foreground mb-4">Click "Re-analyze" to generate AI insights for this startup</p>
              <Button onClick={handleReAnalyze} disabled={isAnalyzing}>
                <Brain className="w-4 h-4 mr-2" />
                Generate Analysis
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}