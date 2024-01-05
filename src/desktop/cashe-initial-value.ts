import { restorePluginConfig } from '@/lib/plugin';

declare const window: Window & { AGE_PLUGIN: { initialValues: string[] } };

const events: kintone.EventType[] = [
  'app.record.create.show',
  'app.record.edit.show',
  'app.record.index.edit.show',
];

const action: kintone.Action = async (event, pluginId) => {
  const config = restorePluginConfig();

  if (!config || !config.conditions.length) {
    return event;
  }

  window.AGE_PLUGIN = window.AGE_PLUGIN || {};

  window.AGE_PLUGIN.initialValues = [];

  for (const { srcFieldCode, dstFieldCode } of config.conditions) {
    event.record[dstFieldCode].disabled = true;
    window.AGE_PLUGIN.initialValues.push(event.record[srcFieldCode].value);
  }

  return event;
};

export default { events, action };
