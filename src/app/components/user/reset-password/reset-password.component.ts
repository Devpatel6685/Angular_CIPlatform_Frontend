import { Component, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CustomCarouselComponent } from '../custom-carousel/custom-carousel.component';
import { resetPasswordForm } from '../../../models/user-formType.models';
import { Subject, map, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CommonFunctionService } from '../../../services/Common-function.service';
import { UserService } from '../../../services/user.service';
import { ResetPasswordDTO } from '../../../models/user-models';
import { StatusCodes } from '../../../Common/constant';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    CustomCarouselComponent,
    CommonModule,
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent implements OnInit {
  private ngUnsubscribe = new Subject<void>();
  token: string = '';
  resetPasswordSuccess = false;
  message: string = '';

  resetPassForm: FormGroup<resetPasswordForm> =
    new FormGroup<resetPasswordForm>({
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/),
      ]),
    });

  constructor(
    private userService: UserService,
    public commonFunctionService: CommonFunctionService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  get ctrl(): resetPasswordForm {
    return this.resetPassForm.controls;
  }

  ngOnInit(): void {
    this.token = this.activatedRoute.snapshot.paramMap.get('token') as string;
  }

  checkpassword(){
    if(this.ctrl.password.value != this.ctrl.confirmPassword.value){
      this.ctrl.confirmPassword.setErrors({ invalid: true });
    }
  }

  submit = (): void => {
    if (this.resetPassForm.valid) {
      let obj: ResetPasswordDTO = {
        password: this.ctrl.password.value as string,
        token: this.token,
      };
      this.userService
        .ResetPassword(obj)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((result) => {
          this.message = result.messages ? result.messages[0] : this.message;
          if (result.code === StatusCodes.Ok) {
            this.resetPasswordSuccess = true;
            this.snackBar.open('Password reset Successfully', 'OK', { duration: 3000, horizontalPosition: 'right', verticalPosition: 'top' });
            this.redirectToUrl("/");
          } else {
            this.resetPasswordSuccess = false;
            this.snackBar.open('Password reset UnSuccessfull', 'OK', { duration: 3000, horizontalPosition: 'right', verticalPosition: 'top' });
          }
        });
    }
  };

  redirectToUrl(url: string) {
    this.router.navigate([url]);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
