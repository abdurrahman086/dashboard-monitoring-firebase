import React from 'react';
import { BookOpen, Wifi, WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFirebaseContext } from '@/contexts/FirebaseContext';
import { cn } from '@/lib/utils';

interface DashboardHeaderProps {
  onShowJsonGuide: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onShowJsonGuide }) => {
  const { isConnected } = useFirebaseContext();

  return (
    <header className="h-14 bg-card border-b border-border flex items-center justify-between px-6 shrink-0">
      <div>
        <span className="text-sm text-muted-foreground">IDN Boarding School</span>
        <h1 className="text-xl font-bold text-foreground -mt-1">Dashboard Monitoring System</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onShowJsonGuide}
          className="gap-2"
        >
          <BookOpen className="h-4 w-4" />
          Format JSON
        </Button>
        
        <div className={cn(
          "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium",
          isConnected 
            ? "bg-success/10 text-success border border-success/30" 
            : "bg-muted text-muted-foreground border border-border"
        )}>
          {isConnected ? (
            <>
              <Wifi className="h-4 w-4" />
              <span>Connected</span>
            </>
          ) : (
            <>
              <WifiOff className="h-4 w-4" />
              <span>Disconnected</span>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
