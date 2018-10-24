import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import women from '../images/women.jpg';

export default class Home extends Component {
  render() {
    return (
      <div>
        <Link to="/women/dresses">
          <img src={women} alt="Dresses" />
        </Link>
      </div>
    );
  }
}
