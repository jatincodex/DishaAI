import { AlertTriangle, AlertCircle, Info, Shield, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { riskIndicators } from '../lib/mockData';
import { motion } from 'motion/react';

export function RiskIndicators() {
  const getRiskIcon = (type: string) => {
    switch (type) {
      case 'high':
        return <AlertTriangle className="w-5 h-5 text-white" />;
      case 'medium':
        return <AlertCircle className="w-5 h-5 text-white" />;
      case 'low':
        return <Info className="w-5 h-5 text-white" />;
      default:
        return <Info className="w-5 h-5 text-white" />;
    }
  };

  const getRiskBadgeClass = (type: string) => {
    switch (type) {
      case 'high':
        return 'bg-destructive/20 text-destructive border-destructive/30 animate-pulse-slow';
      case 'medium':
        return 'bg-orange/20 text-orange border-orange/30';
      case 'low':
        return 'bg-primary/20 text-primary border-primary/30';
      default:
        return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  const getRiskIconBg = (type: string) => {
    switch (type) {
      case 'high':
        return 'bg-gradient-to-br from-destructive to-destructive/80';
      case 'medium':
        return 'bg-gradient-to-br from-orange to-orange/80';
      case 'low':
        return 'bg-gradient-to-br from-primary to-primary/80';
      default:
        return 'bg-gradient-to-br from-muted to-muted/80';
    }
  };

  const getRiskCardBg = (type: string) => {
    switch (type) {
      case 'high':
        return 'bg-gradient-to-br from-destructive/10 to-destructive/5 border-destructive/20 hover:border-destructive/30';
      case 'medium':
        return 'bg-gradient-to-br from-orange/10 to-orange/5 border-orange/20 hover:border-orange/30';
      case 'low':
        return 'bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 hover:border-primary/30';
      default:
        return 'bg-gradient-to-br from-muted/10 to-muted/5 border-muted/20 hover:border-muted/30';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <Card className="glass-card rounded-xl border-white/30 shadow-2xl">
        <CardHeader>
          <motion.div
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.8, duration: 0.3 }}
          >
            <CardTitle className="flex items-center gap-3">
              <motion.div 
                className="p-3 bg-gradient-to-br from-destructive to-orange rounded-xl shadow-lg"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Shield className="w-6 h-6 text-white" />
              </motion.div>
              <span className="text-xl font-semibold bg-gradient-to-r from-destructive to-orange bg-clip-text text-transparent">
                Risk Indicators
              </span>
            </CardTitle>
          </motion.div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {riskIndicators.map((risk, index) => (
              <motion.div 
                key={risk.id} 
                className={`p-5 rounded-xl border-2 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${getRiskCardBg(risk.type)}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + (index * 0.1), duration: 0.4 }}
                whileHover={{ y: -2 }}
              >
                <div className="flex items-start gap-4">
                  <motion.div 
                    className={`p-3 rounded-xl shadow-lg ${getRiskIconBg(risk.type)}`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {getRiskIcon(risk.type)}
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      <h4 className="font-semibold text-foreground">{risk.title}</h4>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1.2 + (index * 0.1), duration: 0.3 }}
                      >
                        <Badge className={`text-xs px-3 py-1 rounded-full ${getRiskBadgeClass(risk.type)}`}>
                          {risk.type.toUpperCase()}
                        </Badge>
                      </motion.div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                      {risk.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      <span className="font-semibold">Impact:</span> {risk.impact}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="mt-6 p-6 gradient-card rounded-xl border border-primary/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.5 }}
          >
            <div className="flex items-start gap-3 mb-3">
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <Eye className="w-5 h-5 text-primary mt-0.5" />
              </motion.div>
              <span className="font-semibold text-primary">AI Risk Assessment</span>
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed">
              Overall risk profile is <span className="font-semibold text-teal">manageable</span> with proactive mitigation strategies. 
              Recommend addressing <span className="font-semibold text-destructive">customer concentration</span> as top priority.
            </p>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}