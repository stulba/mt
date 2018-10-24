import React, { Component } from 'react';
import uuidv4 from 'uuid/v4';
import { Textarea } from '../components/UI';
import { Input } from '../components/UI/Form/Input';
import * as Button from '../components/UI/Button/Button';

const prepareURL = (id, brand, title) => {
  function prepareParts(part) {
    return part
      .toLowerCase()
      .split(' ')
      .join('-');
  }

  return `${prepareParts(brand)}/${prepareParts(title)}/${id}`;
};

class AddProduct extends Component {
  state = {
    product: {
      id: '',
      gender: 'Women',
      category: '',
      subCategory: '',
      created_at: '',
      brand: '',
      title: '',
      color: '',
      details: '',
      price: '',
      quantity: '',
      assets: {
        thumbnail: '',
        complementary: []
      },
      url: ''
    }
  };

  onChange = ({ target }) => {
    const product = { ...this.state.product };

    if (target.name === 'thumbnail') {
      product.assets[target.name] = target.value;
    } else {
      product[target.name] = target.value;
    }

    this.setState({
      product
    });
  };

  addProduct = e => {
    const { handleAddProduct } = this.props;
    const { product } = this.state;

    product.id = uuidv4();
    product.created_at = new Date().toISOString();
    product.url = prepareURL(product.id, product.brand, product.title);

    this.setState(
      {
        product
      },
      () => handleAddProduct(product)
    );

    e.preventDefault();
  };

  renderCategorySelector = () => {
    const { categories } = this.props;
    const { product } = this.state;

    const genderCategories = categories[product.gender.toLowerCase()].sub;

    const options = genderCategories.map(category => {
      return <option key={category.id}>{category.name}</option>;
    });

    return (
      <div className="form__group form__group--tight">
        <label id="category" className="label">
          Category
        </label>
        <select
          onChange={this.onChange}
          id="category"
          className="select"
          name="category"
          value={product.category}
        >
          <option value="">Select</option>
          {options}
        </select>
      </div>
    );
  };

  renderSubCategorySelector = () => {
    const { categories } = this.props;
    const { product } = this.state;
    const subCategories = categories[product.gender.toLowerCase()].sub;
    let options;

    subCategories.map(category => {
      if (product.category && product.category === category.name) {
        options = category.sub.map(subCategory => (
          <option key={subCategory.id}>{subCategory.name}</option>
        ));
      }

      return options;
    });

    return (
      <div className="form__group form__group--tight">
        <label id="subCategory" className="label">
          Sub Category
        </label>
        <select
          onChange={this.onChange}
          id="subCategory"
          className="select"
          name="subCategory"
          value={product.subCategory}
        >
          <option value="">Select</option>
          {options}
        </select>
      </div>
    );
  };

  render() {
    const { categories } = this.props;
    const { product } = this.state;

    console.log(product);

    return (
      <div className="container container--half">
        <div className="add-product">
          <h1>Add Product</h1>
          <p>All fields are required</p>
          <form onSubmit={this.addProduct}>
            <div className="form__group form__group--tight">
              <label id="genderSelect" className="label">
                Gender
              </label>
              <select
                onChange={this.onChange}
                id="genderSelect"
                className="select"
                name="gender"
                value={product.gender}
              >
                {Object.keys(categories).map(category => (
                  <option key={category}>{categories[category].name}</option>
                ))}
              </select>
            </div>

            {product.gender && this.renderCategorySelector()}
            {product.category && this.renderSubCategorySelector()}

            <div className="form__group">
              <Input
                onChange={this.onChange}
                label="Title"
                group
                name="title"
                type="text"
                placeholder="Title"
                value={product.title}
                // required
              />
            </div>

            <div className="form__group">
              <Input
                onChange={this.onChange}
                label="Brand"
                group
                name="brand"
                type="text"
                placeholder="Brand"
                value={product.brand}
                // required
              />
            </div>

            <div className="form__group">
              <Input
                onChange={this.onChange}
                label="Price"
                group
                name="price"
                type="number"
                placeholder="Price"
                value={product.price}
                // required
              />
            </div>

            <div className="form__group">
              <Input
                onChange={this.onChange}
                label="Quantity"
                group
                name="quantity"
                type="number"
                placeholder="Quantity"
                value={product.quantity}
                // required
              />
            </div>

            <div className="form__group">
              <Input
                onChange={this.onChange}
                group
                name="color"
                type="text"
                label="Color"
                placeholder="Black"
                value={product.color}
                // required
              />
            </div>

            <div className="form__group">
              <Input
                onChange={this.onChange}
                label="Thumbnail Image"
                group
                name="thumbnail"
                type="text"
                placeholder="Thumbnail Image"
                value={product.assets.thumbnail}
                // required
              />
            </div>

            <div className="form__group">
              <Textarea
                onChange={this.onChange}
                label="Details"
                group
                name="details"
                placeholder="Details"
                value={product.details}
                // required
              />
            </div>

            <div className="form__group">
              <Button.Primary text="Add Product" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AddProduct;
