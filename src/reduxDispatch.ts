import { AnyAction } from 'redux';
import redux from './redux';

export interface ReduxAction extends AnyAction {}

export type ReduxActionsCallback = () => ReduxAction | ReduxAction[];

// TODO: Add option to turn off logging, like for `get`
export default (callback: ReduxActionsCallback): void => {
  redux(store => {
    const actions = callback();
    for (const action of Array.isArray(actions) ? actions : [actions]) {
      store.dispatch(action);
      Cypress.log({
        name: 'reduxDispatch',
        displayName: 'Dispatch',
        message: [action.type],
        consoleProps: () => ({
          type: action.type,
          payload: 'payload' in action ? action.payload : undefined,
          action,
        }),
      });
    }
  });
};
