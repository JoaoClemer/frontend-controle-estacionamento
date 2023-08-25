import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { User } from '../Models/User';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../Services/user.service';
import { CompanyService } from '../Services/company.service';
import { Observable } from 'rxjs';
import { Company } from '../Models/Company';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
public formLogin!: FormGroup;
public formRegister!:FormGroup;
constructor (private authService: AuthService, 
  private formBuilder: FormBuilder, 
  private router:Router,
  private userService:UserService,
  private companyService: CompanyService){}


  loginOrRegister:boolean = true;
  companies!:Array<any>;


  loginOrRegisterMode(){
    this.loginOrRegister = !this.loginOrRegister;

  }

  login(username:string, passwordHash:string){
    var user = new User();
    user.username = username;
    user.passwordHash = passwordHash;
    this.authService.loginAuth(user).subscribe(x=>{
      var token = x.data;

      localStorage.setItem("token",token);
      //console.log(localStorage.getItem("token"));
      this.router.navigate(['']);
    },
    error =>{
      console.log(error);
    })
  }

  register(name:string, username:string, password:string,role:string,company:string){
    var user = new User();
    user.username = username;
    user.name = name;
    user.passwordHash = password;
    user.role = Number(role);
    user.companyId = Number(company);

    this.userService.registerUser(user).subscribe(x=>{
      console.log(x);
      this.router.navigate(['']);
    },
    error =>{
      console.log(error)
    })
  }

  ngOnInit(): void {
    
    this.formLogin = this.formBuilder.group({
      username:['', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])],
      password:['', Validators.compose([
        Validators.minLength(3),
        Validators.required
      ])]
    });
  
    this.formRegister = this.formBuilder.group({
      name:['', Validators.compose([
        Validators.required,
        Validators.maxLength(80)
      ])],
      username:['',Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])],
      password:['',Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])],
      role:['', Validators.required],
      companyId:['',Validators.required]

    })

    this.companyService.listCompanys().subscribe(x=>{
      this.companies = x.data;
    });
  
  }

}
