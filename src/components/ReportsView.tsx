import { FileText, Download, Calendar, TrendingUp, PieChart, BarChart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { portfolioData } from '../lib/mockData';

const reportTypes = [
  {
    title: 'Monthly Portfolio Report',
    description: 'Comprehensive overview of portfolio performance and new investments',
    lastGenerated: '2024-12-01',
    status: 'Ready'
  },
  {
    title: 'Sector Analysis Report',
    description: 'Deep dive into sector trends and benchmark comparisons',
    lastGenerated: '2024-11-28',
    status: 'Ready'
  },
  {
    title: 'Risk Assessment Summary',
    description: 'Portfolio-wide risk analysis and mitigation strategies',
    lastGenerated: '2024-11-25',
    status: 'Generating'
  },
  {
    title: 'LP Quarterly Update',
    description: 'Limited partner update with key metrics and insights',
    lastGenerated: '2024-10-01',
    status: 'Ready'
  }
];

export function ReportsView() {
  return (
    <div className="min-h-full bg-gradient-to-br from-blue-50/50 to-indigo-50/30">
      <div className="p-8 space-y-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">Reports & Analytics</h1>
            <p className="text-lg text-muted-foreground">Portfolio insights and automated report generation</p>
          </div>
          <Button className="h-12 px-6 gradient-primary hover:shadow-lg transition-all duration-200">
            <FileText className="w-4 h-4 mr-2" />
            Generate New Report
          </Button>
        </div>

        {/* Portfolio Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="glass-card rounded-xl border-white/30 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-primary to-primary/80 rounded-xl shadow-lg">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Total Investments</p>
                  <p className="text-2xl font-bold text-foreground">68</p>
                  <p className="text-xs text-teal font-medium">+12 this quarter</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card rounded-xl border-white/30 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-teal to-teal/80 rounded-xl shadow-lg">
                  <PieChart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Portfolio Value</p>
                  <p className="text-2xl font-bold text-foreground">$285M</p>
                  <p className="text-xs text-teal font-medium">+18% YoY</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card rounded-xl border-white/30 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Exits YTD</p>
                  <p className="text-2xl font-bold text-foreground">14</p>
                  <p className="text-xs text-primary font-medium">2.8x avg multiple</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card rounded-xl border-white/30 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-orange to-orange/80 rounded-xl shadow-lg">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Active Deals</p>
                  <p className="text-2xl font-bold text-foreground">23</p>
                  <p className="text-xs text-muted-foreground font-medium">In pipeline</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Investment Activity */}
          <Card className="glass-card rounded-xl border-white/30 shadow-2xl">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 gradient-primary rounded-xl shadow-lg">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <span className="bg-gradient-to-r from-primary to-teal bg-clip-text text-transparent">
                  Investment Activity
                </span>
              </CardTitle>
              <p className="text-muted-foreground">Monthly investment count and portfolio exits</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={portfolioData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.6} />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fontSize: 12, fill: '#64748b' }} 
                    axisLine={{ stroke: '#cbd5e1' }}
                  />
                  <YAxis 
                    tick={{ fontSize: 12, fill: '#64748b' }} 
                    axisLine={{ stroke: '#cbd5e1' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="investments" 
                    stroke="#1a73e8" 
                    strokeWidth={3}
                    name="Investments"
                    dot={{ fill: '#1a73e8', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: '#1a73e8' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="exits" 
                    stroke="#34a853" 
                    strokeWidth={3}
                    name="Exits"
                    dot={{ fill: '#34a853', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: '#34a853' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Valuation Trends */}
          <Card className="glass-card rounded-xl border-white/30 shadow-2xl">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 gradient-primary rounded-xl shadow-lg">
                  <BarChart className="w-5 h-5 text-white" />
                </div>
                <span className="bg-gradient-to-r from-primary to-teal bg-clip-text text-transparent">
                  Portfolio Valuations
                </span>
              </CardTitle>
              <p className="text-muted-foreground">Monthly portfolio valuation changes ($M)</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={portfolioData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.6} />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fontSize: 12, fill: '#64748b' }} 
                    axisLine={{ stroke: '#cbd5e1' }}
                  />
                  <YAxis 
                    tick={{ fontSize: 12, fill: '#64748b' }} 
                    axisLine={{ stroke: '#cbd5e1' }}
                  />
                  <Bar 
                    dataKey="valuations" 
                    fill="url(#valuationGradient)" 
                    radius={[4, 4, 0, 0]}
                  />
                  <defs>
                    <linearGradient id="valuationGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Available Reports */}
        <Card className="glass-card rounded-xl border-white/30 shadow-2xl">
          <CardHeader className="pb-6">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 gradient-primary rounded-xl shadow-lg">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="bg-gradient-to-r from-primary to-teal bg-clip-text text-transparent">
                Available Reports
              </span>
            </CardTitle>
            <p className="text-muted-foreground">
              Pre-generated and custom reports for portfolio analysis
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reportTypes.map((report, index) => (
                <div key={index} className="glass rounded-xl border border-white/20 p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-foreground mb-2">{report.title}</h4>
                      <p className="text-muted-foreground mb-3 leading-relaxed">{report.description}</p>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">Last generated: {report.lastGenerated}</span>
                        <Badge 
                          variant={report.status === 'Ready' ? 'default' : 'secondary'}
                          className={`px-3 py-1 font-medium ${
                            report.status === 'Ready' 
                              ? 'bg-teal/20 text-teal border-teal/30' 
                              : 'bg-orange/20 text-orange border-orange/30'
                          }`}
                        >
                          {report.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-3 ml-6">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        disabled={report.status !== 'Ready'}
                        className="h-10 px-4 bg-white/60 hover:bg-white/80 border-primary/30 hover:border-primary/50 transition-all"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="h-10 px-4 bg-white/60 hover:bg-white/80 border-primary/30 hover:border-primary/50 transition-all"
                      >
                        View
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Export Options */}
        <Card className="glass-card rounded-xl border-white/30 shadow-2xl">
          <CardHeader className="pb-6">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 gradient-primary rounded-xl shadow-lg">
                <Download className="w-5 h-5 text-white" />
              </div>
              <span className="bg-gradient-to-r from-primary to-teal bg-clip-text text-transparent">
                Export Options
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Button 
                variant="outline" 
                className="h-24 flex-col gap-3 glass border-white/30 hover:bg-white/80 hover:scale-105 transition-all duration-300"
              >
                <div className="p-2 gradient-primary rounded-lg">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <span className="font-medium">PDF Report</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-24 flex-col gap-3 glass border-white/30 hover:bg-white/80 hover:scale-105 transition-all duration-300"
              >
                <div className="p-2 bg-gradient-to-br from-teal to-teal/80 rounded-lg">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <span className="font-medium">Excel Export</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-24 flex-col gap-3 glass border-white/30 hover:bg-white/80 hover:scale-105 transition-all duration-300"
              >
                <div className="p-2 bg-gradient-to-br from-orange to-orange/80 rounded-lg">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <span className="font-medium">PowerPoint Deck</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}