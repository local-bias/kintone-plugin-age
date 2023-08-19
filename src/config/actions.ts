import { storeStorage } from '@/lib/plugin';

export const save = (storage: kintone.plugin.Storage) => {
  storeStorage(storage, () => true);
};
