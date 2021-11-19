export class Order {
  totalQuantity: number;
  totalPrice: number;


  constructor(totalPrice: number, totalQuantity: number) {
    this.totalQuantity = totalQuantity;
    this.totalPrice = totalPrice;
  }
}
