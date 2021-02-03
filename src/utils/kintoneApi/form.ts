import { END_POINT } from './absolute';

interface Fields {
  /**
   * [フォームの設定情報](https://developer.cybozu.io/hc/ja/articles/204783170)を返却します
   * 返り値はpropertiesのみです
   */
  get: (body: FieldsParameter) => Promise<any>;
}

interface FieldsParameter {
  app: number | null;
  lang?: string;
}

const fields: Fields = {
  get: async (body) => {
    const field = await kintone.api(kintone.api.url(END_POINT + '/app/form/fields', true), 'GET', body);

    return field.properties;
  }
};

export { fields };