import React, { createContext, useContext, ReactNode } from 'react';
import { useFirebase } from '@/hooks/useFirebase';
import { FirebaseConfig, DeviceNode, IoTDevice, TerminalLog } from '@/types/iot';

interface FirebaseContextType {
  isConnected: boolean;
  isConnecting: boolean;
  devices: DeviceNode;
  logs: TerminalLog[];
  connect: (config: FirebaseConfig) => Promise<void>;
  disconnect: () => Promise<void>;
  updateDevice: (deviceKey: string, value: number) => Promise<void>;
  createDevice: (deviceKey: string, device: IoTDevice) => Promise<void>;
  deleteDevice: (deviceKey: string) => Promise<void>;
  simulateData: (minValue: number, maxValue: number) => Promise<void>;
  addLog: (message: string, type?: TerminalLog['type']) => void;
  clearLogs: () => void;
}

const FirebaseContext = createContext<FirebaseContextType | null>(null);

export const FirebaseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const firebase = useFirebase();

  return (
    <FirebaseContext.Provider value={firebase}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebaseContext = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error('useFirebaseContext must be used within a FirebaseProvider');
  }
  return context;
};
