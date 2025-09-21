import { BarChart3, TrendingUp, Users, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { benchmarkData, sectorBreakdown } from '../lib/mockData';

const COLORS = ['#2563eb', '#16a34a', '#dc2626', '#ca8a04', '#9333ea'];

const financialMultiples = [
  { metric: 'Revenue Multiple', startup: 3.8, sectorAvg: 4.2, topQuartile: 6.5 },
  { metric: 'EBITDA Multiple', startup: 'N/A', sectorAvg: 12.5, topQuartile: 18.2 },
  { metric: 'ARR Multiple', startup: 3.8, sectorAvg: 4.1, topQuartile: 6.8 },
  { metric: 'EV/Sales', startup: 4.2, sectorAvg: 4.8, topQuartile: 7.2 }
];

export function BenchmarksView() {
  return (
    <div className="min-h-full bg-gradient-to-br from-blue-50/50 to-indigo-50/30">
      <div className="p-8 space-y-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">Benchmark Analysis</h1>
          <p className="text-lg text-muted-foreground">Compare startup metrics against sector peers and top performers</p>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="glass-card rounded-xl border-white/30 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-primary to-primary/80 rounded-xl shadow-lg">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Revenue Multiple</p>
                  <p className="text-2xl font-bold text-foreground">3.8x</p>
                  <p className="text-xs text-destructive font-medium">-10% vs sector</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card rounded-xl border-white/30 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-teal to-teal/80 rounded-xl shadow-lg">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Growth Rate</p>
                  <p className="text-2xl font-bold text-foreground">78%</p>
                  <p className="text-xs text-orange font-medium">-35% vs top quartile</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card rounded-xl border-white/30 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Employee Count</p>
                  <p className="text-2xl font-bold text-foreground">28</p>
                  <p className="text-xs text-teal font-medium">Efficient scaling</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card rounded-xl border-white/30 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-orange to-orange/80 rounded-xl shadow-lg">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Gross Margin</p>
                  <p className="text-2xl font-bold text-foreground">72%</p>
                  <p className="text-xs text-muted-foreground font-medium">At sector avg</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Performance Comparison Bar Chart */}
          <Card className="glass-card rounded-xl border-white/30 shadow-2xl">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 gradient-primary rounded-xl shadow-lg">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <span className="bg-gradient-to-r from-primary to-teal bg-clip-text text-transparent">
                  Performance Comparison
                </span>
              </CardTitle>
              <p className="text-muted-foreground">TechNova vs sector benchmarks</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={benchmarkData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.6} />
                  <XAxis 
                    dataKey="metric" 
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    interval={0}
                  />
                  <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
                  <Bar dataKey="startup" fill="#1a73e8" name="TechNova" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="sectorAverage" fill="#64748b" name="Sector Avg" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="topQuartile" fill="#34a853" name="Top Quartile" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Sector Breakdown */}
          <Card className="glass-card rounded-xl border-white/30 shadow-2xl">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 gradient-primary rounded-xl shadow-lg">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <span className="bg-gradient-to-r from-primary to-teal bg-clip-text text-transparent">
                  Portfolio Distribution
                </span>
              </CardTitle>
              <p className="text-muted-foreground">Investment focus by sector</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={sectorBreakdown}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ sector, percentage }) => `${sector} ${percentage}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="count"
                    stroke="#ffffff"
                    strokeWidth={2}
                  >
                    {sectorBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Financial Multiples Table */}
        <Card className="glass-card rounded-xl border-white/30 shadow-2xl">
          <CardHeader className="pb-6">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 gradient-primary rounded-xl shadow-lg">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <span className="bg-gradient-to-r from-primary to-teal bg-clip-text text-transparent">
                Financial Multiples
              </span>
            </CardTitle>
            <p className="text-muted-foreground">
              Valuation metrics compared to industry benchmarks
            </p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/20">
                    <TableHead className="font-semibold text-foreground">Metric</TableHead>
                    <TableHead className="text-right font-semibold text-foreground">TechNova</TableHead>
                    <TableHead className="text-right font-semibold text-foreground">Sector Average</TableHead>
                    <TableHead className="text-right font-semibold text-foreground">Top Quartile</TableHead>
                    <TableHead className="text-right font-semibold text-foreground">Percentile</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {financialMultiples.map((row, index) => {
                    const percentile = typeof row.startup === 'number' 
                      ? Math.round((row.startup / row.topQuartile) * 100)
                      : 0;
                    
                    return (
                      <TableRow key={index} className="border-white/10 hover:bg-white/20 transition-colors">
                        <TableCell className="font-medium text-foreground py-4">{row.metric}</TableCell>
                        <TableCell className="text-right font-semibold text-lg py-4">
                          {typeof row.startup === 'number' ? `${row.startup}x` : row.startup}
                        </TableCell>
                        <TableCell className="text-right text-muted-foreground py-4">{row.sectorAvg}x</TableCell>
                        <TableCell className="text-right text-muted-foreground py-4">{row.topQuartile}x</TableCell>
                        <TableCell className="text-right py-4">
                          {typeof row.startup === 'number' ? (
                            <Badge 
                              variant={percentile >= 75 ? 'default' : percentile >= 50 ? 'secondary' : 'destructive'}
                              className={`px-3 py-1 font-semibold ${
                                percentile >= 75 
                                  ? 'bg-teal/20 text-teal border-teal/30' 
                                  : percentile >= 50 
                                  ? 'bg-orange/20 text-orange border-orange/30' 
                                  : 'bg-destructive/20 text-destructive border-destructive/30'
                              }`}
                            >
                              {percentile}th
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-muted/20 text-muted-foreground border-muted/30">
                              N/A
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Hiring & Traction Data */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="glass-card rounded-xl border-white/30 shadow-2xl">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 gradient-primary rounded-xl shadow-lg">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <span className="bg-gradient-to-r from-primary to-teal bg-clip-text text-transparent">
                  Hiring Velocity
                </span>
              </CardTitle>
              <p className="text-muted-foreground">Team growth by department</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-foreground">Engineering</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 bg-white/30 rounded-full h-3 shadow-inner">
                      <div className="bg-gradient-to-r from-primary to-primary/80 h-3 rounded-full w-3/4 shadow-sm"></div>
                    </div>
                    <span className="font-semibold text-primary w-10">75%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-foreground">Sales</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 bg-white/30 rounded-full h-3 shadow-inner">
                      <div className="bg-gradient-to-r from-teal to-teal/80 h-3 rounded-full w-1/2 shadow-sm"></div>
                    </div>
                    <span className="font-semibold text-teal w-10">50%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-foreground">Marketing</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 bg-white/30 rounded-full h-3 shadow-inner">
                      <div className="bg-gradient-to-r from-orange to-orange/80 h-3 rounded-full w-1/3 shadow-sm"></div>
                    </div>
                    <span className="font-semibold text-orange w-10">33%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card rounded-xl border-white/30 shadow-2xl">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 gradient-primary rounded-xl shadow-lg">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <span className="bg-gradient-to-r from-primary to-teal bg-clip-text text-transparent">
                  Traction Metrics
                </span>
              </CardTitle>
              <p className="text-muted-foreground">Key performance indicators</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-muted-foreground">Monthly Active Users</span>
                  <span className="font-bold text-xl text-foreground">2,450</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-muted-foreground">Customer Acquisition Cost</span>
                  <span className="font-bold text-xl text-foreground">$1,250</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-muted-foreground">Lifetime Value</span>
                  <span className="font-bold text-xl text-foreground">$18,500</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-muted-foreground">LTV/CAC Ratio</span>
                  <span className="font-bold text-xl text-teal">14.8x</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-muted-foreground">Churn Rate</span>
                  <span className="font-bold text-xl text-foreground">2.1%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}