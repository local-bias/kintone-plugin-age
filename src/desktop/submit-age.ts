import { restoreStorage } from '@common/plugin';

declare const window: Window & { AGE_PLUGIN: { initialValues: string[] } };

const events: kintone.EventType[] = [
  'app.record.index.edit.submit',
  'app.record.create.submit',
  'app.record.edit.submit',
];

const action: kintone.Action = async (event, pluginId) => {
  const config = restoreStorage(pluginId);

  if (!config || !config.rows.length || !window.AGE_PLUGIN) {
    return event;
  }

  for (let i = 0; i < config.rows.length; i++) {
    const { src, dst, updates } = config.rows[i];
    const initialValue = window.AGE_PLUGIN.initialValues[i];

    if (
      !event.type.includes('record.create') &&
      !updates &&
      (initialValue || event.record[dst].value)
    ) {
      continue;
    }

    const currentValue = event.record[src].value;

    if (!currentValue) {
      event.record[dst].value = '';
      continue;
    }

    const age = getAge(new Date(currentValue));

    event.record[dst].value = isFinite(age) ? age : NaN;
  }

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
