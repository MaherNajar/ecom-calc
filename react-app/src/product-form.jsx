import React, { Component } from 'react';
import { saveProduct, updateProduct } from './productService';
import { Product } from './product';

export class ProductForm extends Component {
  state = {
    product: null
  };
  componentDidMount() {
    let selectedProduct = this.props.selectedProduct;
    console.log(selectedProduct);
    this.initialiseProduct(selectedProduct);
  }

  initialiseProduct(product) {
    if (product) this.setState({ product });
    else this.setState({ product: new Product() });
  }

  handleInputChange = ({ target }) => {
    let product = Object.create(new Product(), { ...this.state.product });
    console.log(product);
    product[target.id] = target.value;
    console.log(product);
    this.setState(product);
  };

  handleSubmit = e => {
    e.preventDefault();
    let { product } = this.state;
    if (product.isNew) saveProduct(product);
    else updateProduct(product);
    this.props.onSubmit(1);
  };

  render() {
    const { product: p } = this.state;
    return (
      <div className="container">
        <h3 className="text-center text-nowrap">Add new product</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Product name</label>
            <input
              onChange={this.handleInputChange}
              id="name"
              className="form-control"
              type="text"
              value={p?.name}
            />
          </div>
          <div className="form-group">
            <label htmlFor="url">URL</label>
            <input
              onChange={this.handleInputChange}
              id="url"
              className="form-control"
              type="url"
              value={p?.url}
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Save" />
        </form>
      </div>
    );
  }
}
