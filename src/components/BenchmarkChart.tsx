import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend } from 'recharts';
import { benchmarkData } from '../lib/mockData';
import { motion } from 'motion/react';
import { BarChart3, TrendingUp } from 'lucide-react';

const chartData = benchmarkData.map(item => ({
  metric: item.metric.replace(' ', '\n'),
  startup: (item.startup / item.topQuartile) * 100,
  sectorAvg: (item.sectorAverage / item.topQuartile) * 100,
  topQuartile: 100
}));

export function BenchmarkChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
    >
      <Card className="glass-card rounded-xl border-white/30 shadow-2xl">
        <CardHeader className="pb-4">
          <motion.div
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            transition={{ delay: 1, duration: 0.3 }}
          >
            <CardTitle className="flex items-center gap-3">
              <motion.div 
                className="p-3 bg-gradient-to-br from-primary via-teal to-primary rounded-xl shadow-lg"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <BarChart3 className="w-6 h-6 text-white" />
              </motion.div>
              <span className="text-xl font-semibold bg-gradient-to-r from-primary to-teal bg-clip-text text-transparent">
                Performance Benchmarking
              </span>
            </CardTitle>
            <p className="text-muted-foreground mt-2">
              Competitive analysis vs sector peers (normalized to top quartile = 100%)
            </p>
          </motion.div>
        </CardHeader>
        <CardContent>
          <motion.div 
            className="gradient-card p-8 rounded-2xl border border-primary/20 shadow-lg"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <ResponsiveContainer width="100%" height={320}>
              <RadarChart data={chartData}>
                <PolarGrid stroke="rgba(26, 115, 232, 0.2)" />
                <PolarAngleAxis 
                  dataKey="metric" 
                  tick={{ fontSize: 12, fill: '#5f6368', fontWeight: 500 }}
                  className="text-muted-foreground"
                />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 120]}
                  tick={{ fontSize: 10, fill: '#9ca3af' }}
                  tickCount={4}
                  stroke="rgba(26, 115, 232, 0.1)"
                />
                <motion.g
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.4, duration: 0.8 }}
                >
                  <Radar
                    name="TechFlow AI"
                    dataKey="startup"
                    stroke="#1a73e8"
                    fill="#1a73e8"
                    fillOpacity={0.2}
                    strokeWidth={3}
                  />
                </motion.g>
                <motion.g
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.6, duration: 0.6 }}
                >
                  <Radar
                    name="Sector Average"
                    dataKey="sectorAvg"
                    stroke="#9ca3af"
                    fill="#9ca3af"
                    fillOpacity={0.1}
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  />
                </motion.g>
                <motion.g
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.8, duration: 0.6 }}
                >
                  <Radar
                    name="Top Quartile"
                    dataKey="topQuartile"
                    stroke="#34a853"
                    fill="transparent"
                    strokeWidth={2}
                    strokeDasharray="3 3"
                  />
                </motion.g>
                <Legend 
                  wrapperStyle={{ 
                    paddingTop: '20px',
                    fontSize: '13px',
                    fontWeight: '500'
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>
          
          <div className="mt-8 grid grid-cols-3 gap-6">
            <motion.div 
              className="text-center p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border border-primary/20 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.4 }}
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <div className="w-5 h-5 bg-primary rounded-full mx-auto mb-3 shadow-lg"></div>
              <span className="font-semibold text-primary">TechFlow AI</span>
              <p className="text-xs text-muted-foreground mt-1">Current Performance</p>
            </motion.div>
            <motion.div 
              className="text-center p-4 bg-gradient-to-br from-muted/10 to-muted/5 rounded-xl border border-muted/20 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.1, duration: 0.4 }}
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <div className="w-5 h-1 bg-muted-foreground mx-auto mb-3 rounded" style={{borderStyle: 'dashed'}}></div>
              <span className="font-semibold text-muted-foreground">Sector Average</span>
              <p className="text-xs text-muted-foreground mt-1">Industry Baseline</p>
            </motion.div>
            <motion.div 
              className="text-center p-4 bg-gradient-to-br from-teal/10 to-teal/5 rounded-xl border border-teal/20 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 0.4 }}
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <div className="w-5 h-1 bg-teal mx-auto mb-3 rounded" style={{borderStyle: 'dotted'}}></div>
              <span className="font-semibold text-teal">Top Quartile</span>
              <p className="text-xs text-muted-foreground mt-1">Best in Class</p>
            </motion.div>
          </div>
          
          <motion.div
            className="mt-6 p-4 bg-gradient-to-r from-teal/10 to-primary/10 rounded-xl border border-teal/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.4, duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-teal" />
              <span className="font-semibold text-teal">Performance Insight</span>
            </div>
            <p className="text-sm text-foreground/80">
              TechFlow AI outperforms sector average across <span className="font-semibold text-primary">5 out of 6 metrics</span>, 
              with particularly strong showing in <span className="font-semibold text-teal">revenue growth</span> and <span className="font-semibold text-teal">customer retention</span>.
            </p>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}