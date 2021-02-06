export const PLUGIN_NAME = '年齢自動計算プラグイン';

export interface Config {

  rows: Row[];
}

export interface Row {
  src: string;
  dst: string;
  updates: boolean;
}
