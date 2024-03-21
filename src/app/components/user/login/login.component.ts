import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CustomCarouselComponent } from '../custom-carousel/custom-carousel.component';
import { CommonFunctionService } from '../../../services/Common-function.service';
import { loginForm } from '../../../models/user-formType.models';
import { Router } from '@angular/router';    
import { Subject, takeUntil } from 'rxjs';
import { LoginDTO } from '../../../models/user-models';
import { UserService } from '../../../services/user.service';
import { RouterLink } from '@angular/router';
import { ok } from 'assert';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule, CustomCarouselComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private ngUnsubscribe = new Subject<void>();

  loginForm: FormGroup<loginForm> = new FormGroup<loginForm>({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', Validators.required)
  });

  constructor(
    private snackBar: MatSnackBar,
    public commonFunctionService:CommonFunctionService,
    private router: Router,
    private userService : UserService
  ) { }

  submit = (): void => {
    if (this.loginForm.valid) {
      const data: LoginDTO = { ...this.loginForm.value } as LoginDTO;
      this.userService.Login(data).pipe(takeUntil(this.ngUnsubscribe)).subscribe(result => {
        if (result.code == 200 && result.data != null) {
          this.snackBar.open('Login Successful', 'OK', { duration: 3000,horizontalPosition: 'right',verticalPosition: 'top'});
          sessionStorage.setItem("token", result.data.token);
          this.userService.isLoggedIn.next(true);
          this.userService.currentUser.next(result.data.data);
          localStorage.setItem("currentUser", JSON.stringify(result.data.data));
          this.redirectToUrl("/mission-listing");
        }
        else
        {
          this.snackBar.open('Invalid Credentials!', 'OK', { duration: 3000,horizontalPosition: 'right',verticalPosition: 'top'});
        }
      });
    }
  }

  redirectToUrl(url: string) {
    this.router.navigate([url]);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
