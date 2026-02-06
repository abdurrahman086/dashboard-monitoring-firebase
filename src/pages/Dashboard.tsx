import React, { useState, useEffect } from 'react';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { SwitchCard } from '@/components/dashboard/SwitchCard';
import { DimmerCard } from '@/components/dashboard/DimmerCard';
import { ChartMonitoringCard } from '@/components/dashboard/ChartMonitoringCard';
import { TerminalLog } from '@/components/dashboard/TerminalLog';
import { JsonGuideModal } from '@/components/dashboard/JsonGuideModal';
import { FirebaseProvider } from '@/contexts/FirebaseContext';

const DashboardContent: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showJsonGuide, setShowJsonGuide] = useState(true); // Open on initial load

  return (
    <div className="min-h-screen flex w-full bg-background">
      {/* Sidebar */}
      <DashboardSidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <DashboardHeader onShowJsonGuide={() => setShowJsonGuide(true)} />

        {/* Dashboard Grid */}
        <main className="flex-1 p-6 overflow-y-auto scrollbar-thin">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Switch Card - Takes 2 columns on large screens */}
            <div className="lg:col-span-2">
              <SwitchCard />
            </div>

            {/* Dimmer Card */}
            <div className="lg:col-span-1">
              <DimmerCard />
            </div>
          </div>

          {/* Chart Monitoring - Full width */}
          <div className="mt-6">
            <ChartMonitoringCard />
          </div>

          {/* Terminal Log */}
          <div className="mt-6">
            <TerminalLog />
          </div>
        </main>
      </div>

      {/* JSON Guide Modal */}
      <JsonGuideModal 
        isOpen={showJsonGuide} 
        onClose={() => setShowJsonGuide(false)} 
      />
    </div>
  );
};

const Dashboard: React.FC = () => {
  return (
    <FirebaseProvider>
      <DashboardContent />
    </FirebaseProvider>
  );
};

export default Dashboard;
