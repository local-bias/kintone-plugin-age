import { GUEST_SPACE_ID } from '@/lib/global';
import { getFormFields, kintoneAPI } from '@konomi-app/kintone-utilities';
import { getAppId } from '@lb-ribbit/kintone-xapp';
import { selector } from 'recoil';

const PREFIX = `kintone`;

export const appFieldsState = selector<kintoneAPI.FieldProperty[]>({
  key: `${PREFIX}appFieldsState`,
  get: async () => {
    const app = getAppId()!;
    const { properties } = await getFormFields({
      app,
      preview: true,
      guestSpaceId: GUEST_SPACE_ID,
      debug: process.env.NODE_ENV === 'development',
    });

    const values = Object.values(properties);

    return values.sort((a, b) => a.label.localeCompare(b.label, 'ja'));
  },
});

export const dateFieldsState = selector<kintoneAPI.FieldProperty[]>({
  key: `${PREFIX}dateFieldsState`,
  get: ({ get }) => {
    const fields = get(appFieldsState);
    return fields.filter((field) => field.type === 'DATE' || field.type === 'DATETIME');
  },
});

export const textFieldsState = selector<kintoneAPI.FieldProperty[]>({
  key: `${PREFIX}textFieldsState`,
  get: ({ get }) => {
    const fields = get(appFieldsState);
    return fields.filter((field) =>
      ['NUMBER', 'SINGLE_LINE_TEXT', 'RICH_TEXT', 'MULTI_LINE_TEXT'].includes(field.type)
    );
  },
});
