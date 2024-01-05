import { restorePluginConfig } from '@/lib/plugin';
import { atom } from 'recoil';

export const storageState = atom<Plugin.Config>({
  key: 'PluginStorage',
  default: restorePluginConfig(),
});

export const loadingState = atom<boolean>({
  key: 'loadingState',
  default: false,
});
