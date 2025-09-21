import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { DealNotesView } from './components/DealNotesView';
import { BenchmarksView } from './components/BenchmarksView';
import { ReportsView } from './components/ReportsView';
import { SettingsView } from './components/SettingsView';
import { DataInitializer } from './components/DataInitializer';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [activeView, setActiveView] = useState('home');

  const renderView = () => {
    switch (activeView) {
      case 'home':
      case 'ai-analyst':
        return <DashboardView />;
      case 'deal-flow':
        return <DealNotesView />;
      case 'benchmarks':
        return <BenchmarksView />;
      case 'reports':
        return <ReportsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="h-screen flex bg-background">
      <DataInitializer />
      <Toaster />
      
      {/* Sidebar */}
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        {/* Content Area */}
        <main className="flex-1 overflow-y-auto">
          {renderView()}
        </main>
      </div>
    </div>
  );
}