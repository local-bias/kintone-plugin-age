//@ts-check
const hp = 'https://konomi.app/';
const commonCdn = 'https://kintone-plugin.konomi.app/common';
const cdn = 'https://kintone-plugin.konomi.app/age';
const localhost = 'https://127.0.0.1:2156';

/** @type {import('@konomi-app/kintone-utilities').PluginConfig} */
export default {
  manifest: {
    base: {
      manifest_version: 1,
      version: '2.1.2',
      type: 'APP',
      name: {
        en: 'Age Calculation Plugin',
        ja: '年齢自動計算プラグイン',
        zh: '年龄自动计算插件',
      },
      description: {
        en: 'Associate the date field with the age field and automatically calculate the age when the date field is changed.',
        ja: '日付フィールドと年齢フィールドを紐づけ、日付フィールドが変更されたタイミングで年齢を自動計算します。',
        zh: '将日期字段与年龄字段关联起来，在日期字段更改时自动计算年龄。',
      },
      icon: 'icon.png',
      homepage_url: { ja: hp, en: hp, zh: hp },
      desktop: {
        js: [`${commonCdn}/desktop.js`],
        css: [],
      },
      mobile: {
        js: [`${commonCdn}/desktop.js`],
        css: [],
      },
      config: {
        html: 'config.html',
        js: [`${commonCdn}/config.js`],
        css: [],
        required_params: [],
      },
    },
    dev: {
      desktop: { js: [`${localhost}/dist/dev/desktop/index.js`] },
      mobile: { js: [`${localhost}/dist/dev/desktop/index.js`] },
      config: { js: [`${localhost}/dist/dev/config/index.js`] },
    },
    prod: {
      desktop: { js: [`${cdn}/desktop.js`] },
      mobile: { js: [`${cdn}/desktop.js`] },
      config: { js: [`${cdn}/config.js`] },
    },
    standalone: {
      desktop: { js: ['desktop.js'] },
      mobile: { js: ['desktop.js'] },
      config: { js: ['config.js'] },
    },
  },
};
