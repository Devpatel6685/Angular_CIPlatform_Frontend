import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserService } from '../user.service';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  let isLoggedIn: boolean = false;
  inject(UserService).isLoggedIn.subscribe(res => {
    isLoggedIn = res;
  });
  let token = sessionStorage.getItem("token");
  if (isLoggedIn) {
    const modifiedHeader = req.clone({ setHeaders: { 'Authorization': 'Bearer ' + token as string } });
    return next(modifiedHeader);
  }
  else {
    return next(req);
  }
};
  