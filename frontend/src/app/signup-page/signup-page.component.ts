import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidateFn } from 'mongoose';
import AuthService, { AuthInput } from 'src/services/auth.service';

function matchPasswords(control: AbstractControl): { [key: string]: any } | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  if (password?.value !== confirmPassword?.value) {
    return { passwordsMismatch: true };
  }
  return null;
}

@Component({
  selector: 'signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {

  error: string = ""
  isLoading: boolean = false
  signUpForm: FormGroup

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.signUpForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    }, { validators: [matchPasswords] })
  }

  ngOnInit(): void {
  }

  // API
  signUp() {
    if (this.signUpForm.invalid) {
      return
    }
    this.isLoading = true
    const authInput: AuthInput = this.signUpForm.value
    this.authService.signUp(authInput)
    .subscribe({
        next: (authRes) => {
          this.authService.setAuthToken(authRes.token)
          this.authService.setUserId(authRes.userId)
        },
        error: (error) => {
          console.error(error)
          this.error = error.message
          this.isLoading = true
        },
        complete: () => {
          this.router.navigate(['/profil'])
          this.isLoading = true
        }
      })
  }
}