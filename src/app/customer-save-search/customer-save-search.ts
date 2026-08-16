import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { Network } from '../service/network';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-save-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './customer-save-search.html',
  styleUrl: './customer-save-search.css',
})
export class CustomerSaveSearch {

  customerForm: FormGroup;
  customerFound: boolean = false;
searchCompleted: boolean = false;

isSearching: boolean = false;
isSaving: boolean = false;

successMessage: string = '';
errorMessage: string = '';

  constructor(private fb: FormBuilder,
    private customerService: Network,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {

    this.customerForm = this.fb.group({
      mobile: [
        '',
        [
          Validators.required,
          Validators.pattern('^[6-9][0-9]{9}$')
        ]
      ],

      fullName: [
        '',
        [
          Validators.required
        ]
      ],

      email: [
        '',
        [
          Validators.email
        ]
      ],

      address: [''],
      customerNumber: [''],
      customerId: [''],
    });
  }

  searchCustomer(): void {

  const mobileControl = this.customerForm.get('mobile');

  if (mobileControl?.invalid) {
    mobileControl.markAsTouched();
    return;
  }

  this.successMessage = '';
  this.errorMessage = '';
  this.isSearching = true;

  const mobile = mobileControl?.value;

  this.customerService.searchCustomer(mobile)
    .subscribe({

      next: (data) => {

  this.isSearching = false;
  this.searchCompleted = true;

  if (data && data.length > 0) {

    this.customerFound = true;

    const customer = data[0];

    console.log('Customer found:', customer);
    console.log('Customer data:', JSON.stringify(customer));
    console.log('Customer ID:', customer.customerId);
    console.log('Customer Number:', customer.customerNumber);

    this.customerForm.patchValue({

      customerId: customer.customerId,

      customerNumber: customer.customerNumber,

      mobile: customer.mobile,

      fullName: customer.fullName,

      email: customer.email,

      address: customer.address

    });
    console.log('Customer form values after patch:', this.customerForm.value);

  } else {

    this.customerFound = false;

    this.customerForm.patchValue({

      customerId: '',
      customerNumber: '',
      fullName: '',
      email: '',
      address: ''

    });

  }
  this.cdr.detectChanges();
},

      error: (error) => {

        this.isSearching = false;
        this.searchCompleted = false;

        console.error('Search API error:', error);

        this.errorMessage =
          'Unable to search customer. Please try again.';
          this.cdr.detectChanges();
      }
    });
}

  saveCustomer(): void {

  if (this.customerForm.invalid) {
    this.customerForm.markAllAsTouched();
    return;
  }

  if (this.customerFound || this.isSaving) {
    return;
  }

  this.successMessage = '';
  this.errorMessage = '';
  this.isSaving = true;

  const customerData = this.customerForm.value;

  this.customerService.saveCustomer(customerData)
    .subscribe({

      next: (response) => {

        this.isSaving = false;

        console.log('Customer saved:', response);

        this.successMessage =
          'Customer saved successfully. Customer No: '
          + response.customerNumber;

        this.customerForm.reset();

        this.searchCompleted = false;
        this.customerFound = false;
        this.cdr.detectChanges();
      },

      error: (error) => {

        this.isSaving = false;

        console.error('Save API error:', error);

        this.errorMessage =
          'Unable to save customer. Please try again.';
          this.cdr.detectChanges();
      }
    });
}

goToOrderDetails(): void {
console.log('Navigating to order details with customer data:', this.customerForm.value);
  this.router.navigate(
    ['/order-details'],
    {
      state: {
        customer: this.customerForm.value
      }
    }
  );

}
}
