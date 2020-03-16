export class Product {
  profit;
  rate;
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.cost = data.cost;
    this.sell = data.sell;
    this.url = data.url;
    this.calculateProfitAndRate();
  }

  calculateProfitAndRate() {
    let fees = feesProvider();
    let ebay = this.sell * fees.ebay;
    let paypal = this.sell * fees.paypal;

    this.profit = (this.sell - this.cost - ebay - paypal).toFixed(2);
    this.rate = ((this.profit / this.sell) * 100).toFixed(2);
  }
}

function feesProvider() {
  return { ebay: 0.0684, paypal: 0.0342 };
}
