import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { Router, RouterModule } from '@angular/router';
import { DefaultButtonComponent } from "../default-button/default-button.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PasswordValidator } from '../shared/validators/password_match_validator';
import { IUserRegister } from '../shared/interfaces/IUserRegister';
import { InputValidationComponent } from "../input-validation/input-validation.component";
import { CommonModule, NgClass } from '@angular/common';
import * as L from 'leaflet';
import 'leaflet-control-geocoder';
import { MapComponent } from "../map/map.component";
import { LoadingScreenComponent } from "../loading-screen/loading-screen.component";
@Component({
  selector: 'app-register-page',
  imports: [DefaultButtonComponent, ReactiveFormsModule, FormsModule, RouterModule, InputValidationComponent, CommonModule, LoadingScreenComponent],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent implements OnInit {
  registerForm!: FormGroup;
  clickAudio = new Audio();
  isSubmit: boolean = false;
  isError: boolean = false;
  showPassword: boolean = false;
  selectedFile: File | null = null;
  isloading: boolean = false;
  constructor(private userService: UserService, private router: Router, private fb: FormBuilder) {
    this.clickAudio.src = 'assets/sound/byakuganSound.mp3';
    this.clickAudio.load();
  }
  ngOnInit(): void {

    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100), Validators.pattern('^[a-zA-Z ]*$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20), Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20), Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')]],
      phone: ['', [Validators.required, Validators.pattern('^09[1-9][0-9]{6,8}$')]],
      profile_pic: [null]
    }
      //Will PasswordValidator('password', 'confirmPassword') be executed if confirmPassword has a required error?
      // Yes, it will still be executed — because it's a form-level validator, not a field-level one.
      , {
        validators: PasswordValidator('password', 'confirmPassword')
      });
    //Form-level validators like your custom PasswordValidator run on the entire form group, no matter what errors exist in individual fields.

  }
  get fc() {
    return this.registerForm.controls;
  }


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
    }
  }
  submit() {
    this.isloading = true;
    this.isSubmit = true;
    this.isError = false;
    if (this.registerForm.invalid) {
      console.log("Invalid form");
      this.isError = true;
      this.isloading = false;
      return;
    }

    if (!this.isError) {
      const registerFormValue = this.registerForm.value;
      console.log("Form Value", registerFormValue);
      const newUser: IUserRegister = {
        name: registerFormValue.name,
        email: registerFormValue.email,
        password: registerFormValue.password,
        phone: registerFormValue.phone,
        profileImage: this.selectedFile ?? undefined
      }
      const formData = new FormData();
      formData.append('name', newUser.name);
      formData.append('email', newUser.email);
      formData.append('password', newUser.password);
      formData.append('phone', newUser.phone);

      // If profile image exists, append it to FormData
      if (newUser.profileImage) {
        formData.append('profile_pic', newUser.profileImage); // Send the image file (this is the file you want to save)
      }
      // Use tap() when:
      // You want to show a toast
      // Log for debugging
      // Trigger side - effects without changing the data
      // Use subscribe() when:
      // You want to actually do something with the result(like navigating, storing it, updating UI)
      this.userService.register(formData).subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
          this.isloading = false;
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Registration failed:', error);
          this.isloading = false;

        }

      });
    }
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    const confirmPasswordInput = document.getElementById('confirmpassword') as HTMLInputElement;
    this.clickAudio.currentTime = 0; // reset sound to start if playing
    this.clickAudio.play();
    if (this.showPassword) {
      passwordInput.type = 'text';
      confirmPasswordInput.type = 'text'; // Show password
    } else {
      passwordInput.type = 'password';
      confirmPasswordInput.type = 'password'; // Hide password
    }
  }

}
