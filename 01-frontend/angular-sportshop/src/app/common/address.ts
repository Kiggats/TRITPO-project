export class Address {
  street: string;
  city: string;
  state: string;
  country: string;
  postcode: string;


  constructor(street: string, city: string, state: string, country: string, postcode: string) {
    this.street = street;
    this.city = city;
    this.state = state;
    this.country = country;
    this.postcode = postcode;
  }
}
