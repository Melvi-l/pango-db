import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import AuthService, { AuthInput } from 'src/services/auth.service'

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  error: string = ""
  isLoading: boolean = false
  logInForm: FormGroup

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.logInForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
  }

  // API
  logIn() {
    if (this.logInForm.invalid) {
      return
    }
    this.isLoading = true
    const authInput: AuthInput = this.logInForm.value
    this.authService.logIn(authInput)
      .subscribe({
        next: (authRes) => {
          this.authService.setAuthToken(authRes.token)
          this.authService.setUserId(authRes.userId)
        },
        error: (error) => {
          console.error(error)
          this.error = error.message
          this.isLoading = false
        },
        complete: () => {
          this.router.navigate(['/profil'])
          this.isLoading = false
        }
      })
  }

}
