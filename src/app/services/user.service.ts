import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) { }
  private url:string = "";
  // private url = 'https://localhost:7057/user/getuser';

  // GetAllUser() {
  //   return this.http.get<registrationForm[]>(this.url);
  // }

  // onClickedUserDetails: EventEmitter<User> = new EventEmitter<User>();

  // OnShowUserDetail(user: User){
  //   this.onClickedUserDetails.emit(user);
  // }

  CreateUser(model:any) {
    return this.http.post("https://localhost:7034/api/User/User/register",model);
  }
  
  IsUserExist(email:string | null){
    this.url = "https://localhost:7034/api/User/User/IsUserExist?email=" + email;
    return this.http.get(this.url);
  }

}
