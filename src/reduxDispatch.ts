import redux from './redux';
import { Action, ActionsCreators } from './common';

export type ReduxDispatchCallback = (
  actions: ActionsCreators
) => Action | Action[];
export type ReduxDispatchParameter = Action | Action[] | ReduxDispatchCallback;

// TODO: Add option to turn off logging, like for `get`
export default (...actionsOrCallback: ReduxDispatchParameter[]): void => {
  redux(({ dispatch }, actionCreators) => {
    const actions: Action[] = [];
    for (let parameter of actionsOrCallback) {
      if (typeof parameter === 'function')
        parameter = parameter(actionCreators);
      Array.isArray(parameter)
        ? parameter.forEach(action => actions.push(action))
        : actions.push(parameter);
    }

    for (const action of actions) {
      dispatch(action);
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
