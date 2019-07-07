import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './store';

import Items from './components/Items';

ReactDOM.render(
  <Provider store={store}>
    <Items />
  </Provider>,
  document.getElementById('root')
);
