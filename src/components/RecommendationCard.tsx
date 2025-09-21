import { CheckCircle, Clock, XCircle, TrendingUp, FileText, Target, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { mockDealNote } from '../lib/mockData';
import { motion } from 'motion/react';

export function RecommendationCard() {
  const { recommendation } = mockDealNote;
  
  const getDecisionIcon = (decision: string) => {
    switch (decision) {
      case 'invest':
        return <CheckCircle className="w-10 h-10 text-white" />;
      case 'watch':
        return <Clock className="w-10 h-10 text-white" />;
      case 'decline':
        return <XCircle className="w-10 h-10 text-white" />;
      default:
        return <Clock className="w-10 h-10 text-white" />;
    }
  };

  const getDecisionGradient = (decision: string) => {
    switch (decision) {
      case 'invest':
        return 'bg-gradient-to-br from-teal/20 to-teal/10 border-teal/30';
      case 'watch':
        return 'bg-gradient-to-br from-orange/20 to-orange/10 border-orange/30';
      case 'decline':
        return 'bg-gradient-to-br from-destructive/20 to-destructive/10 border-destructive/30';
      default:
        return 'bg-gradient-to-br from-muted/20 to-muted/10 border-muted/30';
    }
  };

  const getIconGradient = (decision: string) => {
    switch (decision) {
      case 'invest':
        return 'bg-gradient-to-br from-teal to-teal/80';
      case 'watch':
        return 'bg-gradient-to-br from-orange to-orange/80';
      case 'decline':
        return 'bg-gradient-to-br from-destructive to-destructive/80';
      default:
        return 'bg-gradient-to-br from-muted to-muted/80';
    }
  };

  const getGlowClass = (decision: string) => {
    switch (decision) {
      case 'invest':
        return 'glow-success';
      case 'watch':
        return 'glow-warning';
      case 'decline':
        return 'glow-danger';
      default:
        return '';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card className="glass-card rounded-xl border-white/30 shadow-2xl">
        <CardHeader className="pb-4">
          <motion.div
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.6, duration: 0.3 }}
          >
            <CardTitle className="flex items-center gap-3">
              <motion.div 
                className="p-3 gradient-primary rounded-xl shadow-lg"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Target className="w-6 h-6 text-white" />
              </motion.div>
              <span className="text-xl font-semibold bg-gradient-to-r from-primary to-teal bg-clip-text text-transparent">
                Investment Decision
              </span>
            </CardTitle>
            <p className="text-muted-foreground mt-2">
              AI-powered recommendation based on comprehensive analysis
            </p>
          </motion.div>
        </CardHeader>
        <CardContent>
          <motion.div 
            className={`p-8 rounded-2xl border-2 ${getDecisionGradient(recommendation.decision)} mb-8 ${getGlowClass(recommendation.decision)} relative overflow-hidden`}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            {/* Animated background shimmer */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              animate={{ x: [-100, 300] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            
            <div className="relative z-10">
              <div className="flex items-center gap-6 mb-8">
                <motion.div 
                  className={`flex-shrink-0 p-4 rounded-2xl shadow-xl ${getIconGradient(recommendation.decision)}`}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 1, duration: 0.5, type: "spring" }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  {getDecisionIcon(recommendation.decision)}
                </motion.div>
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <motion.h3 
                      className="text-3xl font-bold capitalize bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 1.2, duration: 0.3 }}
                    >
                      {recommendation.decision}
                    </motion.h3>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.4, duration: 0.3, type: "spring" }}
                    >
                      <Badge 
                        className={`text-sm px-4 py-2 font-semibold rounded-full shadow-lg ${
                          recommendation.decision === 'invest' 
                            ? 'bg-teal/20 text-teal border-teal/30 animate-pulse-slow' 
                            : recommendation.decision === 'watch'
                            ? 'bg-orange/20 text-orange border-orange/30 animate-pulse-slow'
                            : 'bg-destructive/20 text-destructive border-destructive/30'
                        }`}
                      >
                        {recommendation.decision.toUpperCase()}
                      </Badge>
                    </motion.div>
                  </div>
                  <p className="text-muted-foreground font-medium">AI Confidence Score</p>
                </div>
              </div>
              
              <motion.div 
                className="mb-8"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.6, duration: 0.4 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-medium text-foreground/80">Confidence Level</span>
                  <span className="text-2xl font-bold">{recommendation.confidence}%</span>
                </div>
                <div className="relative">
                  <Progress value={recommendation.confidence} className="h-4 bg-white/30 rounded-full" />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full"
                    animate={{ x: [-100, 200] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                </div>
              </motion.div>
              
              <motion.div 
                className="p-6 glass rounded-xl border border-white/30"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.8, duration: 0.4 }}
              >
                <div className="flex items-start gap-3 mb-3">
                  <Sparkles className="w-5 h-5 text-primary mt-0.5" />
                  <span className="font-semibold text-primary">AI Reasoning</span>
                </div>
                <p className="text-sm leading-relaxed text-foreground/80">{recommendation.reasoning}</p>
              </motion.div>
            </div>
          </motion.div>

          <div className="grid gap-6 mb-8">
            <motion.div 
              className="p-6 gradient-card rounded-xl border border-primary/20"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 2, duration: 0.4 }}
            >
              <h4 className="font-semibold mb-4 text-primary flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                Success Factors
              </h4>
              <ul className="space-y-3">
                {recommendation.keyFactors.map((factor, index) => (
                  <motion.li 
                    key={index} 
                    className="text-sm text-foreground/80 flex items-center gap-3"
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 2.1 + (index * 0.1), duration: 0.3 }}
                  >
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                    {factor}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              className="p-6 bg-gradient-to-br from-teal/10 to-teal/5 rounded-xl border border-teal/20"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 2.2, duration: 0.4 }}
            >
              <h4 className="font-semibold mb-4 text-teal flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-teal"></div>
                Recommended Actions
              </h4>
              <ul className="space-y-3">
                {recommendation.nextSteps.map((step, index) => (
                  <motion.li 
                    key={index} 
                    className="text-sm text-foreground/80 flex items-center gap-3"
                    initial={{ x: 10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 2.3 + (index * 0.1), duration: 0.3 }}
                  >
                    <div className="w-2 h-2 bg-teal rounded-full flex-shrink-0"></div>
                    {step}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.div 
            className="flex gap-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2.4, duration: 0.4 }}
          >
            <motion.div 
              className="flex-1"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button className="w-full gradient-primary hover:shadow-lg transition-all duration-200 rounded-xl py-3">
                <FileText className="w-5 h-5 mr-2" />
                Generate Deal Note
              </Button>
            </motion.div>
            <motion.div 
              className="flex-1"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button variant="outline" className="w-full border-primary/30 hover:bg-primary/10 rounded-xl py-3">
                <TrendingUp className="w-5 h-5 mr-2" />
                Export Analysis
              </Button>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}