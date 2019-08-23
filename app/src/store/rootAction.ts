import { createStandardAction, ActionType } from 'typesafe-actions';

import { RootState } from './rootReducer';

import { ThunkAction as GenericThunkAction } from 'redux-thunk';
import { actions as items } from '../components/Items/items.ducks';

// TODO: Expose helper function for these utility actions?
const actionCreators = {
  reset: createStandardAction('@@reset')(),
  set: createStandardAction('@@set')<Partial<RootState>>(),
  items,
};

// TODO: Somehow connect this type to ActionCreators type of helper
export type ActionCreators = typeof actionCreators;
// TODO: Somehow connect this type to Actions type of helper
export type RootAction = ActionType<ActionCreators>;
export default actionCreators;

// Expose actions to Cypress
// TODO: Expose helper for doing this
if ('Cypress' in window) {
  (window as any).__chr__actionCreators__ = actionCreators;
}

export type ThunkAction<R = void, E = undefined> = GenericThunkAction<
  R,
  RootState,
  E,
  RootAction
>;
