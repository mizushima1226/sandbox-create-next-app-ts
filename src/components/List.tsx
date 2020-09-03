import React from 'react';
import ListItem from './ListItem';
import { User } from '../../interfaces/index';

type Props = {
  items: User[];
};

const List = (props: Props) => {
  const { items } = props;
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <ListItem data={item} />
        </li>
      ))}
    </ul>
  );
};

export default List;
