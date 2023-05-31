import { selector } from 'recoil';
import { getSpecifiedFields } from '@/common/kintone';
import { appFieldsState } from '.';

const state = selector({
  key: 'dateFieldsState',
  get: async ({ get }) => {
    const fields = get(appFieldsState);
    const specified = getSpecifiedFields(['DATE', 'DATETIME'], fields);
    return specified;
  },
});

export default state;
