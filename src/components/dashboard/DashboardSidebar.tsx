import React, { useState } from 'react';
import { Menu, Database, Wrench, Play, ChevronDown, ChevronRight, Wifi, WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useFirebaseContext } from '@/contexts/FirebaseContext';
import { DeviceType, IoTDevice } from '@/types/iot';
import { cn } from '@/lib/utils';

interface DashboardSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ isCollapsed, onToggle }) => {
  const { isConnected, isConnecting, connect, disconnect, createDevice, simulateData, addLog } = useFirebaseContext();
  
  // Firebase Config State
  const [apiKey, setApiKey] = useState('');
  const [databaseURL, setDatabaseURL] = useState('');
  const [databasePath, setDatabasePath] = useState('iot/monitoring');
  
  // Builder State
  const [keyName, setKeyName] = useState('');
  const [units, setUnits] = useState('');
  const [upperLimit, setUpperLimit] = useState('100');
  const [componentType, setComponentType] = useState<DeviceType>('sensor');
  
  // Simulator State
  const [minValue, setMinValue] = useState('0');
  const [maxValue, setMaxValue] = useState('100');
  const [simulationDuration, setSimulationDuration] = useState('30');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationInterval, setSimulationInterval] = useState<NodeJS.Timeout | null>(null);
  
  // Section open states
  const [firebaseOpen, setFirebaseOpen] = useState(true);
  const [builderOpen, setBuilderOpen] = useState(false);
  const [simulatorOpen, setSimulatorOpen] = useState(false);

  const handleConnect = async () => {
    if (isConnected) {
      await disconnect();
    } else {
      await connect({ apiKey, databaseURL, databasePath });
    }
  };

  const handleSaveStructure = async () => {
    if (!keyName.trim()) {
      addLog('Key name is required', 'error');
      return;
    }

    let device: IoTDevice;
    
    switch (componentType) {
      case 'switch':
        device = { type: 'switch', value: 0 };
        break;
      case 'dimmer':
        device = { 
          type: 'dimmer', 
          value: 0, 
          upper_limit: parseInt(upperLimit) || 1024, 
          unit: units || 'RPM' 
        };
        break;
      case 'sensor':
      default:
        device = { 
          type: 'sensor', 
          value: 0, 
          upper_limit: parseInt(upperLimit) || 100, 
          unit: units || '%' 
        };
        break;
    }

    await createDevice(keyName.toLowerCase().replace(/\s+/g, '_'), device);
    setKeyName('');
    setUnits('');
    setUpperLimit('100');
  };

  const handleStartSimulation = () => {
    if (isSimulating) {
      if (simulationInterval) {
        clearInterval(simulationInterval);
        setSimulationInterval(null);
      }
      setIsSimulating(false);
      addLog('Simulation stopped', 'info');
      return;
    }

    const duration = parseInt(simulationDuration) * 1000;
    const min = parseFloat(minValue);
    const max = parseFloat(maxValue);

    addLog(`Starting simulation: range ${min}-${max} for ${simulationDuration}s`, 'info');
    setIsSimulating(true);

    const interval = setInterval(() => {
      simulateData(min, max);
    }, 5000);

    setSimulationInterval(interval);

    setTimeout(() => {
      clearInterval(interval);
      setSimulationInterval(null);
      setIsSimulating(false);
      addLog('Simulation completed', 'success');
    }, duration);
  };

  if (isCollapsed) {
    return (
      <aside className="w-16 bg-sidebar border-r border-sidebar-border flex flex-col items-center py-4 gap-4 shrink-0">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onToggle}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="flex flex-col gap-2 items-center">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => { onToggle(); setFirebaseOpen(true); }}
            className={cn(
              "text-sidebar-foreground hover:bg-sidebar-accent",
              isConnected && "text-success"
            )}
          >
            <Database className="h-5 w-5" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => { onToggle(); setBuilderOpen(true); }}
            className="text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <Wrench className="h-5 w-5" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => { onToggle(); setSimulatorOpen(true); }}
            className={cn(
              "text-sidebar-foreground hover:bg-sidebar-accent",
              isSimulating && "text-warning animate-pulse"
            )}
          >
            <Play className="h-5 w-5" />
          </Button>
        </div>

        <div className="mt-auto">
          {isConnected ? (
            <Wifi className="h-5 w-5 text-success" />
          ) : (
            <WifiOff className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-72 bg-sidebar border-r border-sidebar-border flex flex-col shrink-0 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-sidebar-border">
        <span className="font-semibold text-sm uppercase tracking-wide text-sidebar-foreground">
          Sidebar Configuration
        </span>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onToggle}
          className="text-sidebar-foreground hover:bg-sidebar-accent h-8 w-8"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {/* Firebase Config Section */}
        <Collapsible open={firebaseOpen} onOpenChange={setFirebaseOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-3 hover:bg-sidebar-accent transition-colors">
            <div className="flex items-center gap-2">
              <Database className={cn("h-4 w-4", isConnected ? "text-success" : "text-sidebar-foreground")} />
              <span className="text-sm font-medium text-sidebar-foreground">Firebase Config</span>
            </div>
            {firebaseOpen ? (
              <ChevronDown className="h-4 w-4 text-sidebar-foreground" />
            ) : (
              <ChevronRight className="h-4 w-4 text-sidebar-foreground" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="px-4 pb-4 space-y-3">
            <div className="space-y-2">
              <Label htmlFor="apiKey" className="text-xs text-muted-foreground">Firebase API Key</Label>
              <Input 
                id="apiKey"
                placeholder="AIzaSy..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="h-9 text-sm"
                disabled={isConnected}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="databaseURL" className="text-xs text-muted-foreground">Database URL</Label>
              <Input 
                id="databaseURL"
                placeholder="https://your-project.firebaseio.com"
                value={databaseURL}
                onChange={(e) => setDatabaseURL(e.target.value)}
                className="h-9 text-sm"
                disabled={isConnected}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="databasePath" className="text-xs text-muted-foreground">Path (iot/monitoring)</Label>
              <Input 
                id="databasePath"
                placeholder="iot/monitoring"
                value={databasePath}
                onChange={(e) => setDatabasePath(e.target.value)}
                className="h-9 text-sm"
                disabled={isConnected}
              />
            </div>
            <Button 
              onClick={handleConnect}
              disabled={isConnecting}
              className={cn(
                "w-full",
                isConnected ? "bg-destructive hover:bg-destructive/90" : "bg-secondary hover:bg-secondary/90"
              )}
            >
              {isConnecting ? 'Connecting...' : isConnected ? 'Disconnect' : 'Connect database'}
            </Button>
          </CollapsibleContent>
        </Collapsible>

        {/* Builder Parameter Section */}
        <Collapsible open={builderOpen} onOpenChange={setBuilderOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-3 hover:bg-sidebar-accent transition-colors border-t border-sidebar-border">
            <div className="flex items-center gap-2">
              <Wrench className="h-4 w-4 text-sidebar-foreground" />
              <span className="text-sm font-medium text-sidebar-foreground">Builder Parameter</span>
            </div>
            {builderOpen ? (
              <ChevronDown className="h-4 w-4 text-sidebar-foreground" />
            ) : (
              <ChevronRight className="h-4 w-4 text-sidebar-foreground" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="px-4 pb-4 space-y-3">
            <div className="space-y-2">
              <Label htmlFor="keyName" className="text-xs text-muted-foreground">Key Name: Ex: Temp</Label>
              <Input 
                id="keyName"
                placeholder="e.g., humidity"
                value={keyName}
                onChange={(e) => setKeyName(e.target.value)}
                className="h-9 text-sm"
                disabled={!isConnected}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Component Type</Label>
              <Select value={componentType} onValueChange={(v) => setComponentType(v as DeviceType)} disabled={!isConnected}>
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sensor">Sensor</SelectItem>
                  <SelectItem value="switch">Switch</SelectItem>
                  <SelectItem value="dimmer">Dimmer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {componentType !== 'switch' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="units" className="text-xs text-muted-foreground">Units: Ex: %</Label>
                  <Input 
                    id="units"
                    placeholder="e.g., %, °C, RPM"
                    value={units}
                    onChange={(e) => setUnits(e.target.value)}
                    className="h-9 text-sm"
                    disabled={!isConnected}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="upperLimit" className="text-xs text-muted-foreground">Upper limit (default: 100/1024)</Label>
                  <Input 
                    id="upperLimit"
                    type="number"
                    placeholder="100"
                    value={upperLimit}
                    onChange={(e) => setUpperLimit(e.target.value)}
                    className="h-9 text-sm"
                    disabled={!isConnected}
                  />
                </div>
              </>
            )}
            <Button 
              onClick={handleSaveStructure}
              disabled={!isConnected || !keyName.trim()}
              className="w-full bg-secondary hover:bg-secondary/90"
            >
              Save structure
            </Button>
          </CollapsibleContent>
        </Collapsible>

        {/* Global Simulator Section */}
        <Collapsible open={simulatorOpen} onOpenChange={setSimulatorOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-3 hover:bg-sidebar-accent transition-colors border-t border-sidebar-border">
            <div className="flex items-center gap-2">
              <Play className={cn("h-4 w-4", isSimulating ? "text-warning animate-pulse" : "text-sidebar-foreground")} />
              <span className="text-sm font-medium text-sidebar-foreground">Global Simulator</span>
            </div>
            {simulatorOpen ? (
              <ChevronDown className="h-4 w-4 text-sidebar-foreground" />
            ) : (
              <ChevronRight className="h-4 w-4 text-sidebar-foreground" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="px-4 pb-4 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label htmlFor="minValue" className="text-xs text-muted-foreground">Min</Label>
                <Input 
                  id="minValue"
                  type="number"
                  placeholder="0"
                  value={minValue}
                  onChange={(e) => setMinValue(e.target.value)}
                  className="h-9 text-sm"
                  disabled={!isConnected || isSimulating}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxValue" className="text-xs text-muted-foreground">Max</Label>
                <Input 
                  id="maxValue"
                  type="number"
                  placeholder="100"
                  value={maxValue}
                  onChange={(e) => setMaxValue(e.target.value)}
                  className="h-9 text-sm"
                  disabled={!isConnected || isSimulating}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration" className="text-xs text-muted-foreground">Simulation time (seconds)</Label>
              <Input 
                id="duration"
                type="number"
                placeholder="30"
                value={simulationDuration}
                onChange={(e) => setSimulationDuration(e.target.value)}
                className="h-9 text-sm"
                disabled={!isConnected || isSimulating}
              />
            </div>
            <Button 
              onClick={handleStartSimulation}
              disabled={!isConnected}
              className={cn(
                "w-full",
                isSimulating ? "bg-destructive hover:bg-destructive/90" : "bg-secondary hover:bg-secondary/90"
              )}
            >
              {isSimulating ? 'Stop simulation' : 'Start simulation'}
            </Button>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-sidebar-border text-xs text-muted-foreground">
        ©2026 | Abdurrahman. All rights reserved.
      </div>
    </aside>
  );
};
