export class Fees {
  static get defaultFees() {
    return { ebay: 0.0684, paypal: 0.0342 };
  }
  static setFees(ebay, paypal) {
    localStorage.setItem('fees', JSON.stringify({ ebay, paypal }));
  }
  static getFees() {
    let fees = localStorage.getItem('fees');
    if (fees) return JSON.parse(fees);
    else return this.defaultFees;
  }
}
