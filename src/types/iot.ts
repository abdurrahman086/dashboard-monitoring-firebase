// IoT Device Types

export type DeviceType = 'switch' | 'sensor' | 'dimmer';

export interface SwitchDevice {
  type: 'switch';
  value: 0 | 1;
}

export interface SensorDevice {
  type: 'sensor';
  value: number;
  upper_limit: number;
  unit: string;
}

export interface DimmerDevice {
  type: 'dimmer';
  value: number;
  upper_limit: number;
  unit: string;
}

export type IoTDevice = SwitchDevice | SensorDevice | DimmerDevice;

export interface DeviceNode {
  [key: string]: IoTDevice;
}

export interface FirebaseConfig {
  apiKey: string;
  databaseURL: string;
  databasePath: string;
}

export interface TerminalLog {
  id: string;
  timestamp: Date;
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
}

export interface SimulatorConfig {
  minValue: number;
  maxValue: number;
  duration: number; // in seconds
  isRunning: boolean;
}

export interface SensorHistory {
  timestamp: number;
  value: number;
}

export interface BuilderFormData {
  keyName: string;
  units: string;
  upperLimit: number;
  componentType: DeviceType;
}
