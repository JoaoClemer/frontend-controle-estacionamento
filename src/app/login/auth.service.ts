import { Injectable } from '@angular/core';
import { User } from '../Models/User';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  apiUrl:string = "https://localhost:7032/v1/Account/login";



  loginAuth(user:User) : Observable<any>{

    return this.http.post(`${this.apiUrl}`,{"username": user.username, "passwordHash": user.passwordHash});
  }


}
