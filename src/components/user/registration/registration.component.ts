import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CustomCarouselComponent } from '../custom-carousel/custom-carousel.component';
import { registrationForm } from '../../../models/user-formType.models';
import { CommonFunctionService } from '../../../services/Common-function.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule, CustomCarouselComponent],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {

  registerForm: FormGroup<registrationForm> = new FormGroup<registrationForm>({
    firstName: new FormControl ("", [Validators.required]),
    lastName: new FormControl("", [Validators.required]),
    phoneNumber: new FormControl("", [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/)]),
    confirmPassword: new FormControl("", [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/)])
  });

  constructor(private fb: FormBuilder,
    private snackBar: MatSnackBar,
    public commonFunctionService:CommonFunctionService,
  ) { }

  submit = (): void => {

  }
}
