import { Search, Bell, User, Settings } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { motion } from 'motion/react';

export function Header() {
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="h-16 border-b border-white/20 bg-white/80 backdrop-blur-xl flex items-center justify-between px-8 shadow-lg relative z-10"
    >
      {/* Search */}
      <div className="flex-1 max-w-md">
        <motion.div 
          className="relative"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search startups, deals, or reports..."
            className="pl-12 h-11 bg-white/60 backdrop-blur-md border-white/30 rounded-full focus:border-primary/50 focus:ring-primary/20 focus:bg-white/80 transition-all duration-200 shadow-sm"
          />
        </motion.div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button variant="ghost" size="sm" className="relative h-10 w-10 rounded-full hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all duration-200">
            <Bell className="w-5 h-5 text-gray-600" />
            <motion.span 
              className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, duration: 0.2 }}
            >
              <span className="absolute inset-0 bg-destructive rounded-full animate-ping"></span>
            </motion.span>
          </Button>
        </motion.div>

        {/* Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="ghost" className="relative h-12 w-12 rounded-full hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all duration-200">
                <Avatar className="h-9 w-9 border-2 border-primary/30 shadow-lg">
                  <AvatarFallback className="bg-gradient-to-br from-primary to-teal text-white font-semibold">DA</AvatarFallback>
                </Avatar>
              </Button>
            </motion.div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 glass-card rounded-xl border-white/30" align="end" forceMount>
            <div className="flex flex-col space-y-1 p-3">
              <p className="font-semibold text-foreground">Disha AI</p>
              <p className="text-xs text-muted-foreground">
                analyst@disha.ai
              </p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="hover:bg-primary/10 rounded-lg m-1">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-primary/10 rounded-lg m-1">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="hover:bg-destructive/10 text-destructive rounded-lg m-1">
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.header>
  );
}