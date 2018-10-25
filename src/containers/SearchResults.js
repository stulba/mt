import React, { Component } from 'react';
import { Products } from '../client/api';
import qs from 'query-string';
import ProductsList from '../components/Products/ProductsList';
import ProductFeatures from '../components/Products/ProductFeatures';

export default class SearchResults extends Component {
  state = {
    results: null
  };

  componentDidMount = () => {
    const { search } = this.props.location;
    const query = qs.parse(search);

    this.loadResults(query);
  };

  componentDidUpdate = prevProps => {
    const { search } = this.props.location;

    if (search !== prevProps.location.search) {
      const { search } = this.props.location;
      const query = qs.parse(search);

      this.loadResults(query);
    }
  };

  loadResults = ({ q }) => {
    Products.find(q).then(results => {
      this.setState({
        results
      });
    });
  };

  render() {
    const { results } = this.state;
    const { q } = qs.parse(this.props.location.search);

    if (!results) {
      return <p>Loading...</p>;
    }

    if (results.length === 0) {
      return (
        <p>No results found. Would you like to try another search term?</p>
      );
    }

    return (
      <>
        <p>
          Searching results for <strong>"{q}"</strong>
        </p>

        <ProductsList>
          {results.map(p => (
            <div key={p.id} className="product-list__item">
              {console.log(p)}
              <ProductFeatures {...p} />
            </div>
          ))}
        </ProductsList>
      </>
    );
  }
}
