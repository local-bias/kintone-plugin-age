import React, { Suspense } from 'react';
import { render } from 'react-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { KintoneRestAPIClient } from '@kintone/rest-api-client';

import * as plugin from '../utils/pluginUtil';
import { wrapPromise } from '../utils/ReactUtil';

import App from './App';
import SocialIcons from './SocialIcons';

const WRAPPER_ID = 'local-bias_config';

export default (pluginId: string) => {
  const config = plugin.getConfig(pluginId);

  const properties = wrapPromise(getDateFields());

  render(
    <>
      <Suspense fallback={<CircularProgress />}>
        <App initConfig={config} fieldProperties={properties} />
      </Suspense>
      <SocialIcons />
    </>,
    document.getElementById(WRAPPER_ID)
  );
};

const getDateFields = async () => {
  const client = new KintoneRestAPIClient();
  const { properties } = await client.app.getFormFields({
    app: String(kintone.app.getId()),
  });

  const dateFields = [];
  const inputFields = [];

  for (const key in properties) {
    if (properties[key].type === 'DATE') {
      dateFields.push(properties[key]);
    }

    if (properties[key].type === 'SINGLE_LINE_TEXT' || properties[key].type === 'NUMBER') {
      inputFields.push(properties[key]);
    }
  }

  return { dateFields, inputFields };
};
