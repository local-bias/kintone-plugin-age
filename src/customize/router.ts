import main from './main'
import { PLUGIN_NAME } from '../utils/absolutes';

const EVENTS_DESKTOP = [
  'app.record.create.show',
  'app.record.edit.show',
];
const EVENTS_MOBILE = [
  'mobile.app.record.create.show',
  'mobile.app.record.edit.show',
];
const init = (pluginId: string, event: any) => {

  return main(event, pluginId);
}

const enables = (event: any) => {
  return true;
}

export default (pluginId: string) => {
  kintone.events.on(EVENTS_DESKTOP.concat(EVENTS_MOBILE), e => {
    try {
      return enables(e) ? init(pluginId, e) : e;
    } catch (error) {
      e.error = `プラグイン「${PLUGIN_NAME}」の処理実行時にエラーが発生しました`;
      console.error(`エラー(${PLUGIN_NAME})`, error);
    }
    return e;
  });
}