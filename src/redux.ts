import { Store } from 'redux';

export type ReduxCallback = (store: Store) => void;

// TODO: Add option to turn off logging, like for `get`
export default (callback: ReduxCallback): void => {
  Cypress.log({
    name: 'redux',
    displayName: 'Redux',
    message: [],
  });

  const window = (cy as any).state('window');

  callback(window.__reduxStore__);
  // TODO: Investigate possibility for snapshot logging before and after...
};
