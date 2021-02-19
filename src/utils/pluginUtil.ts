import { Config } from './absolutes';

export const getConfig = (id: string): Config => {
  const config = kintone.plugin.app.getConfig(id);

  return Object.keys(config).reduce((accu: any, key) => {
    accu[key] = JSON.parse(config[key]);

    return accu;
  }, {});
};

export const setConfig = (target: any) => {
  const config: Record<string, any> = {};

  for (const key in target) {
    config[key] = JSON.stringify(target[key]);
  }

  kintone.plugin.app.setConfig(config);
};
