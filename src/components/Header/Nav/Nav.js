import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

function Nav({ onSetCategory, currentCategory }) {
  return (
    <ul className="nav">
      <li className="nav__item">
        <Link
          onClick={() => onSetCategory('women')}
          className={
            currentCategory === 'women'
              ? 'nav__link nav__link--active'
              : 'nav__link'
          }
          to="/women"
        >
          Women
        </Link>
      </li>
      <li className="nav__item">
        <Link
          onClick={() => onSetCategory('men')}
          className={
            currentCategory === 'men'
              ? 'nav__link nav__link--active'
              : 'nav__link'
          }
          to="/men"
        >
          Men
        </Link>
      </li>
    </ul>
  );
}

export default Nav;
