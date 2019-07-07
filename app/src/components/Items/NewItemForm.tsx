import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { select, actions, thunks } from './items.ducks';

const NewItemForm: React.FC = () => {
  const value = useSelector(select.new);
  const dispatch = useDispatch();

  const handleValueChanged = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      dispatch(actions.setNew(e.currentTarget.value));
    },
    [dispatch]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      dispatch(thunks.add());
    },
    [dispatch]
  );

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="New item"
        value={value}
        onChange={handleValueChanged}
        autoFocus={true}
        autoComplete="off"
      ></input>
      <button type="submit">Add</button>
    </form>
  );
};

export default NewItemForm;
