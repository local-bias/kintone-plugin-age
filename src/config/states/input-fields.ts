import { selector } from 'recoil';
import { getSpecifiedFields } from '@/lib/kintone';
import { appFieldsState } from '.';

const state = selector({
  key: 'inputFieldsState',
  get: async ({ get }) => {
    const fields = get(appFieldsState);
    const specified = getSpecifiedFields(
      ['NUMBER', 'SINGLE_LINE_TEXT', 'RICH_TEXT', 'MULTI_LINE_TEXT'],
      fields
    );
    return specified;
  },
});

export default state;
