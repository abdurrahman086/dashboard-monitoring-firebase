import { initializeApp, FirebaseApp, deleteApp } from 'firebase/app';
import { getDatabase, ref, onValue, set, update, remove, Database, DataSnapshot, Unsubscribe } from 'firebase/database';
import { FirebaseConfig, IoTDevice, DeviceNode } from '@/types/iot';

let app: FirebaseApp | null = null;
let database: Database | null = null;
let unsubscribe: Unsubscribe | null = null;

export const initializeFirebase = async (config: FirebaseConfig): Promise<boolean> => {
  try {
    // Clean up existing connection
    if (unsubscribe) {
      unsubscribe();
      unsubscribe = null;
    }
    if (app) {
      await deleteApp(app);
      app = null;
      database = null;
    }

    // Initialize new Firebase app
    app = initializeApp({
      apiKey: config.apiKey,
      databaseURL: config.databaseURL,
    }, `iot-dashboard-${Date.now()}`);

    database = getDatabase(app);
    
    // Test connection by attempting to read from the path
    return new Promise((resolve) => {
      const testRef = ref(database!, config.databasePath);
      const timeout = setTimeout(() => {
        resolve(false);
      }, 10000);

      onValue(testRef, () => {
        clearTimeout(timeout);
        resolve(true);
      }, (error) => {
        clearTimeout(timeout);
        console.error('Firebase connection error:', error);
        resolve(false);
      }, { onlyOnce: true });
    });
  } catch (error) {
    console.error('Firebase initialization error:', error);
    return false;
  }
};

export const subscribeToDevices = (
  path: string,
  callback: (devices: DeviceNode) => void,
  onError?: (error: Error) => void
): Unsubscribe | null => {
  if (!database) {
    onError?.(new Error('Database not initialized'));
    return null;
  }

  const deviceRef = ref(database, path);
  
  unsubscribe = onValue(deviceRef, (snapshot: DataSnapshot) => {
    const data = snapshot.val();
    callback(data || {});
  }, (error) => {
    onError?.(error);
  });

  return unsubscribe;
};

export const updateDeviceValue = async (
  path: string,
  deviceKey: string,
  value: number
): Promise<void> => {
  if (!database) {
    throw new Error('Database not initialized');
  }

  const deviceRef = ref(database, `${path}/${deviceKey}/value`);
  await set(deviceRef, value);
};

export const addDevice = async (
  path: string,
  deviceKey: string,
  device: IoTDevice
): Promise<void> => {
  if (!database) {
    throw new Error('Database not initialized');
  }

  const deviceRef = ref(database, `${path}/${deviceKey}`);
  await set(deviceRef, device);
};

export const removeDevice = async (
  path: string,
  deviceKey: string
): Promise<void> => {
  if (!database) {
    throw new Error('Database not initialized');
  }

  const deviceRef = ref(database, `${path}/${deviceKey}`);
  await remove(deviceRef);
};

export const updateMultipleDevices = async (
  path: string,
  updates: Record<string, number>
): Promise<void> => {
  if (!database) {
    throw new Error('Database not initialized');
  }

  const updateObj: Record<string, number> = {};
  Object.entries(updates).forEach(([key, value]) => {
    updateObj[`${key}/value`] = value;
  });

  const pathRef = ref(database, path);
  await update(pathRef, updateObj);
};

export const disconnectFirebase = async (): Promise<void> => {
  if (unsubscribe) {
    unsubscribe();
    unsubscribe = null;
  }
  if (app) {
    await deleteApp(app);
    app = null;
    database = null;
  }
};

export const isConnected = (): boolean => {
  return database !== null;
};
