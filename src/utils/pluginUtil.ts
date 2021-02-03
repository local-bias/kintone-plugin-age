/**
 * プラグインに保持しているパラメータを返却します.
 *
 * @return {Object} プラグインに保持しているパラメータ
 */
export const getConfig = (id: string) => {

  const config = kintone.plugin.app.getConfig(id);

  return Object.keys(config).reduce((accu: any, key) => {

    accu[key] = JSON.parse(config[key]);

    return accu;

  }, {});
}

/**
 * プラグインに保持させるパラメータを設定します
 *
 * @param {Object} params プラグインに保持させるパラメータ
 */
export const setConfig = (target: any) => {

  // 引数のプロパティをJSON形式に変換し、格納し直します
  const config = Object.keys(target).reduce((accu: any, key) => {

    accu[key] = JSON.stringify(target[key]);

    return accu;

  }, {});

  kintone.plugin.app.setConfig(config);
}
