import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../Models/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  apiUrl:string = "https://localhost:7032/v1/User";


  registerUser(user:User):Observable<any>
  {

    return this.http.post(`${this.apiUrl}`,{
      "name": user.name,
      "username": user.username,
      "passwordHash": user.passwordHash,
      "companyId": user.companyId,
      "role": user.role
    });
  }
}
