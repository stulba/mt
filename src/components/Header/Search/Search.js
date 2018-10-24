import React from 'react';
import { MdSearch } from 'react-icons/md';
import './Search.css';

const Search = () => {
  return (
    <form className="search">
      <label className="search__label" htmlFor="search">
        <input
          id="search"
          className="search__input"
          type="text"
          name="search"
          placeholder="Search"
        />
        <button className="search__trigger">
          <MdSearch />
        </button>
      </label>
    </form>
  );
};

export default Search;
