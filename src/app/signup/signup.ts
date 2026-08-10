import {
  ChangeDetectorRef,
  Component
} from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

import {
  CommonModule
} from '@angular/common';

import {
  Router
} from '@angular/router';

import {
  Network
} from '../service/network';


@Component({
  selector: 'app-signup',
  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule
  ],

  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class SignupComponent {

  signupForm: FormGroup;

  isLoading = false;

  errorMessage = '';

  successMessage = '';


  constructor(
    private fb: FormBuilder,
    private network: Network,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {

    this.signupForm = this.fb.group({

      fullName: [
        '',
        Validators.required
      ],

      userName: [
        '',
        Validators.required
      ],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ],

      confirmPassword: [
        '',
        Validators.required
      ]

    });

  }


  signup(): void {

    this.errorMessage = '';
    this.successMessage = '';


    if (this.signupForm.invalid) {

      this.signupForm.markAllAsTouched();

      return;
    }


    const fullName =
      this.signupForm.get('fullName')?.value;

    const userName =
      this.signupForm.get('userName')?.value;

    const password =
      this.signupForm.get('password')?.value;

    const confirmPassword =
      this.signupForm.get('confirmPassword')?.value;


    // Check password confirmation

    if (password !== confirmPassword) {

      this.errorMessage =
        'Password and Confirm Password do not match.';

      return;
    }


    this.isLoading = true;


    this.network
      .signup(
        fullName,
        userName,
        password
      )
      .subscribe({

        next: (response) => {

          console.log(
            'Signup response:',
            response
          );

          this.isLoading = false;

          this.successMessage =
            'Signup successful. Redirecting to login...';

this.cdr.detectChanges();
          // Go back to login after 1.5 seconds

          setTimeout(() => {

            this.router.navigate([
              '/app-login'
            ]);

          }, 1500);

        },


        error: (error) => {

          console.error(
            'Signup error:',
            error
          );

          this.isLoading = false;

          this.errorMessage =
            error.error ||
            'Unable to create account.';
this.cdr.detectChanges();
        }

      });

  }


  goToLogin(): void {

    this.router.navigate([
      '/app-login'
    ]);

  }

}