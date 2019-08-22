import { Store } from 'redux';

export const STORE = '__reduxStore__';
export const INITIAL_STATE = '__initialState__';

export const ifCypress = (fn: () => void) => {
  'Cypress' in window && fn();
};
