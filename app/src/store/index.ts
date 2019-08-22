import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { exposeForCypress } from 'cypress-helper-redux';

import rootReducer from './rootReducer';

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

// Expose store to Cypress
exposeForCypress(store);
