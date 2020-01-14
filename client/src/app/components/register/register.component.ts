import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [ UserService ]
})
export class RegisterComponent implements OnInit {
public title:string;
public user:User
public status:string;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService:UserService
  ) { 
    // initiates the new user with a mock profile image
    this.title = 'Ingresa tus datos y Registrate';
    this.user = new User('','','','','','','','','','','','','');
  }

ngOnInit() {}
// acciones al registrar los datos del usuario
onSubmit(form) {
  this._userService.register(this.user).subscribe(
    response => {
      if(response.user && response.user._id) {
          this.status = 'success';
          form.reset();
        }else{
      this.status = 'error';
    }
      },
    error => {
      console.log(<any>error);
    });
    }
  }
