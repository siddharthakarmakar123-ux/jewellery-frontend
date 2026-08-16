import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Network } from '../service/network';

@Component({
  selector: 'app-rate',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './rate.html',
  styleUrl: './rate.css'
})
export class RateComponent implements OnInit {

  rateForm!: FormGroup;

  loading = false;
  saving = false;

  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private metalRateService: Network,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.rateForm = this.fb.group({
      goldRatePerGram: [
        '',
        [
          Validators.required,
          Validators.min(0.01)
        ]
      ],

      silverRatePerGram: [
        '',
        [
          Validators.required,
          Validators.min(0.01)
        ]
      ]
    });

    this.loadCurrentRates();
  }

  loadCurrentRates(): void {

    this.loading = true;

    this.metalRateService.getCurrentRates().subscribe({

      next: (data) => {
        if (data) {
          this.rateForm.patchValue({
            goldRatePerGram: data.goldRatePerGram,
            silverRatePerGram: data.silverRatePerGram
          });

          this.loading = false;
          this.cdr.detectChanges();
        } else {

          this.rateForm.patchValue({

            goldRatePerGram: '',
            silverRatePerGram: ''
          });
          this.loading = false;
          this.cdr.detectChanges();
        }
      },

      error: (error) => {

        this.loading = false;
        // No rate configured yet
        if (error.status === 404) {
          this.errorMessage = '';
        } else {
          this.errorMessage = 'Unable to load current rates.';
        }

        this.cdr.detectChanges();
      }
    });

  }

  saveRates(): void {

    this.successMessage = '';
    this.errorMessage = '';

    if (this.rateForm.invalid) {

      this.rateForm.markAllAsTouched();

      return;
    }

    this.saving = true;

    const request = this.rateForm.value

    this.metalRateService.saveRates(request).subscribe({

      next: (response: any) => {

        this.saving = false;

        this.successMessage =
          'Gold and Silver rates saved successfully.';
        this.cdr.detectChanges();

      },

      error: (error) => {

        this.saving = false;

        console.error(error);

        this.errorMessage =
          'Unable to save rates. Please try again.';
        this.cdr.detectChanges();
      }
    });
    this.cdr.detectChanges();
  }
}