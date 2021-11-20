export class OrderHistory {
  id: string;
  orderTrackingNumber: number;
  totalPrice: number;
  totalQuantity: number;
  dateCreated: Date;


  constructor(id: string, orderTrackingNumber: number, totalPrice: number, totalQuantity: number, dateCreated: Date) {
    this.id = id;
    this.orderTrackingNumber = orderTrackingNumber;
    this.totalPrice = totalPrice;
    this.totalQuantity = totalQuantity;
    this.dateCreated = dateCreated;
  }
}
