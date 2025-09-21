import { useState, useEffect } from 'react';
import { FileText, Download, Edit, Calendar, Building, TrendingUp, Plus, Brain, Send, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Skeleton } from './ui/skeleton';
import { apiService, StartupData, DealNotes } from '../services/apiService';
import { toast } from 'sonner@2.0.3';

export function DealNotesView() {
  const [startups, setStartups] = useState<StartupData[]>([]);
  const [selectedStartup, setSelectedStartup] = useState<StartupData | null>(null);
  const [dealNotes, setDealNotes] = useState<DealNotes | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedSummary, setEditedSummary] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  // Load startups on component mount
  useEffect(() => {
    loadStartups();
  }, []);

  // Load deal notes when startup changes
  useEffect(() => {
    if (selectedStartup) {
      loadDealNotes();
    }
  }, [selectedStartup]);

  const loadStartups = async () => {
    try {
      const response = await apiService.getAllStartups();
      if (response.success) {
        setStartups(response.data);
        if (response.data.length > 0 && !selectedStartup) {
          setSelectedStartup(response.data[0]);
        }
      }
    } catch (error) {
      console.error('Error loading startups:', error);
      toast.error('Failed to load startups');
    } finally {
      setIsLoading(false);
    }
  };

  const loadDealNotes = async () => {
    if (!selectedStartup) return;
    
    // For demo purposes, we'll generate notes immediately
    // In a real app, you might check if notes already exist first
    generateDealNotes();
  };

  const generateDealNotes = async () => {
    if (!selectedStartup) return;
    
    setIsGenerating(true);
    try {
      const response = await apiService.generateDealNotes(selectedStartup.id);
      if (response.success) {
        setDealNotes(response.data);
        setEditedSummary(response.data.summary);
        toast.success('Deal notes generated successfully!');
      }
    } catch (error) {
      console.error('Error generating deal notes:', error);
      toast.error('Failed to generate deal notes');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveEdit = () => {
    if (dealNotes) {
      setDealNotes({
        ...dealNotes,
        summary: editedSummary,
        lastModified: new Date().toISOString()
      });
      setIsEditing(false);
      toast.success('Deal notes updated successfully!');
    }
  };

  const exportToPDF = () => {
    if (!dealNotes) return;
    
    // In a real implementation, this would generate and download a PDF
    toast.success('PDF export initiated (demo mode)');
  };

  const exportToNotion = () => {
    if (!dealNotes) return;
    
    // In a real implementation, this would export to Notion
    toast.success('Exported to Notion (demo mode)');
  };

  const exportToSlack = () => {
    if (!dealNotes) return;
    
    // In a real implementation, this would send to Slack
    toast.success('Sent to Slack (demo mode)');
  };

  if (isLoading) {
    return (
      <div className="min-h-full bg-gradient-to-br from-blue-50/50 to-indigo-50/30 p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <Skeleton className="h-8 w-64 mb-2" />
              <Skeleton className="h-4 w-96" />
            </div>
            <div className="flex gap-3">
              <Skeleton className="h-12 w-24" />
              <Skeleton className="h-12 w-32" />
            </div>
          </div>
          <Card className="glass-card">
            <CardContent className="p-8">
              <Skeleton className="h-64 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-gradient-to-br from-blue-50/50 to-indigo-50/30">
      <div className="p-8 space-y-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">Deal Note Generator</h1>
            <p className="text-lg text-muted-foreground">AI-generated investor notes and analysis</p>
          </div>
          <div className="flex gap-3">
            <Select value={selectedStartup?.id || ''} onValueChange={(id) => {
              const startup = startups.find(s => s.id === id);
              setSelectedStartup(startup || null);
            }}>
              <SelectTrigger className="w-64 bg-white/80 backdrop-blur-md border-primary/30">
                <SelectValue placeholder="Select a startup" />
              </SelectTrigger>
              <SelectContent>
                {startups.map((startup) => (
                  <SelectItem key={startup.id} value={startup.id}>
                    {startup.name} - ${(startup.valuation / 1_000_000).toFixed(1)}M
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button 
              onClick={generateDealNotes}
              disabled={!selectedStartup || isGenerating}
              className="bg-primary hover:bg-primary/90"
            >
              <Brain className="w-4 h-4 mr-2" />
              {isGenerating ? 'Generating...' : 'Generate Notes'}
            </Button>
          </div>
        </div>

        {!selectedStartup ? (
          <Card className="glass-card">
            <CardContent className="p-12 text-center">
              <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto mb-4">
                <FileText className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">No Startup Selected</h3>
              <p className="text-muted-foreground">Select a startup from the dropdown to generate deal notes</p>
            </CardContent>
          </Card>
        ) : isGenerating ? (
          <Card className="glass-card">
            <CardContent className="p-12 text-center">
              <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto mb-4">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
              <h3 className="text-lg font-medium mb-2">Generating Deal Notes</h3>
              <p className="text-muted-foreground">AI is analyzing {selectedStartup.name} and creating comprehensive investment notes...</p>
            </CardContent>
          </Card>
        ) : dealNotes ? (
          <>
            {/* Deal Note Card */}
            <Card className="glass-card rounded-xl border-white/30 shadow-2xl">
              <CardHeader className="pb-6">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 gradient-primary rounded-xl shadow-lg">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <span className="bg-gradient-to-r from-primary to-teal bg-clip-text text-transparent">
                      {dealNotes.title}
                    </span>
                  </CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground bg-white/60 px-3 py-2 rounded-full border border-white/30">
                    <Calendar className="w-4 h-4" />
                    Generated {new Date(dealNotes.generatedAt).toLocaleDateString()}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Executive Summary */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Executive Summary</h3>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setIsEditing(!isEditing)}
                        className="rounded-lg"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        {isEditing ? 'Cancel' : 'Edit'}
                      </Button>
                      {isEditing && (
                        <Button 
                          size="sm"
                          onClick={handleSaveEdit}
                          className="bg-primary hover:bg-primary/90"
                        >
                          Save Changes
                        </Button>
                      )}
                    </div>
                  </div>
                  {isEditing ? (
                    <Textarea
                      value={editedSummary}
                      onChange={(e) => setEditedSummary(e.target.value)}
                      className="min-h-24 bg-white/80 border-primary/30"
                      placeholder="Edit the executive summary..."
                    />
                  ) : (
                    <p className="text-muted-foreground leading-relaxed p-4 bg-white/60 rounded-lg border border-white/30">
                      {dealNotes.summary}
                    </p>
                  )}
                </div>

                {/* Key Metrics */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Key Metrics</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-white/60 rounded-lg border border-white/30">
                      <div className="flex items-center gap-2 mb-2">
                        <Building className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">Valuation</span>
                      </div>
                      <p className="text-xl font-bold">${(dealNotes.keyMetrics.valuation / 1_000_000).toFixed(1)}M</p>
                    </div>
                    <div className="p-4 bg-white/60 rounded-lg border border-white/30">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-teal" />
                        <span className="text-sm font-medium">Revenue</span>
                      </div>
                      <p className="text-xl font-bold">${(dealNotes.keyMetrics.revenue / 1_000_000).toFixed(1)}M</p>
                    </div>
                    <div className="p-4 bg-white/60 rounded-lg border border-white/30">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-teal" />
                        <span className="text-sm font-medium">Growth Rate</span>
                      </div>
                      <p className="text-xl font-bold">{dealNotes.keyMetrics.growthRate}%</p>
                    </div>
                    <div className="p-4 bg-white/60 rounded-lg border border-white/30">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium">Team Size</span>
                      </div>
                      <p className="text-xl font-bold">{dealNotes.keyMetrics.teamSize}</p>
                    </div>
                    <div className="p-4 bg-white/60 rounded-lg border border-white/30">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium">Burn Rate</span>
                      </div>
                      <p className="text-xl font-bold">${(dealNotes.keyMetrics.burnRate / 1000).toFixed(0)}K/mo</p>
                    </div>
                    <div className="p-4 bg-white/60 rounded-lg border border-white/30">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium">Runway</span>
                      </div>
                      <p className="text-xl font-bold">{dealNotes.keyMetrics.runway}mo</p>
                    </div>
                  </div>
                </div>

                {/* Strengths */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Key Strengths</h3>
                  <div className="space-y-2">
                    {dealNotes.strengths.map((strength, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-teal/10 rounded-lg border border-teal/20">
                        <div className="w-2 h-2 bg-teal rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm">{strength}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Risks */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Risk Assessment</h3>
                  <div className="space-y-2">
                    {dealNotes.risks.map((risk, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-orange/10 rounded-lg border border-orange/20">
                        <div className="w-2 h-2 bg-orange rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm">{risk}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Investment Recommendation */}
                <div className="space-y-4 p-6 bg-gradient-to-r from-primary/5 to-teal/5 rounded-xl border border-primary/20">
                  <h3 className="text-lg font-semibold">Investment Recommendation</h3>
                  <div className="flex items-center gap-4 mb-4">
                    <Badge 
                      variant="outline" 
                      className={`text-lg px-4 py-2 ${
                        dealNotes.recommendation.decision === 'invest' ? 'bg-teal/10 text-teal border-teal/20' :
                        dealNotes.recommendation.decision === 'watch' ? 'bg-orange/10 text-orange border-orange/20' :
                        'bg-red/10 text-red border-red/20'
                      }`}
                    >
                      {dealNotes.recommendation.decision.toUpperCase()}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Confidence: {dealNotes.recommendation.confidence}%
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {dealNotes.recommendation.reasoning}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Export Actions */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="w-5 h-5 text-primary" />
                  Export & Share
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  <Button onClick={exportToPDF} className="bg-red-600 hover:bg-red-700">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                  <Button onClick={exportToNotion} variant="outline" className="border-gray-400 hover:bg-gray-50">
                    <FileText className="w-4 h-4 mr-2" />
                    Export to Notion
                  </Button>
                  <Button onClick={exportToSlack} variant="outline" className="border-purple-400 hover:bg-purple-50">
                    <Send className="w-4 h-4 mr-2" />
                    Send to Slack
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <Card className="glass-card">
            <CardContent className="p-12 text-center">
              <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto mb-4">
                <Plus className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Generate Deal Notes</h3>
              <p className="text-muted-foreground mb-4">Click "Generate Notes" to create comprehensive investment analysis for {selectedStartup.name}</p>
              <Button onClick={generateDealNotes} className="bg-primary hover:bg-primary/90">
                <Brain className="w-4 h-4 mr-2" />
                Generate AI Notes
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}