import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginDTO, ResetPasswordDTO } from '../models/user-models';
import { ApiResponseDTO } from '../models/apiresponse-model';
import { baseAPIUrl, endPoint } from '../Common/constant';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  public isLoggedIn = new BehaviorSubject<boolean>(false);
  public currentUser = new BehaviorSubject<any>(null);
  
  constructor(private http: HttpClient) { }
  private url:string = "";
  
  CreateUser(model:any) {
    return this.http.post("https://localhost:7034/api/User/register",model);
  }
  
  IsUserExist(email:string | null){
    this.url = "https://localhost:7034/api/User/IsUserExist?email=" + email;
    return this.http.get(this.url);
  }

  Login(body: LoginDTO): Observable<ApiResponseDTO> {
    return this.http.post<ApiResponseDTO>(baseAPIUrl + endPoint.Login, body);
  }

  ForgotPassword(email: string | null | undefined): Observable<ApiResponseDTO> {
    return this.http.get<ApiResponseDTO>(baseAPIUrl + endPoint.ForgotPassword + "?email=" + email);
  }

  ResetPassword(body: ResetPasswordDTO): Observable<ApiResponseDTO> {
    return this.http.post<ApiResponseDTO>(baseAPIUrl + endPoint.ResetPassword, body);
  }

  public currentUserValue(): any {
    const user = localStorage.getItem('currentUser');
    if (user) {
      return JSON.parse(user);
    } else {
      return null;
    }
  }
}
