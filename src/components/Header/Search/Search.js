import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './Search.css';

class Search extends Component {
  state = {
    term: '',
    isSearching: false
  };

  onSubmit = e => {
    const { history } = this.props;
    const { term } = this.state;

    history.push({
      pathname: '/search',
      search: `?q=${term}`
    });

    this.setState({
      term: ''
    });

    e.preventDefault();
  };

  onChange = ({ target }) => {
    this.setState({
      term: target.value
    });
  };

  render() {
    const { term } = this.state;

    return (
      <form onSubmit={this.onSubmit} className="search">
        <label className="search__label sr-only" htmlFor="search">
          Search products
        </label>
        <input
          onChange={this.onChange}
          id="search"
          className="search__input"
          type="search"
          name="search"
          placeholder="Search products..."
          value={term}
        />
        <button className="search__trigger">
          <svg viewBox="0 0 17 17">
            <title>Search</title>
            <path
              fill="currentColor"
              d="M7.65 15.3a7.65 7.65 0 1 1 5.997-2.9c-.01.012 3.183 3.297 3.183 3.297l-1.22 1.18s-3.144-3.283-3.154-3.275A7.618 7.618 0 0 1 7.65 15.3zm0-2a5.65 5.65 0 1 0 0-11.3 5.65 5.65 0 0 0 0 11.3z"
            />
          </svg>
        </button>
      </form>
    );
  }
}

export default withRouter(Search);
