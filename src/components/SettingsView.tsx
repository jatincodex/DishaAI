import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { toast } from 'sonner@2.0.3';
import { 
  User, 
  Bell, 
  Palette, 
  Brain, 
  Shield, 
  Settings2, 
  Eye, 
  Mail, 
  Smartphone,
  Key,
  Link,
  Save,
  Camera,
  LogOut,
  Lock
} from 'lucide-react';

interface UserProfile {
  name: string;
  email: string;
  company: string;
  role: string;
}

interface Preferences {
  defaultDashboard: string;
  investmentMetrics: string;
  chartView: string;
  compactMode: boolean;
}

interface NotificationSettings {
  riskFlags: boolean;
  aiRecommendations: boolean;
  newsUpdates: boolean;
  emailNotifications: boolean;
  inAppNotifications: boolean;
  priorityStartups: boolean;
}

interface AISettings {
  financialWeight: number;
  marketWeight: number;
  teamWeight: number;
  technologyWeight: number;
  scenarioSimulation: boolean;
  peerBenchmarking: boolean;
  marketSignals: boolean;
}

interface SecuritySettings {
  twoFactor: boolean;
  googleConnected: boolean;
  slackConnected: boolean;
  notionConnected: boolean;
}

export function SettingsView() {
  const [activeTab, setActiveTab] = useState('profile');
  const [theme, setTheme] = useState('light');
  const [isLoading, setIsLoading] = useState(false);

  // User Profile State
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    company: 'Venture Capital Partners',
    role: 'Senior Investment Analyst'
  });

  // Preferences State
  const [preferences, setPreferences] = useState<Preferences>({
    defaultDashboard: 'kpi',
    investmentMetrics: 'comprehensive',
    chartView: 'detailed',
    compactMode: false
  });

  // Notification Settings State
  const [notifications, setNotifications] = useState<NotificationSettings>({
    riskFlags: true,
    aiRecommendations: true,
    newsUpdates: false,
    emailNotifications: true,
    inAppNotifications: true,
    priorityStartups: true
  });

  // AI Settings State
  const [aiSettings, setAISettings] = useState<AISettings>({
    financialWeight: 30,
    marketWeight: 25,
    teamWeight: 25,
    technologyWeight: 20,
    scenarioSimulation: true,
    peerBenchmarking: true,
    marketSignals: false
  });

  // Security Settings State
  const [security, setSecurity] = useState<SecuritySettings>({
    twoFactor: false,
    googleConnected: true,
    slackConnected: false,
    notionConnected: true
  });

  const handleSaveProfile = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Profile updated successfully!');
    }, 1000);
  };

  const handleSavePreferences = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Preferences saved successfully!');
    }, 800);
  };

  const handleSaveNotifications = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Notification settings updated!');
    }, 800);
  };

  const handleSaveAISettings = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success('AI settings configured successfully!');
    }, 1000);
  };

  const handleWeightChange = (type: keyof AISettings, value: number[]) => {
    setAISettings(prev => ({ ...prev, [type]: value[0] }));
  };

  const ThemePreview = ({ themeName, isActive }: { themeName: string; isActive: boolean }) => (
    <div 
      className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
        isActive 
          ? 'border-primary glow-primary' 
          : 'border-border hover:border-primary/50'
      }`}
      onClick={() => setTheme(themeName)}
    >
      <div className={`w-full h-20 rounded-md ${
        themeName === 'light' ? 'bg-white' :
        themeName === 'dark' ? 'bg-gray-900' :
        'bg-gradient-to-br from-purple-500 to-blue-500'
      }`}>
        <div className="p-2 space-y-1">
          <div className={`h-2 w-1/2 rounded ${
            themeName === 'light' ? 'bg-gray-300' :
            themeName === 'dark' ? 'bg-gray-600' :
            'bg-white/70'
          }`} />
          <div className={`h-1 w-1/3 rounded ${
            themeName === 'light' ? 'bg-gray-200' :
            themeName === 'dark' ? 'bg-gray-700' :
            'bg-white/50'
          }`} />
        </div>
      </div>
      <p className="mt-2 text-center capitalize">{themeName}</p>
    </div>
  );

  return (
    <div className="p-6 max-w-6xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account, preferences, and platform configuration</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-6 lg:w-fit bg-card/50 backdrop-blur-sm">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center gap-2">
            <Settings2 className="w-4 h-4" />
            <span className="hidden sm:inline">Preferences</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="theme" className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            <span className="hidden sm:inline">Theme</span>
          </TabsTrigger>
          <TabsTrigger value="ai" className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            <span className="hidden sm:inline">AI Settings</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
        </TabsList>

        {/* User Profile Tab */}
        <TabsContent value="profile" className="space-y-6 animate-slide-in">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                User Profile
              </CardTitle>
              <CardDescription>
                Manage your personal information and account details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src="/placeholder-avatar.jpg" />
                    <AvatarFallback className="text-lg bg-primary text-primary-foreground">AJ</AvatarFallback>
                  </Avatar>
                  <Button size="icon" variant="outline" className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full">
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-1">
                  <h3>{userProfile.name}</h3>
                  <p className="text-muted-foreground">{userProfile.role}</p>
                  <Badge variant="outline">{userProfile.company}</Badge>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={userProfile.name}
                    onChange={(e) => setUserProfile(prev => ({ ...prev, name: e.target.value }))}
                    className="bg-input-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={userProfile.email}
                    onChange={(e) => setUserProfile(prev => ({ ...prev, email: e.target.value }))}
                    className="bg-input-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={userProfile.company}
                    onChange={(e) => setUserProfile(prev => ({ ...prev, company: e.target.value }))}
                    className="bg-input-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    value={userProfile.role}
                    onChange={(e) => setUserProfile(prev => ({ ...prev, role: e.target.value }))}
                    className="bg-input-background"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={handleSaveProfile} disabled={isLoading} className="bg-primary hover:bg-primary/90">
                  <Save className="w-4 h-4 mr-2" />
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </Button>
                <Button variant="outline">
                  <Lock className="w-4 h-4 mr-2" />
                  Change Password
                </Button>
                <Button variant="destructive" className="ml-auto">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences" className="space-y-6 animate-slide-in">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings2 className="w-5 h-5 text-primary" />
                Dashboard Preferences
              </CardTitle>
              <CardDescription>
                Customize your default dashboard view and display options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label>Default Dashboard View</Label>
                  <Select value={preferences.defaultDashboard} onValueChange={(value) => 
                    setPreferences(prev => ({ ...prev, defaultDashboard: value }))
                  }>
                    <SelectTrigger className="bg-input-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kpi">KPI Overview</SelectItem>
                      <SelectItem value="benchmark">Benchmark Analysis</SelectItem>
                      <SelectItem value="risk">Risk Assessment</SelectItem>
                      <SelectItem value="scenario">Scenario Simulation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label>Investment Metrics</Label>
                  <Select value={preferences.investmentMetrics} onValueChange={(value) => 
                    setPreferences(prev => ({ ...prev, investmentMetrics: value }))
                  }>
                    <SelectTrigger className="bg-input-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic Metrics</SelectItem>
                      <SelectItem value="comprehensive">Comprehensive Analysis</SelectItem>
                      <SelectItem value="custom">Custom Selection</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label>Chart View Style</Label>
                  <Select value={preferences.chartView} onValueChange={(value) => 
                    setPreferences(prev => ({ ...prev, chartView: value }))
                  }>
                    <SelectTrigger className="bg-input-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="compact">Compact View</SelectItem>
                      <SelectItem value="detailed">Detailed View</SelectItem>
                      <SelectItem value="minimal">Minimal View</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Compact Mode</Label>
                    <p className="text-sm text-muted-foreground">Reduce spacing for more content</p>
                  </div>
                  <Switch
                    checked={preferences.compactMode}
                    onCheckedChange={(checked) => 
                      setPreferences(prev => ({ ...prev, compactMode: checked }))
                    }
                  />
                </div>
              </div>

              <Button onClick={handleSavePreferences} disabled={isLoading} className="bg-primary hover:bg-primary/90">
                <Save className="w-4 h-4 mr-2" />
                {isLoading ? 'Saving...' : 'Save Preferences'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6 animate-slide-in">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                Notification Settings
              </CardTitle>
              <CardDescription>
                Configure when and how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Alert Types</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Risk Flag Alerts</Label>
                      <p className="text-sm text-muted-foreground">Get notified when startups show risk indicators</p>
                    </div>
                    <Switch
                      checked={notifications.riskFlags}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, riskFlags: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>AI Recommendations</Label>
                      <p className="text-sm text-muted-foreground">Receive AI-powered investment insights</p>
                    </div>
                    <Switch
                      checked={notifications.aiRecommendations}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, aiRecommendations: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Market News Updates</Label>
                      <p className="text-sm text-muted-foreground">Stay informed about market trends</p>
                    </div>
                    <Switch
                      checked={notifications.newsUpdates}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, newsUpdates: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Priority Startup Alerts</Label>
                      <p className="text-sm text-muted-foreground">High-priority notifications for tracked startups</p>
                    </div>
                    <Switch
                      checked={notifications.priorityStartups}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, priorityStartups: checked }))
                      }
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Delivery Methods</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <div className="space-y-1">
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications.emailNotifications}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, emailNotifications: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Smartphone className="w-4 h-4 text-muted-foreground" />
                      <div className="space-y-1">
                        <Label>In-App Notifications</Label>
                        <p className="text-sm text-muted-foreground">Show notifications in the app</p>
                      </div>
                    </div>
                    <Switch
                      checked={notifications.inAppNotifications}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, inAppNotifications: checked }))
                      }
                    />
                  </div>
                </div>
              </div>

              <Button onClick={handleSaveNotifications} disabled={isLoading} className="bg-primary hover:bg-primary/90">
                <Save className="w-4 h-4 mr-2" />
                {isLoading ? 'Saving...' : 'Save Notification Settings'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Theme Tab */}
        <TabsContent value="theme" className="space-y-6 animate-slide-in">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-primary" />
                Theme & Appearance
              </CardTitle>
              <CardDescription>
                Customize the look and feel of your dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Choose Theme</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <ThemePreview themeName="light" isActive={theme === 'light'} />
                  <ThemePreview themeName="dark" isActive={theme === 'dark'} />
                  <ThemePreview themeName="custom" isActive={theme === 'custom'} />
                </div>
              </div>

              {theme === 'custom' && (
                <div className="space-y-4 p-4 bg-accent/50 rounded-lg">
                  <h4 className="font-medium">Custom Color Settings</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label>Primary Color</Label>
                      <div className="w-full h-10 bg-primary rounded border cursor-pointer hover:scale-105 transition-transform" />
                    </div>
                    <div className="space-y-2">
                      <Label>Secondary Color</Label>
                      <div className="w-full h-10 bg-teal rounded border cursor-pointer hover:scale-105 transition-transform" />
                    </div>
                    <div className="space-y-2">
                      <Label>Accent Color</Label>
                      <div className="w-full h-10 bg-orange rounded border cursor-pointer hover:scale-105 transition-transform" />
                    </div>
                    <div className="space-y-2">
                      <Label>Background</Label>
                      <div className="w-full h-10 bg-background border rounded cursor-pointer hover:scale-105 transition-transform" />
                    </div>
                  </div>
                </div>
              )}

              <div className="p-4 bg-gradient-card rounded-lg border">
                <h4 className="font-medium mb-3">Preview</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Button size="sm" className="bg-primary hover:bg-primary/90">Primary Button</Button>
                    <Button size="sm" variant="outline">Secondary Button</Button>
                    <Badge>Badge</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-teal rounded" />
                    <span className="text-sm">Success indicator</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-orange rounded" />
                    <span className="text-sm">Warning indicator</span>
                  </div>
                </div>
              </div>

              <Button className="bg-primary hover:bg-primary/90">
                <Save className="w-4 h-4 mr-2" />
                Apply Theme
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Settings Tab */}
        <TabsContent value="ai" className="space-y-6 animate-slide-in">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                AI Configuration
              </CardTitle>
              <CardDescription>
                Customize AI scoring weights and enable advanced features
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Scoring Weights</h4>
                  <p className="text-sm text-muted-foreground">
                    Adjust how much each factor influences the overall startup score
                  </p>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Financial Metrics</Label>
                        <span className="text-sm text-muted-foreground">{aiSettings.financialWeight}%</span>
                      </div>
                      <Slider
                        value={[aiSettings.financialWeight]}
                        onValueChange={(value) => handleWeightChange('financialWeight', value)}
                        max={50}
                        min={10}
                        step={5}
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Market Opportunity</Label>
                        <span className="text-sm text-muted-foreground">{aiSettings.marketWeight}%</span>
                      </div>
                      <Slider
                        value={[aiSettings.marketWeight]}
                        onValueChange={(value) => handleWeightChange('marketWeight', value)}
                        max={50}
                        min={10}
                        step={5}
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Team Quality</Label>
                        <span className="text-sm text-muted-foreground">{aiSettings.teamWeight}%</span>
                      </div>
                      <Slider
                        value={[aiSettings.teamWeight]}
                        onValueChange={(value) => handleWeightChange('teamWeight', value)}
                        max={50}
                        min={10}
                        step={5}
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Technology Innovation</Label>
                        <span className="text-sm text-muted-foreground">{aiSettings.technologyWeight}%</span>
                      </div>
                      <Slider
                        value={[aiSettings.technologyWeight]}
                        onValueChange={(value) => handleWeightChange('technologyWeight', value)}
                        max={50}
                        min={10}
                        step={5}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-accent/50 rounded-lg">
                    <p className="text-sm">
                      Total: {aiSettings.financialWeight + aiSettings.marketWeight + aiSettings.teamWeight + aiSettings.technologyWeight}%
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Advanced Features</h4>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Scenario Simulation</Label>
                        <p className="text-sm text-muted-foreground">Generate what-if scenarios for investment outcomes</p>
                      </div>
                      <Switch
                        checked={aiSettings.scenarioSimulation}
                        onCheckedChange={(checked) => 
                          setAISettings(prev => ({ ...prev, scenarioSimulation: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Peer Benchmarking</Label>
                        <p className="text-sm text-muted-foreground">Compare startups against industry peers</p>
                      </div>
                      <Switch
                        checked={aiSettings.peerBenchmarking}
                        onCheckedChange={(checked) => 
                          setAISettings(prev => ({ ...prev, peerBenchmarking: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Market Signals Analysis</Label>
                        <p className="text-sm text-muted-foreground">Track real-time market trends and signals</p>
                      </div>
                      <Switch
                        checked={aiSettings.marketSignals}
                        onCheckedChange={(checked) => 
                          setAISettings(prev => ({ ...prev, marketSignals: checked }))
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Button onClick={handleSaveAISettings} disabled={isLoading} className="bg-primary hover:bg-primary/90">
                <Save className="w-4 h-4 mr-2" />
                {isLoading ? 'Saving...' : 'Save AI Configuration'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6 animate-slide-in">
          <div className="grid gap-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Security Settings
                </CardTitle>
                <CardDescription>
                  Manage your account security and authentication methods
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <Switch
                    checked={security.twoFactor}
                    onCheckedChange={(checked) => 
                      setSecurity(prev => ({ ...prev, twoFactor: checked }))
                    }
                  />
                </div>

                {security.twoFactor && (
                  <div className="p-4 bg-teal/10 border border-teal/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-4 h-4 text-teal" />
                      <span className="text-sm font-medium text-teal">2FA Enabled</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Your account is protected with two-factor authentication
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Link className="w-5 h-5 text-primary" />
                  Connected Accounts
                </CardTitle>
                <CardDescription>
                  Manage integrations with third-party services
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-medium">G</span>
                    </div>
                    <div className="space-y-1">
                      <Label>Google Account</Label>
                      <p className="text-sm text-muted-foreground">Access Google Drive and Sheets</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {security.googleConnected && <Badge variant="outline" className="bg-teal/10 text-teal border-teal/20">Connected</Badge>}
                    <Switch
                      checked={security.googleConnected}
                      onCheckedChange={(checked) => 
                        setSecurity(prev => ({ ...prev, googleConnected: checked }))
                      }
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-500 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-medium">S</span>
                    </div>
                    <div className="space-y-1">
                      <Label>Slack Workspace</Label>
                      <p className="text-sm text-muted-foreground">Send notifications to Slack</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {security.slackConnected && <Badge variant="outline" className="bg-teal/10 text-teal border-teal/20">Connected</Badge>}
                    <Switch
                      checked={security.slackConnected}
                      onCheckedChange={(checked) => 
                        setSecurity(prev => ({ ...prev, slackConnected: checked }))
                      }
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-medium">N</span>
                    </div>
                    <div className="space-y-1">
                      <Label>Notion Workspace</Label>
                      <p className="text-sm text-muted-foreground">Export reports to Notion</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {security.notionConnected && <Badge variant="outline" className="bg-teal/10 text-teal border-teal/20">Connected</Badge>}
                    <Switch
                      checked={security.notionConnected}
                      onCheckedChange={(checked) => 
                        setSecurity(prev => ({ ...prev, notionConnected: checked }))
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="w-5 h-5 text-primary" />
                  API Management
                </CardTitle>
                <CardDescription>
                  Manage API keys for advanced integrations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                  <div className="space-y-1">
                    <Label>API Key</Label>
                    <p className="text-sm text-muted-foreground font-mono">disha_live_••••••••••••••••</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4 mr-2" />
                      Show
                    </Button>
                    <Button size="sm" variant="outline">Regenerate</Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>API Usage</Label>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Requests this month</span>
                      <span>2,847 / 10,000</span>
                    </div>
                    <div className="w-full bg-accent rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '28%' }} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}