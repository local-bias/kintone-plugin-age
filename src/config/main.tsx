import React, { Suspense } from 'react';
import { render } from 'react-dom';
import CircularProgress from "@material-ui/core/CircularProgress";

import { fields } from '../utils/kintoneApi/form';
import * as plugin from '../utils/pluginUtil';
import { wrapPromise } from '../utils/ReactUtil';

import App from './App';
import SocialIcons from './SocialIcons';

const WRAPPER_ID = 'local-bias_config';

export default (pluginId: string) => {

  const config = plugin.getConfig(pluginId);

  const properties = wrapPromise(getDateFields());

  render((
    <>
      <Suspense fallback={<CircularProgress />}>
        <App initConfig={config} fieldProperties={properties} />
      </Suspense>
      <SocialIcons />
    </>
  ), document.getElementById(WRAPPER_ID)
  );
}

const getDateFields = async () => {

  const properties = await fields.get({ app: kintone.app.getId() });

  const dateFields = [];
  const inputFields = [];

  for (const key of Object.keys(properties)) {

    if (properties[key].type === 'DATE') {
      dateFields.push(properties[key]);
    }

    if (properties[key].type === "SINGLE_LINE_TEXT" || properties[key].type === "NUMBER") {
      inputFields.push(properties[key]);
    }
  }

  return { dateFields, inputFields };
}