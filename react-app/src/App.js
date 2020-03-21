import React, { Component } from 'react';
import { Products } from './products';
import { ProductForm } from './product-form';
import { Tab, Tabs } from 'react-bootstrap';

export default class App extends Component {
  state = {
    key: 1,
    selectedProduct: null
  };
  handleKey = key => {
    this.setState({ key });
  };

  handleSelectedProduct = selectedProduct => {
    this.setState({ selectedProduct });
    this.handleKey(2);
  };

  render() {
    const { selectedProduct, key } = this.state;
    return (
      <Tabs activeKey={key} onSelect={this.handleKey}>
        <Tab eventKey="1" title="Products">
          <Products onSelectProduct={this.handleSelectedProduct} />
        </Tab>
        <Tab eventKey="2" title="Product form">
          <ProductForm
            selectedProduct={selectedProduct}
            onSubmit={this.handleKey}
          />
        </Tab>
      </Tabs>
    );
  }
}
