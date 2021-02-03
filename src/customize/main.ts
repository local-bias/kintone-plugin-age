import { getConfig } from '../utils/pluginUtil';
import { PLUGIN_NAME, Config } from '../utils/absolutes';

const EVENTS_SHOW = [
  'app.record.index.edit.show',
  'app.record.create.show',
  'app.record.edit.show',
  'mobile.app.record.index.edit.show',
  'mobile.app.record.create.show',
  'mobile.app.record.edit.show',
];
const EVENTS_SUBMIT = [
  'app.record.index.edit.submit',
  'app.record.create.submit',
  'app.record.edit.submit',
  'mobile.app.record.index.edit.submit',
  'mobile.app.record.create.submit',
  'mobile.app.record.edit.submit',
];

export default (pluginId: string) => {

  let storage: any = {};

  const config: Config = getConfig(pluginId);

  if (!Object.keys(config).length) {
    return;
  }

  kintone.events.on(EVENTS_SHOW, e => {
    try {
      storage = {};

      for (const row of config.rows) {
        storage[row.src] = e.record[row.src].value;
        e.record[row.dst].disabled = true;
      }

    } catch (error) {
      e.error = `プラグイン「${PLUGIN_NAME}」の処理実行時にエラーが発生しました`;
      console.error(`エラー(${PLUGIN_NAME})`, error);
    }
    return e;
  });

  kintone.events.on(EVENTS_SUBMIT, e => {
    try {

      for (const row of config.rows) {
        if (row.updates || e.record[row.src].value !== storage[row.src]) {

          const src = e.record[row.src].value;

          if (!src) {
            e.record[row.dst].value = "";
            continue;
          }

          const age = getAge(new Date(src));

          e.record[row.dst].value = isFinite(age) ? age : NaN;
        }
      }

    } catch (error) {
      e.error = `プラグイン「${PLUGIN_NAME}」の処理実行時にエラーが発生しました`;
      console.error(`エラー(${PLUGIN_NAME})`, error);
    }
    return e;
  });
}

const getAge = (birthday: Date) => {

  const y = birthday.getFullYear();
  const m = birthday.getMonth();
  const d = birthday.getDate();

  const now = new Date();
  const nowY = now.getFullYear();
  const nowM = now.getMonth();
  const nowD = now.getDate();

  const yDifference = nowY - y;
  const passes = nowM > m || (nowM === m && nowD >= d);

  return passes ? yDifference : yDifference - 1;
}
