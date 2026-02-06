import React from 'react';
import { Power, Trash2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useFirebaseContext } from '@/contexts/FirebaseContext';
import { SwitchDevice } from '@/types/iot';
import { cn } from '@/lib/utils';

interface SwitchWidgetProps {
  deviceKey: string;
  device: SwitchDevice;
}

export const SwitchWidget: React.FC<SwitchWidgetProps> = ({ deviceKey, device }) => {
  const { updateDevice, deleteDevice } = useFirebaseContext();
  const isOn = device.value === 1;

  const handleToggle = async (checked: boolean) => {
    await updateDevice(deviceKey, checked ? 1 : 0);
  };

  const handleDelete = async () => {
    await deleteDevice(deviceKey);
  };

  const formatName = (key: string) => {
    return key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className={cn(
      "switch-widget group relative",
      isOn && "switch-widget-active"
    )}>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleDelete}
        className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
      >
        <Trash2 className="h-3 w-3" />
      </Button>
      
      <div className={cn(
        "w-10 h-10 rounded-full flex items-center justify-center mb-2",
        isOn ? "bg-primary/20" : "bg-muted"
      )}>
        <Power className={cn(
          "h-5 w-5",
          isOn ? "text-primary" : "text-muted-foreground"
        )} />
      </div>
      
      <span className="text-sm font-medium text-foreground text-center">
        {formatName(deviceKey)}
      </span>
      
      <span className="text-xs text-muted-foreground mb-2">
        Value: {device.value}
      </span>
      
      <Switch 
        checked={isOn} 
        onCheckedChange={handleToggle}
        className="data-[state=checked]:bg-primary"
      />
    </div>
  );
};
