import { createStandardAction, ActionType } from 'typesafe-actions';

import { RootState } from './rootReducer';

import { ThunkAction as GenericThunkAction } from 'redux-thunk';
import { actions as items } from '../components/Items/items.ducks';

// TODO: Expose helper for these actions?
const actionCreators = {
  reset: createStandardAction('@@reset')(),
  set: createStandardAction('@@set')<Partial<RootState>>(),
  items,
};

export type ActionCreators = typeof actionCreators;
export type RootAction = ActionType<ActionCreators>;
export default actionCreators;

// Expose actions to Cypress
if ('Cypress' in window) {
  // TODO: Expose function for doing this in helper
  (window as any).__reduxActions__ = actionCreators;
}

export type ThunkAction<R = void, E = undefined> = GenericThunkAction<
  R,
  RootState,
  E,
  RootAction
>;
