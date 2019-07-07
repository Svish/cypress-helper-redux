import { createStandardAction, ActionType, getType } from 'typesafe-actions';

import { RootState, ThunkAction } from '../../store';

// Selectors
export const select = {
  items: ({ items }: RootState) => items.items,
  new: ({ items }: RootState) => items.new,
};

// Action Creators
export const actions = {
  addItem: createStandardAction('items/add-item')<string>(),
  setNew: createStandardAction('items/set-new')<string>(),
};
export type Action = ActionType<typeof actions>;

// Thunks
export const thunks = {
  add: (): ThunkAction => async (dispatch, getState) => {
    const newTodo = select.new(getState());
    if (newTodo) dispatch(actions.addItem(newTodo));
  },
};

// State
export type State = Readonly<{
  items: string[];
  new: string;
}>;

export const INITIAL_STATE: State = {
  items: [],
  new: '',
};

// Reducer
export default (state = INITIAL_STATE, action: Action): State => {
  switch (action.type) {
    case getType(actions.setNew):
      return { ...state, new: action.payload };

    case getType(actions.addItem):
      const items = [...state.items, action.payload];
      return { ...state, new: '', items };

    default:
      return state;
  }
};
