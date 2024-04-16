import createWebStorage from 'redux-persist/es/storage/createWebStorage';

type StorageType = {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
};

const createStorage = (): StorageType => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem() {
      return Promise.resolve();
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

const storage: StorageType =
  typeof window !== 'undefined' ? createWebStorage('local') : createStorage();

export default storage;
