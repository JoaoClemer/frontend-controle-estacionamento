import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  listAllUsers():Observable<any>{
    return this.http.get(this.apiUrl);
  }

  deleteUser(userId:number, token:string|null):Observable<any>
  {
    var headers = new HttpHeaders({
      "Authorization":`Bearer ${token}`
    });

    return this.http.delete(`${this.apiUrl}/${userId}`,{headers: headers});
  }
}
