import { AnyPluginConfig, PluginCondition, PluginConfig } from '@/schema/plugin-config';
import { restoreStorage } from '@konomi-app/kintone-utilities';
import { produce } from 'immer';
import { nanoid } from 'nanoid';
import { PLUGIN_ID } from './global';

export const getNewCondition = (): PluginCondition => ({
  id: nanoid(),
  srcFieldCode: '',
  dstFieldCode: '',
  isUpdateOnSave: false,
});

/**
 * プラグインの設定情報のひな形を返却します
 */
export const createConfig = (): PluginConfig => ({
  version: 3,
  conditions: [getNewCondition()],
});

/**
 * 古いバージョンの設定情報を新しいバージョンに変換します
 * @param anyConfig 保存されている設定情報
 * @returns 新しいバージョンの設定情報
 */
export const migrateConfig = (anyConfig: AnyPluginConfig): PluginConfig => {
  const { version } = anyConfig;
  switch (version) {
    case undefined:
    case 1:
      return migrateConfig({
        version: 2,
        conditions: anyConfig.rows.map(({ src, dst, updates }) => ({
          srcFieldCode: src,
          dstFieldCode: dst,
          isUpdateOnSave: updates,
        })),
      });
    case 2:
      return migrateConfig({
        version: 3,
        conditions: anyConfig.conditions.map((condition) => ({ id: nanoid(), ...condition })),
      });
    case 3:
    default:
      return anyConfig;
  }
};

/**
 * プラグインの設定情報を復元します
 */
export const restorePluginConfig = (): PluginConfig => {
  const config = restoreStorage<AnyPluginConfig>(PLUGIN_ID) ?? createConfig();
  return migrateConfig(config);
};

export const getUpdatedStorage = <T extends keyof PluginCondition>(
  storage: PluginConfig,
  props: {
    conditionIndex: number;
    key: T;
    value: PluginCondition[T];
  }
) => {
  const { conditionIndex, key, value } = props;
  return produce(storage, (draft) => {
    draft.conditions[conditionIndex][key] = value;
  });
};

export const getConditionField = <T extends keyof PluginCondition>(
  storage: PluginConfig,
  props: {
    conditionIndex: number;
    key: T;
    defaultValue: NonNullable<PluginCondition[T]>;
  }
): NonNullable<PluginCondition[T]> => {
  const { conditionIndex, key, defaultValue } = props;
  if (!storage.conditions[conditionIndex]) {
    return defaultValue;
  }
  return storage.conditions[conditionIndex][key] ?? defaultValue;
};
