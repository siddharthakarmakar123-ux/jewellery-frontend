import { ChangeDetectorRef, Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,

} from '@angular/forms';

import { Network } from '../service/network';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  loginForm: FormGroup;

  isLoading = false;

  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private loginService: Network,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private authService: AuthService
  ) {

    this.loginForm = this.fb.group({

      userName: [
        '',
        Validators.required
      ],

      password: [
        '',
        Validators.required
      ]

    });
  }


  login(): void {

    this.errorMessage = '';
    this.successMessage = '';

    if (this.loginForm.invalid) {

      this.loginForm.markAllAsTouched();

      return;
    }

    this.isLoading = true;

    const userName =
      this.loginForm.get('userName')?.value;

    const password =
      this.loginForm.get('password')?.value;


    this.loginService
      .authenticate(userName, password)
      .subscribe({

        next: (response) => {

          console.log('SUCCESS RESPONSE RECEIVED');
          console.log('Login response:', response);

          this.isLoading = false;

          this.successMessage =
            'Login successful';

          this.cdr.detectChanges();
          this.authService.login(response);
          this.router.navigate([
            '/customer-save-search'
          ]);

          // Dashboard navigation will be added next.
        },

        error: (error) => {

          console.error('Login error:', error);

          this.isLoading = false;

          this.errorMessage =
            error.error || 'Invalid username or password';
          this.cdr.detectChanges();

        }

      });
  }

  goToSignup(): void {

    this.router.navigate([
      '/app-signup'
    ]);

  }
}