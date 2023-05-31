import { atom } from 'recoil';

export const pluginIdState = atom<string>({ key: 'pluginIdState', default: '' });

export const storageState = atom<kintone.plugin.Storage | null>({
  key: 'PluginStorage',
  default: null,
});

export const loadingState = atom<boolean>({
  key: 'loadingState',
  default: false,
});
