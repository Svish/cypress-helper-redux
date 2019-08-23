import React from 'react';

import NewItemForm from './NewItemForm';
import ItemList from './ItemList';

const Items: React.FC = () => (
  <>
    <div id="top">
      <h1>Todo</h1>
      <NewItemForm />
    </div>
    <div id="bottom">
      <ItemList />
    </div>
  </>
);

export default Items;
