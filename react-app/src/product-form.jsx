import React, { Component } from 'react';
import { saveProduct } from './productService';

export class ProductForm extends Component {

  componentDidMount() {
    if(this.props.product) {
      this.setState({...product})
    }
    else initializeState();
   
  }

  initializeState = () => {
    this.setState({url:'', name:''});
  };
  handleInputChange = ({ target }) => {
    this.setState({
      [target.id]: target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    saveProduct(this.state);
  };
  render() {
    const { name, url } = this.state;
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
              value={name}
            />
          </div>
          <div className="form-group">
            <label htmlFor="url">URL</label>
            <input
              onChange={this.handleInputChange}
              id="url"
              className="form-control"
              type="url"
              value={url}
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Save" />
        </form>
      </div>
    );
  }
}
