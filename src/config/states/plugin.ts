import { restorePluginConfig } from '@/lib/plugin';
import { PluginCondition, PluginConfig } from '@/schema/plugin-config';
import { produce } from 'immer';
import { DefaultValue, RecoilState, atom, selector, selectorFamily } from 'recoil';

const PREFIX = 'plugin';

export const storageState = atom<PluginConfig>({
  key: `${PREFIX}storageState`,
  default: restorePluginConfig(),
});

export const loadingState = atom<boolean>({
  key: `${PREFIX}loadingState`,
  default: false,
});

export const conditionsState = selector<PluginCondition[]>({
  key: `${PREFIX}conditionsState`,
  get: ({ get }) => {
    const storage = get(storageState);
    return (storage?.conditions ?? []).map((condition) => {
      if ('id' in condition) {
        return condition;
      }
      // @ts-expect-error 定義通りであればidは必ず上書きされるが、そうでなかった場合を考慮
      return { id: nanoid(), ...condition };
    });
  },
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    set(storageState, (current) =>
      produce(current, (draft) => {
        draft.conditions = newValue;
      })
    );
  },
});

export const selectedConditionIdState = atom<string | null>({
  key: `${PREFIX}selectedConditionIdState`,
  default: null,
});

export const selectedConditionState = selector<PluginCondition>({
  key: `${PREFIX}selectedConditionState`,
  get: ({ get }) => {
    const conditions = get(conditionsState);
    const selectedConditionId = get(selectedConditionIdState);
    return conditions.find((condition) => condition.id === selectedConditionId) ?? conditions[0]!;
  },
  set: ({ get, set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    const selectedConditionId = get(selectedConditionIdState);
    set(conditionsState, (current) =>
      produce(current, (draft) => {
        const index = draft.findIndex((condition) => condition.id === selectedConditionId);
        if (index !== -1) {
          draft[index] = newValue;
        }
      })
    );
  },
});

const conditionPropertyState = selectorFamily<
  PluginCondition[keyof PluginCondition],
  keyof PluginCondition
>({
  key: `${PREFIX}conditionPropertyState`,
  get:
    (key) =>
    ({ get }) => {
      return get(selectedConditionState)[key];
    },
  set:
    (key) =>
    ({ set }, newValue) => {
      set(selectedConditionState, (current) =>
        produce(current, (draft) => {
          draft[key] = newValue as never;
        })
      );
    },
});

export const getConditionPropertyState = <T extends keyof PluginCondition>(property: T) =>
  conditionPropertyState(property) as unknown as RecoilState<PluginCondition[T]>;

export const srcFieldCodeState = getConditionPropertyState('srcFieldCode');
export const dstFieldCodeState = getConditionPropertyState('dstFieldCode');
export const isUpdateOnSaveState = getConditionPropertyState('isUpdateOnSave');
