import React from 'react';
import { Power, ToggleLeft } from 'lucide-react';
import { SwitchWidget } from '@/components/widgets/SwitchWidget';
import { useFirebaseContext } from '@/contexts/FirebaseContext';
import { SwitchDevice } from '@/types/iot';

export const SwitchCard: React.FC = () => {
  const { devices } = useFirebaseContext();

  const switches = Object.entries(devices).filter(
    ([_, device]) => device.type === 'switch'
  ) as [string, SwitchDevice][];

  return (
    <div className="dashboard-card">
      <div className="dashboard-card-header">
        <Power className="h-4 w-4 text-primary" />
        <span className="dashboard-card-title">Switch Digital (0/1)</span>
      </div>
      <div className="dashboard-card-content">
        {switches.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
            <ToggleLeft className="h-10 w-10 mb-2 opacity-50" />
            <p className="text-sm">No switch devices</p>
            <p className="text-xs">Add switches via Builder Parameter</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {switches.map(([key, device]) => (
              <SwitchWidget key={key} deviceKey={key} device={device} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
