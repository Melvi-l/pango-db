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
  selector: 'sigup-page',
  templateUrl: './sigup-page.component.html',
  styleUrls: ['./sigup-page.component.css']
})
export class SigupPageComponent implements OnInit {
  
  error: string = ""
  signUpForm: FormGroup

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.signUpForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    }, {validators: [matchPasswords]})
  }

  ngOnInit(): void {
  }

  signUp() {
    if (this.signUpForm.invalid) {
      return
    }
    const authInput: AuthInput = this.signUpForm.value
    this.authService.signUp(authInput)
      .subscribe({
        next: () => {
          this.router.navigate(['/profil'])
        },
        error: (error) => {
          this.error = error
        }
      })
  }
}
