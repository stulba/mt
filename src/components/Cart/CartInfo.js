import React from 'react';
import './Cart.css';
import CartItem from './CartItem';

const CartInfo = ({
  items,
  total,
  amount,
  onDecreaseAmount,
  onIncreaseAmount,
  onDeleteItem
}) => {
  if (amount === 0) return <p>Cart is empty</p>;

  return (
    <div className="cart">
      <h1 className="cart__header">My Cart</h1>

      <div className="cart__content">
        {items.map(item => (
          <CartItem
            item={item}
            onDecreaseAmount={onDecreaseAmount}
            onIncreaseAmount={onIncreaseAmount}
            onDeleteItem={onDeleteItem}
          />
        ))}
      </div>

      <div className="cart-subtotal">
        <span className="cart-subtotal__subtotal">Sub-total</span>
        <span className="cart-subtotal__price">${total.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default CartInfo;
