const END_POINT = '/k/v1/records';

// 各リクエストのレコード上限
const LIMIT_GET = 500;
const LIMIT_POST = 100;
const LIMIT_PUT = 100;
const LIMIT_DELETE = 100;

const client = {};

/**
 * 対象アプリの、指定条件のレコードを全て取得します
 * API使用回数を、(対象レコード数 / 500) + 1回消費します
 *
 * @param {Object} obj
 *   - {string} app アプリID (省略時は表示中アプリ)
 *   - {String} query 検索クエリ (省略時は全レコード)
 *   - {Array} fields 取得フィールド (省略時は全フィールド)
 *   - {Boolean} totalCount レコード総数を取得するか(省略時は取得しない)
 * @return {Object} Promiseオブジェクト
 *   - {Array} records 取得レコードの配列
 */
client.get = async (props = {}) => {

  // カーソル取得時のパラメータを設定します
  const param = {
    'app': props.app || kintone.app.getId() || kintone.mobile.app.getId(),
    'fields': props.fields || [],
    'size': LIMIT_GET,
    'totalCount': Boolean(props.totalCount)
  };

  // レコードの件数や参照位置が設定されている場合は、カーソルを使用しません
  if (props.query && (props.query.indexOf('limit') !== -1 || props.query.indexOf('offset') !== -1)) {
    param.query = props.query;

    return kintone.api(kintone.api.url(END_POINT, true), 'GET', param);
  }

  param.query = props.query ? formatQuery(props.query) : '';

  // 全レコードのカーソルを取得します
  const cursor = await kintone.api(kintone.api.url(`${END_POINT}/cursor`, true), 'POST', param);

  // カーソル取得をトリガーとする関数が設定されている場合は実行します
  if (props.onGetTotal) {
    props.onGetTotal(cursor.totalCount)
  }

  // 全レコードを返却します
  return getRecordsByCursorId({
    'id': cursor.id,
    'onAdvance': props.onAdvance,
  });
};

/**
 * 全件表示用に検索クエリを修正します
 *
 * @param {String} query 元のクエリ
 * @return {String} 修正後のクエリ
 */
function formatQuery(query) {
  return query.replace(/limit.*/g, '').replace(/offset.*/g, '');
}

/**
 * カーソルIDからAPIを利用し、レコードを取得します
 * 一度の検索で取得しきれない場合は、再帰的に関数が呼ばれ
 * レコードを蓄積させていきます
 *
 * @param {String} id カーソルID
 * @param {Object} loadedData 前回呼び出し時までに取得されたレコード
 * @return {Promise} 取得した全レコード
 */
async function getRecordsByCursorId(obj) {

  // 初期値を設定します
  if (!props.loadedData) {
    props.loadedData = {'records': []};
  }

  // 次のカーソルまでのレコードを取得します
  const response = await kintone.api(kintone.api.url(`${END_POINT}/cursor`, true), 'GET', {id: props.id});

  // 既に取得済みのレコードに、今回取得したレコードを加えます
  props.loadedData.records = props.loadedData.records.concat(response.records);

  // レコード取得をトリガーとする関数が設定されている場合は実行します
  if (props.onAdvance) {
    props.onAdvance(props.loadedData.records.length);
  }

  return response.next ? getRecordsByCursorId(obj) : props.loadedData;
}

/**
 * 受け取った全てのレコードを、対象アプリに作成します
 * API使用回数を、(対象レコード数 / 上限) + 1回消費します
 * 全てのAPIを並列で実行するとエラーが発生する場合があるため、
 * １つずつ完了を確認してから次を実行します
 *
 * @param {Array} _records 処理対象レコード
 * @param {String} _app アプリID (省略時はこの関数が実行されたアプリ)
 * @return {Promise} API実行結果の配列
 */
client.post = async (props = {}) => {

  let records = props.records.slice();
  const count = records.length;
  const app = props.app || kintone.app.getId() || kintone.mobile.app.getId();

  const responses = [];

  while (records.length) {
    responses.push(await kintone.api(kintone.api.url(END_POINT, true), 'POST', {
      'app': app,
      'records': records.slice(0, LIMIT_POST)
    }));
    records.splice(0, LIMIT_POST);
  }

  responses.total = count;

  return responses;
}

/**
 * 受け取った全てのレコードを、対象アプリに更新します
 * API使用回数を、(対象レコード数 / 上限) + 1回消費します
 * 全てのAPIを並列で実行するとエラーが発生する場合があるため、
 * １つずつ完了を確認してから次を実行します
 *
 * @param {Array} _records 処理対象レコード
 *   - {String} id レコードID
 *   - {Object} record kintoneレコード
 * @param {String} _app アプリID (省略時はこの関数が実行されたアプリ)
 * @return {Object} Promiseオブジェクト
 */
client.put = async (props = {}) => {

  let records = props.records.slice();
  const count = records.length;
  const app = props.app || kintone.app.getId() || kintone.mobile.app.getId();
  const responses = [];

  while (records.length) {
    responses.push(await kintone.api(kintone.api.url(END_POINT, true), 'PUT', {
      'app': app,
      'records': records.slice(0, LIMIT_PUT)
    }));
    records.splice(0, LIMIT_PUT);
  }

  responses.total = count;

  return responses;
}

/**
 * 受け取ったIDの全てのレコードを、対象アプリから削除します
 * API使用回数を、(対象レコード数 / 上限) + 1回消費します
 * 全てのAPIを並列で実行するとエラーが発生する場合があるため、
 * １つずつ完了を確認してから次を実行します
 * Kintone REST APIのdeleteは、完了後空配列しか返さないため、
 * 代わりに削除したレコード数を返します
 *
 * @param {Array} _ids 処理対象レコードIDの配列
 * @param {String} _app アプリID (省略時はこの関数が実行されたアプリ)
 * @return {Promise} 削除したレコード数
 */
client.delete = async (props = {}) => {

  let ids = props.ids.slice();
  const count = ids.length;
  const app = props.app || kintone.app.getId() || kintone.mobile.app.getId();

  while (ids.length) {
    await kintone.api(kintone.api.url(END_POINT, true), 'DELETE', {
      'app': app,
      'ids': ids.slice(0, LIMIT_DELETE)
    });
    ids.splice(0, LIMIT_DELETE);
  }

  return count;
}

/**
 * クエリを指定してデータを一括削除します
 *
 * @param {String} query 検索クエリ
 * @param {String} _app アプリID(省略時はこの関数が実行されたアプリ)
 * @return {Object} Promiseオブジェクト(fullfilledでレコード数)
 */
client.deleteByQuery = async props => {

  const app = props.app || kintone.app.getId() || kintone.mobile.app.getId();

  const body = {
    'app': app,
    'query': props.query,
    'fields': ['$id']
  }

  const response = await client.get(body);

  const ids = response.records.map(record => record.$id.value);

  return client.delete({'ids': ids, 'app': app});
}

export default client;
