import React from 'react';
import { render } from 'react-dom';

import App from './app';

const main = () => render(<App />, document.getElementById('settings'));

export default main;
