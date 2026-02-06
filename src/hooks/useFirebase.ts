import { useState, useCallback, useEffect, useRef } from 'react';
import { 
  initializeFirebase, 
  subscribeToDevices, 
  updateDeviceValue, 
  addDevice, 
  removeDevice,
  disconnectFirebase,
  updateMultipleDevices
} from '@/lib/firebase';
import { FirebaseConfig, DeviceNode, IoTDevice, TerminalLog } from '@/types/iot';

export const useFirebase = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [devices, setDevices] = useState<DeviceNode>({});
  const [config, setConfig] = useState<FirebaseConfig | null>(null);
  const [logs, setLogs] = useState<TerminalLog[]>([]);

  const addLog = useCallback((message: string, type: TerminalLog['type'] = 'info') => {
    const newLog: TerminalLog = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      message,
      type,
    };
    setLogs(prev => [...prev.slice(-99), newLog]); // Keep last 100 logs
  }, []);

  const connect = useCallback(async (newConfig: FirebaseConfig) => {
    setIsConnecting(true);
    addLog(`Attempting connection to ${newConfig.databaseURL}...`, 'info');
    
    try {
      const success = await initializeFirebase(newConfig);
      
      if (success) {
        setConfig(newConfig);
        setIsConnected(true);
        addLog('Database connected successfully!', 'success');
        
        // Subscribe to device updates
        subscribeToDevices(
          newConfig.databasePath,
          (deviceData) => {
            setDevices(deviceData);
            addLog(`Received device update: ${Object.keys(deviceData).length} devices`, 'info');
          },
          (error) => {
            addLog(`Subscription error: ${error.message}`, 'error');
          }
        );
      } else {
        addLog('Connection failed. Please check your credentials.', 'error');
        setIsConnected(false);
      }
    } catch (error) {
      addLog(`Connection error: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error');
      setIsConnected(false);
    } finally {
      setIsConnecting(false);
    }
  }, [addLog]);

  const disconnect = useCallback(async () => {
    await disconnectFirebase();
    setIsConnected(false);
    setConfig(null);
    setDevices({});
    addLog('Disconnected from database', 'info');
  }, [addLog]);

  const updateDevice = useCallback(async (deviceKey: string, value: number) => {
    if (!config) {
      addLog('Cannot update: Not connected', 'error');
      return;
    }

    try {
      await updateDeviceValue(config.databasePath, deviceKey, value);
      addLog(`Device '${deviceKey}' updated to ${value}`, 'success');
    } catch (error) {
      addLog(`Update failed for '${deviceKey}': ${error instanceof Error ? error.message : 'Unknown error'}`, 'error');
    }
  }, [config, addLog]);

  const createDevice = useCallback(async (deviceKey: string, device: IoTDevice) => {
    if (!config) {
      addLog('Cannot create: Not connected', 'error');
      return;
    }

    try {
      await addDevice(config.databasePath, deviceKey, device);
      addLog(`Device '${deviceKey}' created successfully`, 'success');
    } catch (error) {
      addLog(`Create failed for '${deviceKey}': ${error instanceof Error ? error.message : 'Unknown error'}`, 'error');
    }
  }, [config, addLog]);

  const deleteDevice = useCallback(async (deviceKey: string) => {
    if (!config) {
      addLog('Cannot delete: Not connected', 'error');
      return;
    }

    try {
      await removeDevice(config.databasePath, deviceKey);
      addLog(`Device '${deviceKey}' deleted`, 'success');
    } catch (error) {
      addLog(`Delete failed for '${deviceKey}': ${error instanceof Error ? error.message : 'Unknown error'}`, 'error');
    }
  }, [config, addLog]);

  const simulateData = useCallback(async (minValue: number, maxValue: number) => {
    if (!config) {
      addLog('Cannot simulate: Not connected', 'error');
      return;
    }

    const updates: Record<string, number> = {};
    Object.entries(devices).forEach(([key, device]) => {
      if (device.type === 'sensor' || device.type === 'dimmer') {
        const range = maxValue - minValue;
        const randomValue = Math.round((Math.random() * range + minValue) * 10) / 10;
        updates[key] = Math.min(randomValue, device.upper_limit);
      }
    });

    try {
      await updateMultipleDevices(config.databasePath, updates);
      addLog(`Simulator heartbeat: Updated ${Object.keys(updates).length} devices`, 'info');
    } catch (error) {
      addLog(`Simulation error: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error');
    }
  }, [config, devices, addLog]);

  const clearLogs = useCallback(() => {
    setLogs([]);
  }, []);

  return {
    isConnected,
    isConnecting,
    devices,
    logs,
    connect,
    disconnect,
    updateDevice,
    createDevice,
    deleteDevice,
    simulateData,
    addLog,
    clearLogs,
  };
};
