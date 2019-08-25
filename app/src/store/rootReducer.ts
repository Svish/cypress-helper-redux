import { combineReducers } from 'redux';
import { getType, StateType } from 'typesafe-actions';

import actions from './rootAction';

// Import application reducers
import items from '../components/Items/items.ducks';

// Combine them
const combinedReducers = combineReducers({
  items,
});

// Create a root reducer with some added utility actions
// TODO: Expose helper for these utility reducers?
const rootReducer: typeof combinedReducers = (state, action) => {
  switch (action.type) {
    case getType(actions.reset):
      return combinedReducers(undefined, action);

    case getType(actions.set):
      return combinedReducers(action.payload, action);

    default:
      return combinedReducers(state, action);
  }
};

// TODO: Somehow connect this type to State type of helper
export type RootState = StateType<typeof rootReducer>;
export default rootReducer;
