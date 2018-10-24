import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import qs from 'query-string';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getProducts,
  resetProducts,
  addProduct
} from '../redux/actions/products';
import { getCategories } from '../redux/actions/categories';
import PrivateRoute from '../components/App/PrivateRoute';
import ProductForm from './ProductForm';
import Dashboard from '../components/Dashboard/Dashboard';

class UserProfileContainer extends Component {
  _isMounted = false; // Memory leak preventing

  componentDidMount = () => {
    this._isMounted = true;

    this.loadProducts();
    this.loadCategories();
  };

  componentDidUpdate = prevProps => {
    const { gender } = this.props.match.params;
    const { search } = this.props.location;

    if (
      gender !== prevProps.match.params.gender ||
      search !== prevProps.location.search
    )
      this.loadProducts();
  };

  componentWillUnmount = () => {
    this._isMounted = false;

    this.props.resetProducts();
  };

  loadProducts = () => {
    const { gender, category } = this.props.match.params;
    const page = qs.parse(this.props.location.search).page;

    if (this._isMounted) {
      this.props.getProducts({
        gender,
        category,
        page,
        limit: this.props.productsLimit
      });
    }
  };

  loadCategories = () => {
    const { getCategories } = this.props;

    getCategories();
  };

  addProduct = product => {
    const { addProduct } = this.props;

    addProduct(product);
  };

  updateState = opions => {
    this.setState(opions);
  };

  render() {
    const {
      categories,
      products,
      productsCount,
      productsLimit,
      location,
      match
    } = this.props;

    return (
      <div className="profile">
        <Switch>
          <PrivateRoute
            path={`${match.path}/add_product`}
            component={() => (
              <ProductForm
                categories={categories}
                handleAddProduct={this.addProduct}
              />
            )}
          />

          <PrivateRoute
            path={`${match.path}`}
            component={() => (
              <Dashboard
                products={products}
                productsCount={productsCount}
                productsLimit={productsLimit}
                location={location}
                match={match}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

const mapPropsFromState = state => ({
  isLoading: state.products.productsLoading,
  products: state.products.products,
  productsCount: state.products.productsCount,
  productsLimit: state.products.productsLimit,
  categories: state.categories.categories
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getProducts,
      resetProducts,
      addProduct,
      getCategories
    },
    dispatch
  );

export default connect(
  mapPropsFromState,
  mapDispatchToProps
)(UserProfileContainer);
