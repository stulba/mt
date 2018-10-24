import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
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
        <TransitionGroup component={null}>
          {items.map(item => (
            <CSSTransition
              key={item.id}
              timeout={{ enter: 2000, exit: 2000 }}
              classNames="example"
            >
              <CartItem
                item={item}
                onDecreaseAmount={onDecreaseAmount}
                onIncreaseAmount={onIncreaseAmount}
                onDeleteItem={onDeleteItem}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>

      <div className="cart-subtotal">
        <span className="cart-subtotal__subtotal">Sub-total</span>
        <span className="cart-subtotal__price">${total.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default CartInfo;
