import { PLUGIN_ID } from '@/lib/global';
import { restoreStorage } from '@/lib/plugin';
import { atom } from 'recoil';

export const storageState = atom<kintone.plugin.Storage | null>({
  key: 'PluginStorage',
  default: restoreStorage(PLUGIN_ID),
});

export const loadingState = atom<boolean>({
  key: 'loadingState',
  default: false,
});
