import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserService } from '../services/user/user.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { InputValidationComponent } from "../input-validation/input-validation.component";
import { DefaultButtonComponent } from "../default-button/default-button.component";
import { LoadingScreenComponent } from "../loading-screen/loading-screen.component";

@Component({
  selector: 'app-login',
  imports: [CommonModule,
    FormsModule, RouterModule,
    ReactiveFormsModule, InputValidationComponent, DefaultButtonComponent, NgClass, LoadingScreenComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
  isloading: boolean = false;
  isLogggedIn: boolean = false;
  isError: boolean = false;
  showPassword: boolean = false;
  spinning = false;

  constructor(private fb: FormBuilder, private userService: UserService, private activateRoute: ActivatedRoute, private router: Router) {


  }
  ngOnInit() {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20), Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')]],
      remember_me: [false]
    });

  }
  get fc() {
    return this.loginForm.controls;
  }
  signin() {
    this.isloading = true;
    if (this.loginForm.invalid) {
      console.log("Invalid form");
      this.isLogggedIn = true;
      this.isError = true;
    }

    if (!this.isError) {
      this.userService.login({ email: this.fc['email'].value, password: this.fc['password'].value, remember_me: false }).subscribe(() => {
        this.isLogggedIn = true;
        this.isError = false;
        this.isloading = false;
        console.log("Login Success");
        this.router.navigate(['/']);
        //navigate to the return url after login
      });
    }

  }
  togglePasswordVisibility() {
    this.spinning = true;
    if (!this.showPassword) {
      setTimeout(() => {
        this.spinning = false;
        this.showPassword = !this.showPassword;
      }, 1000);
    } else {
      this.spinning = false;
      this.showPassword = !this.showPassword;
    }
  }
}