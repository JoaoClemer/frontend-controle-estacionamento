import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { User } from '../Models/User';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
public formLogin!: FormGroup;
constructor (private authService: AuthService, private formBuilder: FormBuilder){}


  loginOrRegister:boolean = true;


  register(){
    this.loginOrRegister = !this.loginOrRegister;

  }

  login(username:string, passwordHash:string){
    var usuario = new User();
    usuario.username = username;
    usuario.passwordHash = passwordHash;
    this.authService.loginAuth(usuario).subscribe(x=>{console.log(x)}, erro => {console.log(erro)})


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
  }

}
