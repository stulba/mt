import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FaShoppingCart } from 'react-icons/fa';
import './Cart.css';

const CartFeatures = ({ quantity }) => {
  return (
    <div className="cart-features">
      <Link
        className={
          quantity
            ? 'cart-features__link cart-features__link--has'
            : 'cart-features__link'
        }
        to="/cart"
      >
        <FaShoppingCart />
        <span className="cart-features__count">{quantity}</span>
      </Link>
    </div>
  );
};

const mapPropsFromState = state => ({
  quantity: state.cart.amount
});

export default connect(mapPropsFromState)(CartFeatures);
