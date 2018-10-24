import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  getProducts,
  resetProducts,
  filterProducts
} from '../redux/actions/products';
import { setCurrentCategory } from '../redux/actions/categories';
import qs from 'query-string';
import { ProductsList, ProductFeatures } from '../components/Products';
import ProductFilters from '../components/Products/ProductFilters';
import { Pagination } from '../components/UI';
import { capitalizeFirst } from '../client/utils';

class ProductsListContainer extends Component {
  state = {
    priceRangeValue: [5, 450],
    filters: {
      sort: [
        {
          id: 0,
          name: "What's new",
          value: 'freshness',
          selected: true
        },
        {
          id: 1,
          name: 'Price hight to low',
          value: 'pricedesc',
          selected: false
        },
        {
          id: 2,
          name: 'Price low to hight',
          value: 'pricedasc',
          selected: false
        }
      ]
    }
  };

  _isMounted = false; // Memory leak preventing

  componentDidMount = () => {
    this._isMounted = true;
    const { setCurrentCategory } = this.props;
    const { gender } = this.props.match.params;

    if (gender === 'men' || 'women') {
      setCurrentCategory(gender);
    }

    this.loadProducts();
  };

  componentDidUpdate = prevProps => {
    const { gender, category } = this.props.match.params;
    const { search } = this.props.location;

    if (
      gender !== prevProps.match.params.gender ||
      category !== prevProps.match.params.category
    ) {
      this.loadProducts();
    }
    if (search !== prevProps.location.search) {
      this.loadProducts();
    }
  };

  componentWillUnmount = () => {
    this._isMounted = false;

    this.props.resetProducts();
  };

  loadProducts = () => {
    const { gender, category } = this.props.match.params;
    const { page } = qs.parse(this.props.location.search);

    if (this._isMounted) {
      this.props.getProducts({
        gender,
        category,
        page,
        limit: this.props.productsLimit,
        search: this.props.location.search
      });
    }
  };

  handleSetSort = target => {
    const { location, history } = this.props;
    const { priceRangeValue, brand } = this.state;

    history.push({
      pathname: location.pathname,
      search: qs.stringify({
        sort: target.value,
        pricerange: priceRangeValue || '',
        brand: brand || ''
      })
    });

    const sort = this.state.filters.sort.map(item => {
      if (item.id === target.id) {
        return Object.assign({}, item, (item.selected = true));
      }

      return Object.assign({}, item, (item.selected = false));
    });

    this.setState({
      filters: { ...sort, sort }
    });
  };

  handleChangeRange = e => {
    let target = [];
    if (e.target.name === 'from') {
      target[0] = e.target.value;
    } else {
      target[1] = e.target.value;
    }
    this.setState({
      priceRangeValue: target
    });
  };

  handleSetRange = () => {
    const { location, history } = this.props;
    const { priceRangeValue } = this.state;

    const a = qs.parse(location.search);

    const q = {
      ...a,
      pricerange: priceRangeValue
    };

    history.push({
      pathname: location.pathname,
      search: qs.stringify(q)
    });
  };

  render() {
    const {
      match,
      location,
      isLoading,
      products,
      productsLimit,
      productsCount
    } = this.props;
    const { priceRangeValue, filters } = this.state;
    const { gender, category } = this.props.match.params;

    return (
      <>
        <h1>{`${capitalizeFirst(gender)}'s ${capitalizeFirst(category)}`}</h1>

        <ProductFilters
          filters={filters}
          priceRangeValue={priceRangeValue}
          onChangeRange={this.handleChangeRange}
          onSetRange={this.handleSetRange}
          onSetSort={this.handleSetSort}
        />

        <ProductsList isLoading={isLoading} count={productsCount}>
          {products.map(product => (
            <div key={product.id} className="product-list__item">
              <ProductFeatures {...product} />
            </div>
          ))}
        </ProductsList>

        <Pagination
          match={match}
          location={location}
          productsLimit={productsLimit}
          productsCount={productsCount}
        />
      </>
    );
  }
}

const mapPropsFromState = state => ({
  isLoading: state.products.productsLoading,
  products: state.products.products,
  productsCount: state.products.productsCount,
  productsLimit: state.products.productsLimit,
  filters: state.products.filters
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getProducts,
      resetProducts,
      filterProducts,
      setCurrentCategory
    },
    dispatch
  );

export default connect(
  mapPropsFromState,
  mapDispatchToProps
)(ProductsListContainer);
