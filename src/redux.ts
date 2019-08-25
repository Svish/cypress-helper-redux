import { Store } from 'redux';
import { STORE, ACTIONS, State, Action, ActionsCreators } from './common';

type ReduxCallback = (
  store: Store<State, Action>,
  actionCreators: ActionsCreators
) => void;

// TODO: Add option to turn off logging, like for `get`
export default (callback: ReduxCallback): void => {
  Cypress.log({
    name: 'redux',
    displayName: 'Redux',
    message: [],
  });

  const window = (cy as any).state('window');

  callback(window[STORE], window[ACTIONS]);

  // TODO: Investigate possibility for snapshot logging before and after...
};
