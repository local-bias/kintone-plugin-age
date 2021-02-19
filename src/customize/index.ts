import main from './main';

declare const kintone: any;

((PLUGIN_ID) => main(PLUGIN_ID))(kintone.$PLUGIN_ID);
