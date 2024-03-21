import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CustomCarouselComponent } from '../custom-carousel/custom-carousel.component';
import { forgotPasswordForm } from '../../../models/user-formType.models';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CommonFunctionService } from '../../../services/Common-function.service';
import { UserService } from '../../../services/user.service';
import { StatusCodes } from '../../../Common/constant';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [RouterLink,FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule, CustomCarouselComponent, CommonModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

  private ngUnsubscribe = new Subject<void>();
  forgotPasswordSuccess = false;
  message: string = "";

  forgotPassForm: FormGroup<forgotPasswordForm> = new FormGroup<forgotPasswordForm>({
    email: new FormControl("", [Validators.required, Validators.email]),
  });

  constructor(public commonFunctionService:CommonFunctionService, private router: Router,private userService : UserService, private snackBar: MatSnackBar) { }

  submit = (): void => {
    if (this.forgotPassForm.valid) {
      this.userService.ForgotPassword(this.forgotPassForm.get("email")?.value).pipe(takeUntil(this.ngUnsubscribe)).subscribe(result => {
        this.message = (result.messages) ? result.messages[0] : this.message;
        if (result.code === StatusCodes.Ok) {
          this.forgotPasswordSuccess = true;
          this.snackBar.open('Email Sent', 'OK', { duration: 3000,horizontalPosition: 'right',verticalPosition: 'top'});
          this.router.navigate(["/"]);
        } else {
          this.forgotPasswordSuccess = false;
          this.snackBar.open('Failed', 'OK', { duration: 3000,horizontalPosition: 'right',verticalPosition: 'top'});
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
