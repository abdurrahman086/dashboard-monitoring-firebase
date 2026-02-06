import React, { useRef, useEffect } from 'react';
import { Terminal, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFirebaseContext } from '@/contexts/FirebaseContext';
import { cn } from '@/lib/utils';

export const TerminalLog: React.FC = () => {
  const { logs, clearLogs } = useFirebaseContext();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-success';
      case 'error': return 'text-destructive';
      case 'warning': return 'text-warning';
      default: return 'text-terminal-text';
    }
  };

  return (
    <div className="dashboard-card h-48 flex flex-col">
      <div className="dashboard-card-header justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-primary" />
          <span className="dashboard-card-title">Terminal Log</span>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={clearLogs}
          className="h-6 w-6 text-muted-foreground hover:text-foreground"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex-1 terminal rounded-b-lg overflow-y-auto scrollbar-thin p-3 font-mono text-xs"
      >
        {logs.length === 0 ? (
          <div className="terminal-line text-muted-foreground">
            <span className="terminal-prompt">$ </span>
            <span>waiting for instructions...</span>
          </div>
        ) : (
          logs.map((log) => (
            <div key={log.id} className="terminal-line">
              <span className="text-muted-foreground mr-2">[{formatTime(log.timestamp)}]</span>
              <span className="terminal-prompt">$ </span>
              <span className={cn(getTypeColor(log.type))}>{log.message}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
