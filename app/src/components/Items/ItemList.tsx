import React from 'react';
import { useSelector } from 'react-redux';

import { select } from './items.ducks';

const ItemList: React.FC = () => {
  const items = useSelector(select.items);

  return (
    <ol>
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ol>
  );
};

export default ItemList;
