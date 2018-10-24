import React from 'react';
import { Link } from 'react-router-dom';

function CartItem({ item, onDecreaseAmount, onIncreaseAmount, onDeleteItem }) {
  return (
    <div key={item.id} className="cart-item">
      <div className="cart-item__figure">
        <Link to={item.url}>
          <img
            className="cart-item__image"
            src={item.assets.main}
            alt={item.title}
          />
        </Link>
      </div>

      <div className="cart-item__details">
        <div className="cart-item__price">
          <span>${item.price.toFixed(2)}</span>
        </div>
        <p className="cart-item__name">
          <Link className="cart-item__link" to={item.url}>
            {item.title}
          </Link>
        </p>
        <div className="cart-item-variants">
          <p className="cart-item-variants__variant">
            Color:
            <span className="cart-item__color"> {item.color}</span>
          </p>
          <p className="cart-item-variants__variant">
            Size: <span className="cart-item__size"> {item.size}</span>
          </p>
        </div>

        <div className="cart-item__actions">
          <button
            className="cart-item__remove"
            onClick={() => onDeleteItem(item.id)}
          />
          <div className="cart-item__action">
            <span className="cart-iten__quantity">{item.amount}</span>
            <button
              disabled={item.amount === 1}
              onClick={() => onDecreaseAmount(item.id)}
            >
              -
            </button>
          </div>

          <div className="cart-item__action">
            <button onClick={() => onIncreaseAmount(item.id)}>+</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
