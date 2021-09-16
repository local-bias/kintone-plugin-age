declare namespace kintone {
  namespace plugin {
    /**
     * プラグインがアプリ単位で保存する設定情報
     */
    type Storage = {
      rows: Condition[];
    };

    type Condition = {
      src: string;
      dst: string;
      updates: boolean;
    };
  }
}
