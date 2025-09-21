import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { TrendingUp, TrendingDown, Minus, Globe, MessageSquare, Users, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NewsItem {
  id: string;
  title: string;
  source: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  timestamp: string;
  impact: 'high' | 'medium' | 'low';
  category: string;
}

const mockNewsData: NewsItem[] = [
  {
    id: '1',
    title: 'Enterprise SaaS Market Sees 23% Growth in Q4',
    source: 'TechCrunch',
    sentiment: 'positive',
    timestamp: '2 hours ago',
    impact: 'high',
    category: 'Market Trends'
  },
  {
    id: '2',
    title: 'Workflow Automation Tools Face Increasing Competition',
    source: 'VentureBeat',
    sentiment: 'negative',
    timestamp: '4 hours ago',
    impact: 'medium',
    category: 'Competition'
  },
  {
    id: '3',
    title: 'AI-Powered Solutions Drive Enterprise Adoption',
    source: 'Forbes',
    sentiment: 'positive',
    timestamp: '6 hours ago',
    impact: 'high',
    category: 'Technology'
  },
  {
    id: '4',
    title: 'Series A Funding Down 15% QoQ Across SaaS Sector',
    source: 'PitchBook',
    sentiment: 'negative',
    timestamp: '1 day ago',
    impact: 'medium',
    category: 'Funding'
  },
  {
    id: '5',
    title: 'Customer Retention Metrics Show Industry Improvement',
    source: 'SaaStr',
    sentiment: 'positive',
    timestamp: '2 days ago',
    impact: 'low',
    category: 'Metrics'
  }
];

const marketMetrics = [
  {
    label: 'Market Sentiment',
    value: 'Positive',
    change: '+12%',
    trend: 'up' as const,
    description: 'Based on 127 recent articles'
  },
  {
    label: 'Funding Climate',
    value: 'Cautious',
    change: '-8%',
    trend: 'down' as const,
    description: 'Series A deals down QoQ'
  },
  {
    label: 'Competition Level',
    value: 'High',
    change: '0%',
    trend: 'neutral' as const,
    description: '45 active competitors identified'
  }
];

export function MarketSignals() {
  const [activeNews, setActiveNews] = useState(mockNewsData);
  
  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <TrendingUp className="w-4 h-4 text-teal" />;
      case 'negative':
        return <TrendingDown className="w-4 h-4 text-destructive" />;
      default:
        return <Minus className="w-4 h-4 text-orange" />;
    }
  };
  
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-teal/10 text-teal border-teal/30';
      case 'negative':
        return 'bg-destructive/10 text-destructive border-destructive/30';
      default:
        return 'bg-orange/10 text-orange border-orange/30';
    }
  };
  
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-green-100 text-green-800 border-green-200';
    }
  };
  
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-teal" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-destructive" />;
      default:
        return <Minus className="w-4 h-4 text-orange" />;
    }
  };
  
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
                className="p-3 gradient-primary rounded-xl shadow-lg"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Globe className="w-6 h-6 text-white" />
              </motion.div>
              <span className="text-xl font-semibold bg-gradient-to-r from-primary to-teal bg-clip-text text-transparent">
                Social & Market Signals
              </span>
            </CardTitle>
            <p className="text-muted-foreground mt-2">
              Real-time market intelligence and sentiment analysis
            </p>
          </motion.div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Market Metrics */}
            <motion.div 
              className="lg:col-span-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.4 }}
            >
              <h4 className="font-semibold mb-4 text-primary flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                Market Overview
              </h4>
              <div className="space-y-4">
                {marketMetrics.map((metric, index) => (
                  <motion.div 
                    key={index}
                    className="p-4 glass rounded-xl border border-white/20 hover:shadow-lg transition-all duration-300"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3 + (index * 0.1), duration: 0.3 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-muted-foreground">{metric.label}</span>
                      <div className="flex items-center gap-1">
                        {getTrendIcon(metric.trend)}
                        <span className="text-xs font-medium">{metric.change}</span>
                      </div>
                    </div>
                    <motion.p 
                      className="font-semibold text-foreground mb-1"
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {metric.value}
                    </motion.p>
                    <p className="text-xs text-muted-foreground">{metric.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* News Feed */}
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4, duration: 0.4 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-primary flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                  Live News Feed
                </h4>
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 animate-pulse-slow">
                  <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                  Live
                </Badge>
              </div>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                <AnimatePresence>
                  {activeNews.map((news, index) => (
                    <motion.div 
                      key={news.id}
                      className="group p-4 glass rounded-xl border border-white/20 hover:shadow-lg transition-all duration-300 cursor-pointer"
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.95 }}
                      transition={{ delay: 1.5 + (index * 0.1), duration: 0.3 }}
                      whileHover={{ scale: 1.01, y: -1 }}
                      layout
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 1.6 + (index * 0.1), duration: 0.2 }}
                          >
                            {getSentimentIcon(news.sentiment)}
                          </motion.div>
                          <Badge variant="outline" className={`text-xs px-2 py-1 ${getSentimentColor(news.sentiment)}`}>
                            {news.sentiment}
                          </Badge>
                          <Badge variant="outline" className={`text-xs px-2 py-1 ${getImpactColor(news.impact)}`}>
                            {news.impact} impact
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{news.timestamp}</span>
                          <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                      
                      <h5 className="font-medium text-foreground mb-2 group-hover:text-primary transition-colors">
                        {news.title}
                      </h5>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="w-3 h-3" />
                          <span>{news.source}</span>
                        </div>
                        <Badge variant="outline" className="bg-muted/10 text-muted-foreground border-muted/30">
                          {news.category}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
          
          {/* Sentiment Summary */}
          <motion.div 
            className="mt-8 p-6 gradient-card rounded-xl border border-primary/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-primary to-primary/80 rounded-lg">
                <Users className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-primary">Sentiment Analysis Summary</span>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <motion.div 
                  className="text-2xl font-bold text-teal mb-1"
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  60%
                </motion.div>
                <p className="text-sm text-muted-foreground">Positive</p>
              </div>
              <div className="text-center">
                <motion.div 
                  className="text-2xl font-bold text-orange mb-1"
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  25%
                </motion.div>
                <p className="text-sm text-muted-foreground">Neutral</p>
              </div>
              <div className="text-center">
                <motion.div 
                  className="text-2xl font-bold text-destructive mb-1"
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  15%
                </motion.div>
                <p className="text-sm text-muted-foreground">Negative</p>
              </div>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}