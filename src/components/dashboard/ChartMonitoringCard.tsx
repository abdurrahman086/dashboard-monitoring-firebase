import React from "react";
import { Activity, BarChart3 } from "lucide-react";
import { SensorWidget } from "@/components/widgets/SensorWidget";
import { useFirebaseContext } from "@/contexts/FirebaseContext";
import { SensorDevice } from "@/types/iot";

export const ChartMonitoringCard: React.FC = () => {
  const { devices } = useFirebaseContext();

  // Filter hanya device yang bertipe 'sensor'
  const sensors = Object.entries(devices).filter(
    ([_, device]) => device.type === "sensor",
  ) as [string, SensorDevice][];

  return (
    <div className="dashboard-card">
      <div className="dashboard-card-header">
        <Activity className="h-4 w-4 text-secondary" />
        <span className="dashboard-card-title">Chart Monitoring</span>
      </div>
      <div className="dashboard-card-content">
        {sensors.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
            <BarChart3 className="h-10 w-10 mb-2 opacity-50" />
            <p className="text-sm">No sensor devices</p>
            <p className="text-xs">Add sensors via Builder Parameter</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {sensors.map(([key, device]) => (
              <SensorWidget
                key={key}
                deviceKey={key}
                // PROTEKSI DATA:
                // Kita mengirimkan objek baru ke SensorWidget.
                // Jika hardware menghapus upper_limit, kita paksa nilainya ke 100
                // agar grafik tidak hilang/crash.
                device={{
                  ...device,
                  upper_limit: device.upper_limit ?? 100,
                  value: device.value ?? 0,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
