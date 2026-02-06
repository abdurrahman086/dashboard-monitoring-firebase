import React from 'react';
import { Gauge, Trash2 } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { useFirebaseContext } from '@/contexts/FirebaseContext';
import { DimmerDevice } from '@/types/iot';

interface DimmerWidgetProps {
  deviceKey: string;
  device: DimmerDevice;
}

export const DimmerWidget: React.FC<DimmerWidgetProps> = ({ deviceKey, device }) => {
  const { updateDevice, deleteDevice } = useFirebaseContext();

  const handleValueChange = async (values: number[]) => {
    await updateDevice(deviceKey, values[0]);
  };

  const handleDelete = async () => {
    await deleteDevice(deviceKey);
  };

  const formatName = (key: string) => {
    return key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const percentage = Math.round((device.value / device.upper_limit) * 100);

  return (
    <div className="dimmer-widget group relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={handleDelete}
        className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
      >
        <Trash2 className="h-3 w-3" />
      </Button>
      
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Gauge className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-foreground">
            {formatName(deviceKey)}
          </span>
        </div>
        <span className="text-xs text-muted-foreground">
          {device.unit}
        </span>
      </div>
      
      <div className="flex items-center gap-4">
        <Slider
          value={[device.value]}
          onValueChange={handleValueChange}
          max={device.upper_limit}
          step={1}
          className="flex-1"
        />
        <div className="text-right min-w-[80px]">
          <div className="text-lg font-bold text-primary">{device.value}</div>
          <div className="text-xs text-muted-foreground">{percentage}%</div>
        </div>
      </div>
      
      <div className="flex justify-between mt-2 text-xs text-muted-foreground">
        <span>0</span>
        <span>{device.upper_limit}</span>
      </div>
    </div>
  );
};
