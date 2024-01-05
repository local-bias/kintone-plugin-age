import { getAppId, isMobile } from '@lb-ribbit/kintone-xapp';
import { getFormFields, getFormLayout, kintoneAPI } from '@konomi-app/kintone-utilities';
import { GUEST_SPACE_ID } from './global';

/** kintoneアプリに初期状態で存在するフィールドタイプ */
const DEFAULT_DEFINED_FIELDS: kintoneAPI.FieldPropertyType[] = [
  'UPDATED_TIME',
  'CREATOR',
  'CREATED_TIME',
  'CATEGORY',
  'MODIFIER',
  'STATUS',
];

export const getApp = (eventType?: string): typeof kintone.mobile.app | typeof kintone.app =>
  isMobile(eventType) ? kintone.mobile.app : kintone.app;

export const getAppFields = async (targetApp?: string | number) => {
  const app = targetApp || kintone.app.getId();

  if (!app) {
    throw new Error('アプリのフィールド情報が取得できませんでした');
  }

  const { properties } = await getFormFields({ app, preview: true, guestSpaceId: GUEST_SPACE_ID });

  return properties;
};

export const getSpecifiedFields = async (
  types: kintoneAPI.FieldPropertyType[],
  _fields?: kintoneAPI.FieldProperties
): Promise<kintoneAPI.FieldProperties> => {
  const fields = _fields || (await getAppFields());

  const filterd = Object.entries(fields).filter(([_, value]) => types.includes(value.type));

  return filterd.reduce<kintoneAPI.FieldProperties>(
    (acc, [key, value]) => ({ ...acc, [key]: value }),
    {}
  );
};

export const getUserDefinedFields = async (): Promise<kintoneAPI.FieldProperties> => {
  const fields = await getAppFields();

  const filterd = Object.entries(fields).filter(
    ([_, value]) => !DEFAULT_DEFINED_FIELDS.includes(value.type)
  );

  return filterd.reduce<kintoneAPI.FieldProperties>(
    (acc, [key, value]) => ({ ...acc, [key]: value }),
    {}
  );
};

export const getAppLayout = async () => {
  const app = getAppId();

  if (!app) {
    throw new Error('アプリのフィールド情報が取得できませんでした');
  }

  const { layout } = await getFormLayout({ app, preview: true, guestSpaceId: GUEST_SPACE_ID });

  return layout;
};
