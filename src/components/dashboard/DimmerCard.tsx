import React from 'react';
import { Gauge, SlidersHorizontal } from 'lucide-react';
import { DimmerWidget } from '@/components/widgets/DimmerWidget';
import { useFirebaseContext } from '@/contexts/FirebaseContext';
import { DimmerDevice } from '@/types/iot';

export const DimmerCard: React.FC = () => {
  const { devices } = useFirebaseContext();

  const dimmers = Object.entries(devices).filter(
    ([_, device]) => device.type === 'dimmer'
  ) as [string, DimmerDevice][];

  return (
    <div className="dashboard-card">
      <div className="dashboard-card-header">
        <Gauge className="h-4 w-4 text-primary" />
        <span className="dashboard-card-title">Analog Dimmer</span>
      </div>
      <div className="dashboard-card-content">
        {dimmers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
            <SlidersHorizontal className="h-10 w-10 mb-2 opacity-50" />
            <p className="text-sm">No dimmer devices</p>
            <p className="text-xs">Add dimmers via Builder Parameter</p>
          </div>
        ) : (
          <div className="space-y-3">
            {dimmers.map(([key, device]) => (
              <DimmerWidget key={key} deviceKey={key} device={device} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
