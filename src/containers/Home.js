import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import placeholder from '../images/shirts.jpg';

export default class Home extends Component {
  render() {
    return (
      <div>
        <Link to="/women/dresses">
          <img src={placeholder} alt="Dresses" />
        </Link>
      </div>
    );
  }
}
