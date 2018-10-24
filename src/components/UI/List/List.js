import React from 'react';
import './List.css';

const List = ({ className, children }) => {
  return <ul className={className ? className : 'list'}>{children}</ul>;
};

export default List;
