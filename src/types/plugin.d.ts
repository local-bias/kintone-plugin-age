declare namespace Plugin {
  /** 🔌 プラグインがアプリ単位で保存する設定情報 */
  type Config = ConfigV2;

  /** 🔌 プラグインの詳細設定 */
  type Condition = Config['conditions'][number];

  /** 🔌 過去全てのバージョンを含むプラグインの設定情報 */
  type AnyConfig = ConfigV1 | ConfigV2;

  type ConfigV2 = {
    version: 2;
    conditions: {
      srcFieldCode: string;
      dstFieldCode: string;
      isUpdateOnSave: boolean;
    }[];
  };

  type ConfigV1 = {
    version: 1;
    rows: {
      src: string;
      dst: string;
      updates: boolean;
    }[];
  };
}
