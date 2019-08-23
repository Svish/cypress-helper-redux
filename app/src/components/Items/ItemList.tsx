import React from 'react';
import { useSelector } from 'react-redux';

import { select } from './items.ducks';

const ItemList: React.FC = () => {
  const items = useSelector(select.items);

  return (
    <ol data-cy="list">
      {items.map((item, i) => (
        <li data-cy="list/item" key={i}>
          {item}
        </li>
      ))}
    </ol>
  );
};

export default ItemList;
