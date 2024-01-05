import { manager } from '@/lib/event-manager';
import { restorePluginConfig } from '@/lib/plugin';

manager.add(
  ['app.record.create.show', 'app.record.edit.show', 'app.record.index.edit.show'],
  (event) => {
    const config = restorePluginConfig();

    config.conditions.forEach(({ srcFieldCode, dstFieldCode }) => {
      if (
        !srcFieldCode ||
        !dstFieldCode ||
        !event.record[srcFieldCode] ||
        !event.record[dstFieldCode]
      ) {
        return;
      }
      //@ts-ignore
      event.record[dstFieldCode].disabled = true;
    });

    return event;
  }
);

manager.add(
  ['app.record.index.edit.submit', 'app.record.create.submit', 'app.record.edit.submit'],
  (event) => {
    const config = restorePluginConfig();

    config.conditions.forEach(({ srcFieldCode, dstFieldCode, updates }, i) => {
      if (
        !srcFieldCode ||
        !dstFieldCode ||
        !event.record[srcFieldCode] ||
        !event.record[dstFieldCode]
      ) {
        return;
      }

      const dstFieldValue = event.record[dstFieldCode].value as string;
      if (dstFieldValue && !updates) {
        return;
      }

      const currentValue = event.record[srcFieldCode].value as string;
      if (!currentValue) {
        return;
      }

      const age = getAge(new Date(currentValue));

      //@ts-ignore
      event.record[dstFieldCode].value = isFinite(age) ? age : NaN;
    });

    return event;
  }
);

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
