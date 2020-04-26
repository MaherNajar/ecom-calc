import { Fees } from "./fees";

export class Product {
  id: string = "";
  name: string = "";
  url: string = "";
  cost: number = 0;
  sell: number = 0;

  constructor(init?: Partial<Product>) {
    Object.assign(this, init);
  }

  get fees() {
    let fees = Fees.getFees();
    let ebay = this.sell * fees.ebay;
    let paypal = this.sell * fees.paypal;

    return ebay + paypal;
  }

  get profit() {
    return this.sell - this.cost - this.fees;
  }
  get rate() {
    return (this.profit / this.sell) * 100;
  }

  get isNew() {
    return this.id === "";
  }
}
