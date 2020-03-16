import React, { Component } from 'react';
import { Products } from './products';
import { ProductForm } from './product-form';
import { Tab, Tabs } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

export default class App extends Component {
  state = {
    key: 'products',
    currentProduct:null
  };
  handleKey = key => {
    this.setState({ key });
  };

  handleEditForm = currentProduct => {
    this.setState({currentProduct});
    this.handleKey('productForm')
  }

  
  render() {
    return (
      <Tabs activeKey={this.state.key} onSelect={k => this.handleKey(k)}>
        <Tab eventKey="products" title="Products">
          <Products onEditProduct={p => this.handleEditForm(p)} onNewProduct={() => this.handleKey('productForm')} />
        </Tab>
        <Tab eventKey="productForm" title="Product form">
          <ProductForm product={this.state.currentProduct} />
        </Tab>
        <Tab eventKey="config" title={<FontAwesomeIcon icon={faCog} />}></Tab>
      </Tabs>
    );
  }
}
