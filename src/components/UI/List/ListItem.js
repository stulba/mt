import React from 'react';
import { Link } from 'react-router-dom';
import './List.css';

const ListItem = ({ className, name, link, children }) => {
  return (
    <li className={className ? className : 'list__item'}>
      <Link to={link}>
        {children}
        {name}
      </Link>
    </li>
  );
};

export default ListItem;
