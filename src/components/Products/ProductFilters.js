import React, { Component } from 'react';
import SelectMenu from '../dd/SelectMenu';

export default class ProductFilters extends Component {
  render() {
    const { onSetSort, filters } = this.props;

    return (
      <div className="filter">
        <ul className="filter__list">
          <li className="filter__item">
            <SelectMenu
              onSetSort={onSetSort}
              title="Sort"
              ddItems={filters.sort}
            />
          </li>
        </ul>
      </div>
    );
  }
}
