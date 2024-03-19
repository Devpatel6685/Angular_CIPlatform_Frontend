import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CustomCarouselComponent } from '../custom-carousel/custom-carousel.component';
import { CommonModule } from '@angular/common';
import { registrationForm } from '../../../models/user-formType.models';
import { CommonFunctionService } from '../../../services/Common-function.service';
import { Console } from 'console';
import { UserService } from '../../../services/user.service';
 
@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule,FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule, CustomCarouselComponent],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {

  registerForm: FormGroup<registrationForm> = new FormGroup<registrationForm>({
    firstName: new FormControl ("", [Validators.required]),
    lastName: new FormControl("", [Validators.required]),
    phoneNumber: new FormControl("", [Validators.required, Validators.pattern("[0-9 ]{10}")]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/)]),
    confirmPassword: new FormControl("", [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/)])
  });

  constructor(private fb: FormBuilder,
    private snackBar: MatSnackBar,
    public commonFunctionService:CommonFunctionService,
    private userservice:UserService
  ) { }
  
  public isUserExist:boolean = false;

  // checkEmail() {
  //   return (control.value || '').trim().length ? null : { 'whitespace': true };
  // }

  submit = (): void => {
    this.userservice.IsUserExist(this.registerForm.getRawValue().email).subscribe(res => {
      console.log(res);
      this.isUserExist = true;
    });
    this.isUserExist = true;
   
    if (this.registerForm.valid) {
      this.userservice.CreateUser(this.registerForm.getRawValue()).subscribe((res) => {
        if (res == null) {
          console.log('success')
        }
      });
    }
  }
}
