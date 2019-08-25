import {
  ActionsCreators,
  Selectors,
  Store,
  ACTIONS,
  SELECTORS,
  STORE,
} from './common';

export interface ReduxResponse {
  store: Store;
  actions: ActionsCreators;
  selectors: Selectors;
}

// TODO: Add option to turn off logging, like for `get`
export default (): Promise<ReduxResponse> => {
  return new Promise((resolve, reject) => {
    Cypress.log({
      name: 'redux',
      displayName: 'Redux',
      message: [],
    });
    const window = (cy as any).state('window');

    window[STORE]
      ? resolve({
          store: window[STORE],
          actions: window[ACTIONS],
          selectors: window[SELECTORS],
        })
      : reject(`Redux store not found in window.${STORE}`);
  });

  // TODO: Investigate possibility for snapshot logging before and after...
};
