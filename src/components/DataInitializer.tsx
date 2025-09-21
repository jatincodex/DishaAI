import { useEffect, useState } from 'react';
import { apiService } from '../services/apiService';
import { toast } from 'sonner@2.0.3';

const DEMO_STARTUPS = [
  {
    name: 'TechNova',
    valuation: 4_500_000,
    stage: 'Seed',
    sector: 'Technology',
    revenue: 2_100_000,
    growthRate: 120,
    teamSize: 25,
    burnRate: 200_000,
    runway: 18,
    foundedYear: 2022,
  },
  {
    name: 'HealthLink',
    valuation: 8_200_000,
    stage: 'Series A',
    sector: 'Healthcare',
    revenue: 3_800_000,
    growthRate: 95,
    teamSize: 42,
    burnRate: 350_000,
    runway: 14,
    foundedYear: 2021,
  },
  {
    name: 'FinanceFlow',
    valuation: 12_000_000,
    stage: 'Series A',
    sector: 'Fintech',
    revenue: 5_200_000,
    growthRate: 85,
    teamSize: 38,
    burnRate: 420_000,
    runway: 22,
    foundedYear: 2020,
  },
  {
    name: 'EcoSustain',
    valuation: 2_800_000,
    stage: 'Pre-Seed',
    sector: 'Clean Tech',
    revenue: 800_000,
    growthRate: 180,
    teamSize: 15,
    burnRate: 120_000,
    runway: 16,
    foundedYear: 2023,
  },
  {
    name: 'DataPulse',
    valuation: 6_700_000,
    stage: 'Seed',
    sector: 'AI/ML',
    revenue: 1_900_000,
    growthRate: 140,
    teamSize: 32,
    burnRate: 290_000,
    runway: 12,
    foundedYear: 2022,
  }
];

interface DataInitializerProps {
  onInitialized?: () => void;
}

export function DataInitializer({ onInitialized }: DataInitializerProps) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);

  const initializeDemoData = async () => {
    if (isInitialized || isInitializing) return;
    
    setIsInitializing(true);
    
    try {
      // Check if we already have data
      const existingData = await apiService.getAllStartups();
      
      if (existingData.success && existingData.data.length > 0) {
        console.log('Demo data already exists, skipping initialization');
        setIsInitialized(true);
        onInitialized?.();
        return;
      }
      
      console.log('Initializing demo data...');
      
      // Try to create demo startups, but don't fail if backend is unavailable
      for (const startup of DEMO_STARTUPS) {
        try {
          await apiService.createStartup(startup);
          console.log(`Created demo startup: ${startup.name}`);
        } catch (error) {
          console.warn(`Failed to create ${startup.name}, using fallback data:`, error);
          // Continue with other startups even if one fails
        }
        
        // Small delay between creations
        await new Promise(resolve => setTimeout(resolve, 200));
      }
      
      setIsInitialized(true);
      onInitialized?.();
      
      console.log('Demo data initialization completed');
      
    } catch (error) {
      console.warn('Error initializing demo data, using fallback:', error);
      // Even if initialization fails, mark as initialized so the app can use fallback data
      setIsInitialized(true);
      onInitialized?.();
    } finally {
      setIsInitializing(false);
    }
  };

  useEffect(() => {
    // Initialize demo data when component mounts
    const init = async () => {
      await initializeDemoData();
      // Always call the callback even if initialization fails
      // This ensures the app continues to work with fallback data
      if (!isInitialized) {
        setIsInitialized(true);
        onInitialized?.();
      }
    };
    
    init();
  }, []);

  // This component doesn't render anything
  return null;
}