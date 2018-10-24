import React, { Component } from 'react';
import { Carousel } from '../Carousel';
import * as Button from '../UI/Button/Button';

class ProductInfo extends Component {
  state = {
    zoomed: false
  };

  componentDidMount = () => {
    const { product, setCurrentCategory } = this.props;
    setCurrentCategory(product.gender);
  };

  handleZoomIn = value => {
    this.setState({
      zoomed: value
    });
  };

  render() {
    const {
      isLoading,
      errors,
      onSelectSize,
      onAddToCart,
      product
    } = this.props;
    const { zoomed } = this.state;

    if (!product.id) return null;
    if (isLoading) return <p>Still loading...</p>;

    return (
      <div className={zoomed ? 'product product--zoomed-in' : 'product'}>
        <div className="product__view">
          <Carousel
            handleZoomIn={this.handleZoomIn}
            items={product.assets.gallery}
            layout="hrz"
          />
        </div>

        <div className="product__aside">
          <h1 className="product__heading">{product.title}</h1>
          <p className="product__price">${product.price.toFixed(2)}</p>

          <div className="product-color">
            <label className="label">Color:</label>
            <span className="product-color__value">{product.color}</span>
          </div>
          <div className="product__size">
            <label className="label" htmlFor="selectSize">
              Size
            </label>

            {product.sizes && (
              <select
                onChange={e => onSelectSize(e.target.value)}
                id="selectSize"
                className="select"
                defaultValue=""
              >
                <option value="">Select size</option>
                {product.sizes.map(size => (
                  <option key={size}>{size}</option>
                ))}
              </select>
            )}

            {errors && <div className="error-message">{errors}</div>}
          </div>

          <div className="product__actions">
            <Button.Primary
              onClick={onAddToCart.bind(this, product)}
              text="Add to Cart"
            />
          </div>

          <p className="product__details">{product.details}</p>
        </div>
      </div>
    );
  }
}

export default ProductInfo;
