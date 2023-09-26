import { Component, OnInit, TemplateRef } from '@angular/core';
import { UserService } from '../Services/user.service';
import { User } from '../Models/User';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CompanyService } from '../Services/company.service';
import { Company } from '../Models/Company';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public formLogin!: FormGroup;
  public formEditUser!:FormGroup;

  constructor(private userService: UserService, 
    private modalService:BsModalService,
    private companyService: CompanyService,
    private formBuilder:FormBuilder){}

  modalRefDelete?: BsModalRef;
  modalRefEdit?: BsModalRef;
  users!:Array<User>;
  userAction!:User;
  companies!:Array<Company>;

  ModalDeleteUser(template: TemplateRef<any>, user:User){
    this.modalRefDelete = this.modalService.show(template);
    this.userAction = user;

  }

  ModalEditUser(template:TemplateRef<any>, user:User){
    this.userService.getUserById(user.id).subscribe(x =>{
    this.userAction = x.data;
    this.modalRefEdit = this.modalService.show(template);
    console.log("modal abriu");
    });
    

    this.userAction = user;
  }

  deleteUser(userId:number){
    
    var tokenAuth = localStorage.getItem('token');
    if(!tokenAuth){
      throw "Usuário sem permissão!"
    }

    this.userService.deleteUser(userId, tokenAuth).subscribe();
    var user = this.users.findIndex(x=> x.id == userId);
    this.users.splice(user);

  }


  editUser(user: User){
    console.log("chamou edit");
    
    var tokenAuth = localStorage.getItem('token');
    if(tokenAuth == null){
      throw "Usuário sem permissão!"
    } 
    
    this.userService.editUser(user,tokenAuth).subscribe();
    
    console.log(user);
  }

  ngOnInit(): void {

    this.formEditUser = this.formBuilder.group({
      name:['' , Validators.compose([
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

    });

    this.formEditUser.patchValue({
      name: this.userAction?.name
    })

    this.userService.listAllUsers().subscribe(x=>{
    this.users = x.data;
    });
    
    this.companyService.listCompanys().subscribe(x=>{
      this.companies = x.data;
    });
  }




}
