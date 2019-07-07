import { createStore, applyMiddleware } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from './rootReducer';

// Compose enhancer
const middlewares = [thunk];
const enhancer = composeWithDevTools({})(applyMiddleware(...middlewares));

// Create and export store
const initialState =
  'Cypress' in window ? (window as any).__initialState__ : undefined;
const store = createStore(rootReducer, initialState, enhancer);
export default store;

// Export types
export type Store = typeof store;
export * from './rootReducer';
export * from './rootAction';

// Expose store to Cypress
if ('Cypress' in window) {
  // TODO: Expose function for doing this in helper
  (window as any).__reduxStore__ = store;
}
