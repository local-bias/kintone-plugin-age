import { restoreStorage } from '@/lib/plugin';

declare const window: Window & { AGE_PLUGIN: { initialValues: string[] } };

const events: kintone.EventType[] = [
  'app.record.create.show',
  'app.record.edit.show',
  'app.record.index.edit.show',
];

const action: kintone.Action = async (event, pluginId) => {
  const config = restoreStorage(pluginId);

  if (!config || !config.rows.length) {
    return event;
  }

  window.AGE_PLUGIN = window.AGE_PLUGIN || {};

  window.AGE_PLUGIN.initialValues = [];

  for (const { src, dst } of config.rows) {
    event.record[dst].disabled = true;
    window.AGE_PLUGIN.initialValues.push(event.record[src].value);
  }

  return event;
};

export default { events, action };
