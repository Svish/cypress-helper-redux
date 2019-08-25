import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from './rootReducer';
import actionCreators from './rootAction';
import selectors from './rootSelector';

// Compose enhancer
const middlewares = [thunk];
const enhancer = composeWithDevTools({})(applyMiddleware(...middlewares));

// Create and export store
// TODO: Expose helper for doing this
const initialState =
  'Cypress' in window ? (window as any).__chr__initialState__ : undefined;

const store = createStore(rootReducer, initialState, enhancer);
export default store;

// Export types
export type Store = typeof store;
export * from './rootReducer';
export * from './rootAction';
export * from './rootSelector';

// Expose store to Cypress
// TODO: Expose helper for doing this
if ('Cypress' in window) {
  const win = window as any;
  win.__chr__reduxStore__ = store;
  win.__chr__actionCreators__ = actionCreators;
  win.__chr__selectors__ = selectors;
}
