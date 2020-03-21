import { Fees } from './fees';
export class Product {
  constructor(init) {
    this.id = '';
    this.name = '';
    this.url = '';
    this.cost = 0;
    this.sell = 0;
    Object.assign(this, init);
  }
  get profit() {
    let fees = Fees.getFees();
    let ebay = this.sell * fees.ebay;
    let paypal = this.sell * fees.paypal;
    return +(this.sell - this.cost - ebay - paypal).toFixed(2);
  }
  get rate() {
    return +((this.profit / this.sell) * 100).toFixed(2);
  }
  get isNew() {
    return this.id === '';
  }
}
