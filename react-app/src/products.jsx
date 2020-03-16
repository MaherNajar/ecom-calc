import React, { Component } from 'react';
import Button from 'react-bootstrap/button';
import './Products.css';
import { getProducts, updateProduct } from './productService';

export class Products extends Component {
  state = {
    products: []
  };
  async componentDidMount() {
    this.setState({ products: await getProducts() });
  }

  handleInputChange = (e, p) => {
    let products = [...this.state.products];
    let index = products.indexOf(p);
    const name = e.target.id;
    const value = e.target.value;
    p[name] = value;
    p.calculateProfitAndRate();
    products.splice(index, 1, p);
    this.setState({ products });
    updateProduct(p);
  };

  onEditProduct = (e, p) => {
    e.stopPropagation();
    this.props.onEditProduct(p);
  }

  render() {
    return (
      <div className="container" style={{ overflowX: 'auto' }}>
        <h3 className="text-center">Ecommerce calculator</h3>
        <Button
          onClick={this.props.onNewProduct}
          variant="primary"
        >
          New product
        </Button>
        <table className="table table-stripped table-bordered">
          <thead>
            <tr>
              <th>Product</th>
              <th>cost</th>
              <th>sell</th>
              <th>profit</th>
              <th>rate</th>
            </tr>
          </thead>
          <tbody>
            {this.state.products.map(p => (
              <tr key={p.id}>
                <td>
                  <a href={p.href} onClick={e => this.onEditProduct(e, p)} id="product" >
                    {p.name}
                  </a>
                </td>
                <td>
                  <input
                    value={p.cost}
                    id="cost"
                    type="number"
                    onChange={e => this.handleInputChange(e, p)}
                  />
                </td>
                <td>
                  <input
                    value={p.sell}
                    type="number"
                    id="sell"
                    onChange={e => this.handleInputChange(e, p)}
                  />
                </td>
                <td>
                  <span id="profit">{p.profit}</span>
                </td>
                <td>
                  <span
                    className={p.rate >= 10 ? 'goodRate' : 'badRate'}
                    id="rate"
                  >
                    {p.rate} %
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
