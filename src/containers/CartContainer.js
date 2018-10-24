import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  increaseAmount,
  decreaseAmount,
  deleteItemFromCart,
  getTotal
} from '../redux/actions/cart';
import { CartInfo } from '../components/Cart';

class CartContainer extends Component {
  componentDidMount = () => {
    this.props.getTotal();
  };

  onDeleteItem = id => {
    const { deleteItemFromCart, getTotal } = this.props;

    deleteItemFromCart(id);
    getTotal();
  };

  onIncreaseAmount = id => {
    const { increaseAmount, getTotal } = this.props;

    increaseAmount(id);
    getTotal();
  };

  onDecreaseAmount = id => {
    const { decreaseAmount, getTotal } = this.props;

    decreaseAmount(id);
    getTotal();
  };

  render() {
    const { items, total, amount } = this.props;

    return (
      <CartInfo
        onDecreaseAmount={this.onDecreaseAmount}
        onIncreaseAmount={this.onIncreaseAmount}
        onDeleteItem={this.onDeleteItem}
        items={items}
        total={total}
        amount={amount}
      />
    );
  }
}

CartContainer.propTypes = {
  items: PropTypes.array.isRequired
};

const mapPropsFromState = state => ({
  items: state.cart.items,
  total: state.cart.total,
  amount: state.cart.amount
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      increaseAmount,
      decreaseAmount,
      deleteItemFromCart,
      getTotal
    },
    dispatch
  );

export default connect(
  mapPropsFromState,
  mapDispatchToProps
)(CartContainer);
