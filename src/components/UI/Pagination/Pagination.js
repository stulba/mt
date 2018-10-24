import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import qs from 'query-string';
import './Pagination.css';

class Pagination extends Component {
  render() {
    const { match, location, productsLimit, productsCount } = this.props;
    const page = parseInt(qs.parse(location.search).page, 10);
    const currentPage = page ? page : 1;
    const amountOfPages = Math.ceil(productsCount / productsLimit);
    const hasPrevious = currentPage > 1;
    const hasNext = currentPage < amountOfPages;

    if (amountOfPages > 1) {
      return (
        <div className="pagination">
          {hasPrevious ? (
            <Link
              className="pagination__link pagination__link--prev"
              to={`${match.url}?page=${currentPage - 1}`}
            >
              Previous
            </Link>
          ) : (
            <span className="pagination__link pagination__link--prev pagination__link--disabled">
              Previous
            </span>
          )}

          {hasNext ? (
            <Link
              className="pagination__link pagination__link--next"
              to={`${match.url}?page=${currentPage + 1}`}
            >
              Next
            </Link>
          ) : (
            <span className="pagination__link pagination__link--next pagination__link--disabled">
              Next
            </span>
          )}
          <span className="pagination__status">
            {currentPage} of {amountOfPages}
          </span>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Pagination;
