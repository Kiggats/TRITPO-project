import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {SportShopFormService} from "../../services/sport-shop-form.service";
import {Country} from "../../common/country";
import {State} from "../../common/state";
import {SportShopValidators} from "../../validators/sport-shop-validators";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup!: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  countries: Country[] = [];

  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  constructor(private  formBuilder: FormBuilder,
              private sportShopFormService: SportShopFormService,
              private  cartService: CartService) { }

  ngOnInit(): void {

    this.reviewCardDetails();

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', [Validators.required, Validators.minLength(2), SportShopValidators.notOnlyWhitespace]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(2), SportShopValidators.notOnlyWhitespace]),
        email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      }),
      shippingAddress: this.formBuilder.group({
        street: new FormControl('', [Validators.required, Validators.minLength(2), SportShopValidators.notOnlyWhitespace]),
        city: new FormControl('', [Validators.required, Validators.minLength(2), SportShopValidators.notOnlyWhitespace]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        postcode: new FormControl('', [Validators.required, Validators.minLength(2), SportShopValidators.notOnlyWhitespace])
      }),
      billingAddress: this.formBuilder.group({
        street: new FormControl('', [Validators.required, Validators.minLength(2), SportShopValidators.notOnlyWhitespace]),
        city: new FormControl('', [Validators.required, Validators.minLength(2), SportShopValidators.notOnlyWhitespace]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        postcode: new FormControl('', [Validators.required, Validators.minLength(2), SportShopValidators.notOnlyWhitespace])
      }),
      creditCard: this.formBuilder.group({
        cardType: new FormControl('', [Validators.required]),
        nameOnCard: new FormControl('', [Validators.required, Validators.minLength(2), SportShopValidators.notOnlyWhitespace]),
        cardNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]{16}')]),
        securityCode: new FormControl('', [Validators.required, Validators.pattern('[0-9]{3}')]),
        expirationMonth: new FormControl('', [Validators.required]),
        expirationYear: new FormControl('', [Validators.required])
      })
    });

    const  startMonth: number = new Date().getMonth() + 1;
    this.sportShopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        this.creditCardMonths = data;
      }
    );

    this.sportShopFormService.getCreditCardYears().subscribe(
      data => {
        this.creditCardYears = data;
      }
    );

    this.sportShopFormService.getCountries().subscribe(
      data => {
        this.countries = data;
      }
    );
  }

  get firstName() {return this.checkoutFormGroup.get('customer.firstName');}
  get lastName() {return this.checkoutFormGroup.get('customer.lastName');}
  get email() {return this.checkoutFormGroup.get('customer.email');}

  get shippingAddressStreet() {return this.checkoutFormGroup.get('shippingAddress.street');}
  get shippingAddressCity() {return this.checkoutFormGroup.get('shippingAddress.city');}
  get shippingAddressState() {return this.checkoutFormGroup.get('shippingAddress.state');}
  get shippingAddressPostcode() {return this.checkoutFormGroup.get('shippingAddress.postcode');}
  get shippingAddressCountry() {return this.checkoutFormGroup.get('shippingAddress.country');}

  get billingAddressStreet() {return this.checkoutFormGroup.get('billingAddress.street');}
  get billingAddressCity() {return this.checkoutFormGroup.get('billingAddress.city');}
  get billingAddressState() {return this.checkoutFormGroup.get('billingAddress.state');}
  get billingAddressPostcode() {return this.checkoutFormGroup.get('billingAddress.postcode');}
  get billingAddressCountry() {return this.checkoutFormGroup.get('billingAddress.country');}

  get cardType() {return this.checkoutFormGroup.get('creditCard.cardType');}
  get nameOnCard() {return this.checkoutFormGroup.get('creditCard.nameOnCard');}
  get cardNumber() {return this.checkoutFormGroup.get('creditCard.cardNumber');}
  get securityCode() {return this.checkoutFormGroup.get('creditCard.securityCode');}

  copyShippingToBilling(event: any) {
    if(event.target.checked) {
      this.checkoutFormGroup.controls.billingAddress.
      setValue(this.checkoutFormGroup.controls.shippingAddress.value);

      this.billingAddressStates = this.shippingAddressStates;
    }
    else {
      this.checkoutFormGroup.controls.billingAddress.reset();

      this.billingAddressStates = [];
    }
  }

  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    const currentYear: number = new Date().getFullYear();
    // @ts-ignore
    const selectedYear: number = Number(creditCardFormGroup.value.expirationYear);

    let startMonth: number;

    if(currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    }
    else {
      startMonth = 1;
    }

    this.sportShopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        this.creditCardMonths = data;
      }
    );

  }

  getStates(formGroupName: string) {
    const formGroup = this.checkoutFormGroup.get(formGroupName);

    const countryCode = formGroup?.value.country.code;

    this.sportShopFormService.getStates(countryCode).subscribe(
      data => {
        if(formGroupName === 'shippingAddress') {
          this.shippingAddressStates = data;
        }
        else {
          this.billingAddressStates = data;
        }

        formGroup?.get('state')?.setValue(data[0]);
      }
    );
  }

  reviewCardDetails() {
    this.cartService.totalQuantity.subscribe(
      data => {
        this.totalQuantity = data;
      }
    );

    this.cartService.totalPrice.subscribe(
      data => {
        this.totalPrice = data;
      }
    );
  }

  onSubmit() {
    if(this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
    }
  }

}
