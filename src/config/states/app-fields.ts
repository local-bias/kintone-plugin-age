import { selector } from 'recoil';
import { Properties } from '@kintone/rest-api-client/lib/src/client/types';
import { getUserDefinedFields } from '@/lib/kintone';

const state = selector<Properties>({
  key: 'AppFields',
  get: async () => {
    const properties = await getUserDefinedFields();
    return properties;
  },
});

export default state;
