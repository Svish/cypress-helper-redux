import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './store';

import Items from './components/Items';
import './style.css';

ReactDOM.render(
  <Provider store={store}>
    <Items />
  </Provider>,
  document.getElementById('root')
);
