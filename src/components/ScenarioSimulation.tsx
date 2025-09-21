import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { Calculator, TrendingUp, DollarSign, Users, Clock } from 'lucide-react';
import { motion } from 'motion/react';

export function ScenarioSimulation() {
  const [fundingAmount, setFundingAmount] = useState([2000000]);
  const [growthRate, setGrowthRate] = useState([78]);
  const [burnMultiple, setBurnMultiple] = useState([2.4]);
  
  // Calculate scenarios based on inputs
  const calculateProjections = () => {
    const monthlyRevenue = 100000; // $1.2M ARR / 12
    const currentBurn = 85000;
    
    const newGrowthRate = growthRate[0];
    const newBurnMultiple = burnMultiple[0];
    const funding = fundingAmount[0];
    
    const projectedRevenue12M = monthlyRevenue * 12 * (1 + newGrowthRate/100);
    const projectedBurn12M = (monthlyRevenue * 12 * (newGrowthRate/100)) / 12 * newBurnMultiple;
    const runwayMonths = funding / projectedBurn12M;
    const valuation = projectedRevenue12M * 8; // 8x revenue multiple
    
    return {
      projectedRevenue12M,
      projectedBurn12M,
      runwayMonths,
      valuation
    };
  };
  
  const projections = calculateProjections();
  
  const formatCurrency = (amount: number) => {
    return `$${(amount / 1000000).toFixed(1)}M`;
  };
  
  const formatMonths = (months: number) => {
    return `${Math.round(months)} months`;
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <Card className="glass-card rounded-xl border-white/30 shadow-2xl">
        <CardHeader className="pb-4">
          <motion.div
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.8, duration: 0.3 }}
          >
            <CardTitle className="flex items-center gap-3">
              <motion.div 
                className="p-3 gradient-primary rounded-xl shadow-lg"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Calculator className="w-6 h-6 text-white" />
              </motion.div>
              <span className="text-xl font-semibold bg-gradient-to-r from-primary to-teal bg-clip-text text-transparent">
                Scenario Simulation
              </span>
            </CardTitle>
            <p className="text-muted-foreground mt-2">
              Adjust parameters to simulate different funding and growth scenarios
            </p>
          </motion.div>
        </CardHeader>
        <CardContent>
          {/* Input Controls */}
          <div className="space-y-8 mb-8">
            <motion.div 
              className="p-6 glass rounded-xl border border-white/20"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.4 }}
            >
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="font-medium text-foreground flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-primary" />
                      Funding Amount
                    </label>
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                      {formatCurrency(fundingAmount[0])}
                    </Badge>
                  </div>
                  <Slider
                    value={fundingAmount}
                    onValueChange={setFundingAmount}
                    max={10000000}
                    min={500000}
                    step={250000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>$0.5M</span>
                    <span>$10M</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="font-medium text-foreground flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-teal" />
                      Annual Growth Rate
                    </label>
                    <Badge variant="outline" className="bg-teal/10 text-teal border-teal/30">
                      {growthRate[0]}%
                    </Badge>
                  </div>
                  <Slider
                    value={growthRate}
                    onValueChange={setGrowthRate}
                    max={300}
                    min={20}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>20%</span>
                    <span>300%</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="font-medium text-foreground flex items-center gap-2">
                      <Clock className="w-4 h-4 text-orange" />
                      Burn Multiple
                    </label>
                    <Badge variant="outline" className="bg-orange/10 text-orange border-orange/30">
                      {burnMultiple[0]}x
                    </Badge>
                  </div>
                  <Slider
                    value={burnMultiple}
                    onValueChange={setBurnMultiple}
                    max={5.0}
                    min={0.5}
                    step={0.1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>0.5x</span>
                    <span>5.0x</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Projection Results */}
          <motion.div 
            className="grid grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <motion.div 
              className="p-6 gradient-card rounded-xl border border-primary/20 group hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-br from-primary to-primary/80 rounded-xl">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Projected ARR (12M)</p>
                  <motion.p 
                    className="text-2xl font-bold text-primary"
                    key={projections.projectedRevenue12M}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {formatCurrency(projections.projectedRevenue12M)}
                  </motion.p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="p-6 gradient-card rounded-xl border border-teal/20 group hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-br from-teal to-teal/80 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Projected Valuation</p>
                  <motion.p 
                    className="text-2xl font-bold text-teal"
                    key={projections.valuation}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {formatCurrency(projections.valuation)}
                  </motion.p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="p-6 gradient-card rounded-xl border border-orange/20 group hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-br from-orange to-orange/80 rounded-xl">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Projected Runway</p>
                  <motion.p 
                    className="text-2xl font-bold text-orange"
                    key={projections.runwayMonths}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {formatMonths(projections.runwayMonths)}
                  </motion.p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="p-6 gradient-card rounded-xl border border-destructive/20 group hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-br from-destructive to-destructive/80 rounded-xl">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Burn Rate</p>
                  <motion.p 
                    className="text-2xl font-bold text-destructive"
                    key={projections.projectedBurn12M}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    ${Math.round(projections.projectedBurn12M / 1000)}K
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Scenario Assessment */}
          <motion.div 
            className="mt-8 p-6 gradient-card rounded-xl border border-primary/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.5 }}
          >
            <h4 className="font-semibold mb-3 text-primary flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              Scenario Assessment
            </h4>
            <p className="text-sm text-foreground/80 leading-relaxed">
              {projections.runwayMonths > 18 
                ? "✅ Strong runway provides sufficient time for growth milestones" 
                : projections.runwayMonths > 12 
                ? "⚠️ Moderate runway requires efficient execution and milestone achievement"
                : "🚨 Short runway creates pressure for immediate fundraising or profitability"}
            </p>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}