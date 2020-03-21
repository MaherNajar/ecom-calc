import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTools, faSave } from '@fortawesome/free-solid-svg-icons';
import './Products.css';
import { getProducts, updateProduct } from './productService';

export class Products extends Component {
  state = {
    products: [],
    save: true
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
    products.splice(index, 1, p);
    this.setState({ products, save: false });
  };

  handleSave = () => {
    this.setState({ save: true });
  };

  render() {
    return (
      <div className="container" style={{ overflowX: 'auto' }}>
        <h3 className="text-center">Ecommerce calculator</h3>
        <FontAwesomeIcon
          className={
            this.state.save ? 'float-right icon' : 'float-right icon blinking'
          }
          icon={faSave}
          onClick={this.handleSave}
        />
        <FontAwesomeIcon className="float-right icon" icon={faTools} />
        <table className="table table-stripped table-bordered">
          <thead>
            <tr>
              <th>Product</th>
              <th>Cost</th>
              <th>Sell</th>
              <th>Profit</th>
              <th>Rate</th>
            </tr>
          </thead>
          <tbody>
            {this.state.products.map(p => (
              <tr key={p.id}>
                <td>
                  <a
                    href={p.href}
                    onClick={() => this.props.onSelectProduct(p)}
                    id="product"
                  >
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
                    style={{ color: p.rate >= 10 ? 'green' : 'red' }}
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
