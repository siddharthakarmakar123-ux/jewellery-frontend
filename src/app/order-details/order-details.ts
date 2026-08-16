import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Network } from '../service/network';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './order-details.html',
  styleUrl: './order-details.css',
})
export class OrderDetails implements OnInit {

  customer: any;

  orderForm!: FormGroup;

  calculated = false;

  goldRate = 0;
  silverRate = 0;
  ratesLoading = false;
  ratesError = '';
  netWeight = 0;
  metalRate = 0;
  makingCharge = 0;
  totalAmount = 0;
  showRateWarning = false;
  rateLastUpdated: Date | null = null;

  constructor(
    private fb: FormBuilder,
    private metalRateService: Network
  ) { }

  ngOnInit(): void {

    this.customer = history.state.customer;

    console.log('Customer received:', this.customer);

    this.orderForm = this.fb.group({

      metalType: [
        'gold',
        Validators.required
      ],

      weight: [
        '',
        [
          Validators.required,
          Validators.min(0.001)
        ]
      ],

      exchangeWeight: [
        0,
        [
          Validators.min(0)
        ]
      ]

    });

    this.loadCurrentRates();

  }

  

  calculateRate(): void {

  if (this.orderForm.invalid) {

    this.orderForm.markAllAsTouched();

    return;
  }

  if (this.ratesLoading) {
    return;
  }

  if (this.goldRate <= 0 || this.silverRate <= 0) {

    this.ratesError =
      'Current metal rates are not available.';

    return;
  }

  /*
   * Check whether today's rate is available.
   */
  if (this.isRateOutdated() && !this.showRateWarning) {

    this.showRateWarning = true;

    return;
  }

  /*
   * Continue with calculation
   */
  this.showRateWarning = false;

  this.performCalculation();
}

performCalculation(): void {

  this.showRateWarning = false;
  const metal =
    this.orderForm.get('metalType')?.value;

  const weight =
    Number(this.orderForm.get('weight')?.value);

  let exchangeWeight =
    Number(this.orderForm.get('exchangeWeight')?.value);

  if (!exchangeWeight || exchangeWeight < 0) {
    exchangeWeight = 0;
  }

  // if (exchangeWeight > weight) {

  //   this.ratesError =
  //     'Exchange weight cannot be greater than weight.';

  //   return;
  // }

  this.ratesError = '';

  this.netWeight =
    weight - exchangeWeight;

  this.metalRate =
    metal === 'gold'
      ? this.goldRate
      : this.silverRate;


  // Making charge
  if (metal === 'silver') {

    if (weight <= 10) {
      this.makingCharge = 30;
    }
    else if (weight <= 20) {
      this.makingCharge = 25;
    }
    else if (weight <= 50) {
      this.makingCharge = 20;
    }
    else {
      this.makingCharge = 10;
    }

  } else {

    this.makingCharge =
      (this.metalRate * 10) / 100;
  }


  // Total
  this.totalAmount =
    (this.metalRate * this.netWeight) +
    (this.makingCharge * weight);

  this.calculated = true;
}

  loadCurrentRates(): void {

    this.ratesLoading = true;
    this.ratesError = '';

    this.metalRateService.getCurrentRates().subscribe({

      next: (data: any) => {

        console.log('Current rates:', data);

        if (data) {

          this.goldRate =
            Number(data.goldRatePerGram);

          this.silverRate =
            Number(data.silverRatePerGram);

          this.rateLastUpdated =
            new Date(data.createdTimestamp);

        }

        this.ratesLoading = false;
      },

      error: (error: any) => {

        console.error('Unable to load rates:', error);

        this.ratesLoading = false;

        this.ratesError =
          'Unable to load current metal rates.';
      }

    });
  }

  isRateOutdated(): boolean {

    if (!this.rateLastUpdated) {
      return true;
    }

    const today = new Date();

    return (
      this.rateLastUpdated.getFullYear() !== today.getFullYear() ||
      this.rateLastUpdated.getMonth() !== today.getMonth() ||
      this.rateLastUpdated.getDate() !== today.getDate()
    );
  }
}
