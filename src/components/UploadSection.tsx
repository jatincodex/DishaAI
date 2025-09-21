import { useState } from 'react';
import { Upload, FileText, CheckCircle, Sparkles, AlertCircle, Brain } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { motion, AnimatePresence } from 'motion/react';
import { apiService, StartupData } from '../services/apiService';
import { toast } from 'sonner@2.0.3';

interface UploadSectionProps {
  onStartupCreated?: (startup: StartupData) => void;
}

export function UploadSection({ onStartupCreated }: UploadSectionProps) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [startupForm, setStartupForm] = useState({
    name: '',
    valuation: '',
    stage: 'Seed',
    sector: 'Technology',
    revenue: '',
    growthRate: '',
    teamSize: '',
    burnRate: '',
    runway: ''
  });
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [hasError, setHasError] = useState(false);

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setHasError(false);
    setUploadProgress(0);
    
    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        // Validate file type
        const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'];
        if (!validTypes.includes(file.type)) {
          throw new Error(`Invalid file type: ${file.name}. Please upload PDF, Excel, or CSV files.`);
        }

        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
          throw new Error(`File too large: ${file.name}. Maximum size is 10MB.`);
        }

        const fileType = file.name.toLowerCase().includes('pitch') ? 'pitch-deck' : 'financials';
        const response = await apiService.uploadFile(file.name, fileType);
        
        if (response.success) {
          return response.data.fileName;
        }
        throw new Error(`Upload failed for ${file.name}`);
      });

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 15;
        });
      }, 300);

      const uploadedFileNames = await Promise.all(uploadPromises);
      clearInterval(progressInterval);
      setUploadProgress(100);
      setUploadedFiles(uploadedFileNames);
      setIsUploaded(true);
      
      toast.success(`Successfully uploaded ${uploadedFileNames.length} file(s)`);
    } catch (error) {
      console.error('Upload error:', error);
      setHasError(true);
      setUploadProgress(0);
      toast.error(error instanceof Error ? error.message : 'Upload failed');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const handleAnalyzeStartup = async () => {
    if (!startupForm.name.trim()) {
      toast.error('Please enter a startup name');
      return;
    }

    setIsAnalyzing(true);
    
    try {
      const startupData = {
        name: startupForm.name,
        valuation: parseFloat(startupForm.valuation) || 0,
        stage: startupForm.stage,
        sector: startupForm.sector,
        revenue: parseFloat(startupForm.revenue) || 0,
        growthRate: parseFloat(startupForm.growthRate) || 0,
        teamSize: parseInt(startupForm.teamSize) || 0,
        burnRate: parseFloat(startupForm.burnRate) || 0,
        runway: parseFloat(startupForm.runway) || 0,
        foundedYear: new Date().getFullYear() - 2,
        uploadedAt: new Date().toISOString(),
      };

      const response = await apiService.createStartup(startupData);
      
      if (response.success) {
        toast.success('Startup analysis completed successfully!');
        onStartupCreated?.(response.data.startup);
        
        // Reset form
        setStartupForm({
          name: '',
          valuation: '',
          stage: 'Seed',
          sector: 'Technology',
          revenue: '',
          growthRate: '',
          teamSize: '',
          burnRate: '',
          runway: ''
        });
        setUploadedFiles([]);
        setIsUploaded(false);
      }
    } catch (error) {
      console.error('Analysis error:', error);
      toast.error('Failed to analyze startup data');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* File Upload Section */}
      <Card className="glass-card rounded-xl border-white/30 shadow-2xl">
        <CardHeader className="pb-4">
          <motion.div
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <CardTitle className="flex items-center gap-3">
              <motion.div 
                className="p-3 gradient-primary rounded-xl shadow-lg"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Upload className="w-6 h-6 text-white" />
              </motion.div>
              <span className="text-xl font-semibold bg-gradient-to-r from-primary to-teal bg-clip-text text-transparent">
                Upload & Analyze Startup
              </span>
            </CardTitle>
            <p className="text-muted-foreground mt-2">
              Upload documents and provide startup details for comprehensive AI analysis
            </p>
          </motion.div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* File Upload */}
            <div className="space-y-4">
              <h4 className="font-medium">Document Upload (Optional)</h4>
              <motion.div 
                className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
                  isDragOver 
                    ? 'border-primary bg-primary/10 scale-105 glow-primary' 
                    : hasError
                    ? 'border-red-300 bg-red-50'
                    : 'border-primary/30 bg-gradient-to-br from-primary/5 to-teal/5 hover:border-primary/50 hover:bg-primary/8'
                }`}
                onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={handleDrop}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div 
                  className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                    hasError ? 'bg-red-100' : isDragOver ? 'bg-primary/20' : 'bg-primary/10'
                  }`}
                  animate={{ 
                    scale: isDragOver ? 1.1 : 1,
                    rotate: isDragOver ? 5 : 0 
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {hasError ? (
                    <AlertCircle className="w-8 h-8 text-red-500" />
                  ) : (
                    <FileText className={`w-8 h-8 ${isDragOver ? 'text-primary' : 'text-primary/70'}`} />
                  )}
                </motion.div>
                <h4 className="font-medium mb-2">
                  {hasError ? 'Upload Failed' : isDragOver ? 'Drop files here' : 'Drag & Drop Files'}
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  PDF, Excel, CSV files up to 10MB
                </p>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.xlsx,.csv"
                  onChange={(e) => handleFileUpload(e.target.files)}
                  className="hidden"
                  id="file-upload"
                />
                <Button 
                  onClick={() => document.getElementById('file-upload')?.click()}
                  size="sm" 
                  variant="outline"
                  className="rounded-lg"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Choose Files
                </Button>
              </motion.div>
              
              {uploadProgress > 0 && uploadProgress < 100 && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-2 p-3 bg-primary/5 rounded-lg border border-primary/20"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Uploading...</span>
                    <span className="text-sm text-primary">{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </motion.div>
              )}
              
              {uploadedFiles.length > 0 && (
                <div className="space-y-2">
                  <h5 className="text-sm font-medium text-teal">Uploaded Files:</h5>
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-teal/10 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-teal" />
                      <span className="text-sm">{file}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Startup Information Form */}
            <div className="space-y-4">
              <h4 className="font-medium">Startup Information</h4>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="name">Company Name *</Label>
                  <Input
                    id="name"
                    value={startupForm.name}
                    onChange={(e) => setStartupForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., TechNova"
                    className="bg-input-background"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="valuation">Valuation ($M)</Label>
                    <Input
                      id="valuation"
                      type="number"
                      value={startupForm.valuation}
                      onChange={(e) => setStartupForm(prev => ({ ...prev, valuation: e.target.value }))}
                      placeholder="4.5"
                      className="bg-input-background"
                    />
                  </div>
                  <div>
                    <Label htmlFor="stage">Stage</Label>
                    <select
                      id="stage"
                      value={startupForm.stage}
                      onChange={(e) => setStartupForm(prev => ({ ...prev, stage: e.target.value }))}
                      className="w-full p-2 border rounded-md bg-input-background"
                    >
                      <option value="Pre-Seed">Pre-Seed</option>
                      <option value="Seed">Seed</option>
                      <option value="Series A">Series A</option>
                      <option value="Series B">Series B</option>
                      <option value="Growth">Growth</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="revenue">Revenue ($M)</Label>
                    <Input
                      id="revenue"
                      type="number"
                      value={startupForm.revenue}
                      onChange={(e) => setStartupForm(prev => ({ ...prev, revenue: e.target.value }))}
                      placeholder="2.1"
                      className="bg-input-background"
                    />
                  </div>
                  <div>
                    <Label htmlFor="growthRate">Growth Rate (%)</Label>
                    <Input
                      id="growthRate"
                      type="number"
                      value={startupForm.growthRate}
                      onChange={(e) => setStartupForm(prev => ({ ...prev, growthRate: e.target.value }))}
                      placeholder="120"
                      className="bg-input-background"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="teamSize">Team Size</Label>
                    <Input
                      id="teamSize"
                      type="number"
                      value={startupForm.teamSize}
                      onChange={(e) => setStartupForm(prev => ({ ...prev, teamSize: e.target.value }))}
                      placeholder="25"
                      className="bg-input-background"
                    />
                  </div>
                  <div>
                    <Label htmlFor="sector">Sector</Label>
                    <select
                      id="sector"
                      value={startupForm.sector}
                      onChange={(e) => setStartupForm(prev => ({ ...prev, sector: e.target.value }))}
                      className="w-full p-2 border rounded-md bg-input-background"
                    >
                      <option value="Technology">Technology</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Fintech">Fintech</option>
                      <option value="E-commerce">E-commerce</option>
                      <option value="SaaS">SaaS</option>
                      <option value="AI/ML">AI/ML</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="burnRate">Burn Rate ($K/month)</Label>
                    <Input
                      id="burnRate"
                      type="number"
                      value={startupForm.burnRate}
                      onChange={(e) => setStartupForm(prev => ({ ...prev, burnRate: e.target.value }))}
                      placeholder="200"
                      className="bg-input-background"
                    />
                  </div>
                  <div>
                    <Label htmlFor="runway">Runway (months)</Label>
                    <Input
                      id="runway"
                      type="number"
                      value={startupForm.runway}
                      onChange={(e) => setStartupForm(prev => ({ ...prev, runway: e.target.value }))}
                      placeholder="18"
                      className="bg-input-background"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-border">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex justify-center"
            >
              <Button 
                onClick={handleAnalyzeStartup}
                disabled={isAnalyzing || !startupForm.name.trim()}
                size="lg" 
                className="gradient-primary hover:shadow-lg transition-all duration-200 rounded-xl px-12 py-3"
              >
                {isAnalyzing ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="mr-2"
                    >
                      <Sparkles className="w-5 h-5" />
                    </motion.div>
                    Analyzing Startup...
                  </>
                ) : (
                  <>
                    <Brain className="w-5 h-5 mr-2" />
                    Start AI Analysis
                  </>
                )}
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}