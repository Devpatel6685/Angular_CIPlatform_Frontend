import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CommonFunctionService {

  constructor() { }
  
  controlValidity(formGroup: FormGroup, controlName: string) :boolean{
    if(formGroup.get(controlName)?.invalid || formGroup.get(controlName)?.touched){
      return true;
    }else{
      return false;
    }
  }

  getErrorMessage(formGroup: FormGroup, formField: string, controlName: string) : string {
    const control = formGroup.get(formField);

    if (control?.hasError('required')) {
      return `${controlName} is required.`;
    }

    if (control?.hasError('pattern')) {
      return 'Invalid format. Password must contain at least one uppercase letter and one digit.';
    }

    if (control?.hasError('minlength')) {
      if(formField == 'phoneNumber'){
        return `${controlName} must be at least 10 digits long.`;
      }else{
        return `${controlName} must be at least 8 characters long.`;
      }
    }

    if (control?.hasError('maxlength')) {
      return 'Cannot exceed 10 digits.';
    }

    if (control?.hasError('email')) {
      return 'Please enter valid Email.';
    }
    return '';
  }
}
