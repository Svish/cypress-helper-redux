import { createStandardAction, ActionType } from 'typesafe-actions';
import { ThunkAction as GenericThunkAction } from 'redux-thunk';

import { RootState } from './rootReducer';

// Import application action creators
import { actions as items } from '../components/Items/items.ducks';

// Gather them in a single object
// TODO: Expose helper function for these utility actions?
const actionCreators = {
  reset: createStandardAction('@@reset')(),
  set: createStandardAction('@@set')<Partial<RootState>>(),
  items,
};
export default actionCreators;

// Export types
// TODO: Somehow connect this type to ActionCreators type of helper
export type ActionCreators = typeof actionCreators;
// TODO: Somehow connect this type to Actions type of helper
export type RootAction = ActionType<ActionCreators>;
export type ThunkAction<R = void, E = undefined> = GenericThunkAction<
  R,
  RootState,
  E,
  RootAction
>;
