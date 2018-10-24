import React from 'react';
import { Link } from 'react-router-dom';

function ProductFeatures({ assets, title, price, url }) {
  return (
    <div className="product-features">
      <Link to={url}>
        <img
          className="product-features__image"
          src={assets.main}
          alt={title}
        />
        <h4 className="product-features__title">{title}</h4>
        <p className="product-features__price">${price.toFixed(2)}</p>
      </Link>
    </div>
  );
}

export default ProductFeatures;
