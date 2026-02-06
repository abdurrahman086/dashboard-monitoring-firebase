import React, { useState, useEffect, useRef } from 'react';
import { Activity, Trash2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { Button } from '@/components/ui/button';
import { useFirebaseContext } from '@/contexts/FirebaseContext';
import { SensorDevice, SensorHistory } from '@/types/iot';

interface SensorWidgetProps {
  deviceKey: string;
  device: SensorDevice;
}

export const SensorWidget: React.FC<SensorWidgetProps> = ({ deviceKey, device }) => {
  const { deleteDevice } = useFirebaseContext();
  const [history, setHistory] = useState<SensorHistory[]>([]);
  const maxHistoryLength = 20;

  // Track value changes and add to history
  useEffect(() => {
    setHistory(prev => {
      const newEntry: SensorHistory = {
        timestamp: Date.now(),
        value: device.value,
      };
      
      const updated = [...prev, newEntry];
      if (updated.length > maxHistoryLength) {
        return updated.slice(-maxHistoryLength);
      }
      return updated;
    });
  }, [device.value]);

  const handleDelete = async () => {
    await deleteDevice(deviceKey);
  };

  const formatName = (key: string) => {
    return key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const chartData = history.map(item => ({
    time: formatTime(item.timestamp),
    value: item.value,
  }));

  const percentage = Math.round((device.value / device.upper_limit) * 100);

  return (
    <div className="chart-widget group relative bg-card rounded-lg border border-border">
      <Button
        variant="ghost"
        size="icon"
        onClick={handleDelete}
        className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity z-10 text-muted-foreground hover:text-destructive"
      >
        <Trash2 className="h-3 w-3" />
      </Button>
      
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-secondary" />
          <span className="text-sm font-medium text-foreground">
            {formatName(deviceKey)}
          </span>
        </div>
        <div className="text-right">
          <span className="text-lg font-bold text-secondary">{device.value}</span>
          <span className="text-sm text-muted-foreground ml-1">{device.unit}</span>
        </div>
      </div>
      
      <div className="h-32">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="hsl(var(--chart-grid))" 
              vertical={false}
            />
            <XAxis 
              dataKey="time" 
              tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
              tickLine={false}
              axisLine={false}
              interval="preserveStartEnd"
            />
            <YAxis 
              domain={[0, device.upper_limit]}
              tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
              tickLine={false}
              axisLine={false}
              width={30}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                fontSize: '12px',
              }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="hsl(var(--chart-secondary))" 
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: 'hsl(var(--chart-secondary))' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
        <span>Limit: {device.upper_limit} {device.unit}</span>
        <span>{percentage}% of max</span>
      </div>
    </div>
  );
};
