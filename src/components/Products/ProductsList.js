import React from 'react';
import './Products.css';

const ProductsList = ({ isLoading, count, children }) => {
  if (isLoading) return <p>Still loading...</p>;

  return (
    <div className="product-list">
      <div className="product-list__info u-center">
        {count && <p>{count} Products</p>}
      </div>

      <div className="product-list__items">{children}</div>
    </div>
  );
};

export default ProductsList;
