import { Home, TrendingUp, Brain, BarChart3, FileText, Settings, Building2 } from 'lucide-react';
import { Button } from './ui/button';
import { motion } from 'motion/react';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const navigationItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'deal-flow', label: 'Deal Flow', icon: TrendingUp },
  { id: 'ai-analyst', label: 'AI Analyst', icon: Brain },
  { id: 'benchmarks', label: 'Benchmarks', icon: BarChart3 },
  { id: 'reports', label: 'Reports', icon: FileText },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  return (
    <motion.div 
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-64 gradient-primary h-full flex flex-col shadow-2xl relative overflow-hidden"
    >
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent"></div>
      
      {/* Logo */}
      <div className="relative p-6 border-b border-white/20">
        <motion.div 
          className="flex items-center gap-3"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30 shadow-lg">
            <Building2 className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-white text-lg">Disha AI</h2>
            <p className="text-xs text-white/80">Startup Evaluation Platform</p>
          </div>
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="relative flex-1 p-4 space-y-2">
        {navigationItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <motion.div
              key={item.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 * index, duration: 0.3 }}
            >
              <Button
                variant="ghost"
                className={`w-full justify-start gap-3 h-12 px-4 rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? 'bg-white/20 text-white border border-white/30 shadow-lg backdrop-blur-md' 
                    : 'text-white/90 hover:bg-white/10 hover:text-white hover:scale-105 hover:shadow-lg'
                }`}
                onClick={() => onViewChange(item.id)}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.div>
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <motion.div
                    className="ml-auto w-2 h-2 bg-white rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </Button>
            </motion.div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="relative p-4 border-t border-white/20">
        <motion.div 
          className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/20"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.3 }}
        >
          <div className="w-2 h-2 bg-white rounded-full animate-pulse-slow"></div>
          <span className="text-xs font-medium text-white">Powered by Google Cloud AI</span>
        </motion.div>
      </div>
    </motion.div>
  );
}