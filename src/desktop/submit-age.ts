import { restorePluginConfig } from '@/lib/plugin';

declare const window: Window & { AGE_PLUGIN: { initialValues: string[] } };

const events: kintone.EventType[] = [
  'app.record.index.edit.submit',
  'app.record.create.submit',
  'app.record.edit.submit',
];

const action: kintone.Action = async (event) => {
  const config = restorePluginConfig();

  if (!config || !config.conditions.length || !window.AGE_PLUGIN) {
    return event;
  }

  config.conditions.forEach(({ srcFieldCode, dstFieldCode, updates }, i) => {
    const initialValue = window.AGE_PLUGIN.initialValues[i];

    if (
      !event.type.includes('record.create') &&
      !updates &&
      (initialValue || event.record[dstFieldCode].value)
    ) {
      return;
    }

    const currentValue = event.record[srcFieldCode].value;

    if (!currentValue) {
      event.record[dstFieldCode].value = '';
      return;
    }

    const age = getAge(new Date(currentValue));

    event.record[dstFieldCode].value = isFinite(age) ? age : NaN;
  });

  return event;
};

export default { events, action };

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
};
