import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getProduct, resetProduct } from '../redux/actions/products';
import { addItemToCart } from '../redux/actions/cart';
import { setCurrentCategory } from '../redux/actions/categories';
import { ProductInfo } from '../components/Products';

class ProductInfoContainer extends Component {
  state = {
    selectedSize: '',
    errorMessages: ''
  };

  _isMounted = false; // Memory leak preventing

  componentDidMount = () => {
    this._isMounted = true;

    this.loadProduct();
  };

  componentWillUnmount = () => {
    this._isMounted = false;
    this.props.resetProduct();
  };

  loadProduct = () => {
    const { id } = this.props.match.params;

    if (this._isMounted) {
      this.props.getProduct(id);
    }
  };

  onAddToCart = item => {
    if (!this.state.selectedSize) {
      this.setState({
        errorMessages: 'Please, select size'
      });
    } else {
      this.setState({
        errorMessages: ''
      });

      this.props.addItemToCart({ ...item, size: this.state.selectedSize });
    }
  };

  onSetCurrentCategory = category => {
    this.props.setCurrentCategory(category.toLowerCase());
  };

  onSelectSize = size => {
    this.setState({
      selectedSize: size,
      errorMessages: ''
    });
  };

  render() {
    const { isLoading, product } = this.props;
    const { errorMessages } = this.state;

    if (isLoading) return <p>Still Loading...</p>;

    return (
      <ProductInfo
        setCurrentCategory={this.onSetCurrentCategory}
        onAddToCart={this.onAddToCart}
        onSelectSize={this.onSelectSize}
        isLoading={isLoading}
        errors={errorMessages}
        product={product}
      />
    );
  }
}

const mapPropsFromState = state => ({
  isLoading: state.products.productLoading,
  product: state.products.product
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getProduct,
      resetProduct,
      addItemToCart,
      setCurrentCategory
    },
    dispatch
  );

export default connect(
  mapPropsFromState,
  mapDispatchToProps
)(ProductInfoContainer);
