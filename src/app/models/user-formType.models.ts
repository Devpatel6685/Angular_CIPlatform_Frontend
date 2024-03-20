import { FormControl } from '@angular/forms';

export type loginForm = {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
};

export type forgotPasswordForm = {
  email: FormControl<string | null>;
};

export type resetPasswordForm = {
  password: FormControl<string | null>;
  confirmPassword: FormControl<string | null>;
};

export type registrationForm = {
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  phoneNumber: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  confirmPassword: FormControl<string | null>;
};
