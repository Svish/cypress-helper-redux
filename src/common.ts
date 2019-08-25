import { AnyAction } from 'redux';

export const STORE = '__chr__reduxStore__';
export const INITIAL_STATE = '__chr__initialState__';
export const ACTIONS = '__chr__actionCreators__';
export const SELECTORS = '__chr__selectors__';

export const ifCypress = (fn: () => void) => {
  'Cypress' in window && fn();
};

// TODO: Figure out a way to smoothly specify/override these types for an appliation...
export type Action = AnyAction;
export type ActionsCreators = any;
export type Selectors = any;
export type State = any;
