declare namespace Plugin {
  /** 🔌 プラグインがアプリ単位で保存する設定情報 */
  type Config = ConfigV3;

  /** 🔌 プラグインの詳細設定 */
  type Condition = Config['conditions'][number];

  /** 🔌 過去全てのバージョンを含むプラグインの設定情報 */
  type AnyConfig = ConfigV1 | ConfigV2 | ConfigV3;

  type ConfigV3 = {
    version: 3;
    conditions: (ConfigV2['conditions'][number] & { id: string })[];
  };

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
