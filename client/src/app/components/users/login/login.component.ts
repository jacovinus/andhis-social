import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ UserService ]
})

export class LoginComponent implements OnInit {
    public title:string;
    public user:User;
    public status:string;
    public identity;
    public token;
    constructor(
      private _route:ActivatedRoute,
      private _router:Router,
      private _userService:UserService
    ) {
        this.title = 'Login';
        this.user = new User('','','','','','','','','','','','');
      }
  
  ngOnInit() {
 
            }
  onSubmit(){
    // loguear al usuario y conseguir sus datos
      this._userService.login(this.user).subscribe(
        response => {
          this.identity = response.user;
          if(this.identity || this.identity._id)
          {
            this.status = 'success';
             // datos en local storage (persistir datos del usuario)
             localStorage.setItem('identity',JSON.stringify(this.identity));
             // get the token
             this.postToken();
          }else{
            this.status = 'error';
          }
        },
        error => {
          let errorMessage = <any>error;
          console.log(errorMessage);
          if(errorMessage != null){
          this.status = 'error';
          }
        }
      );
  }
  // crear token con la sesion del usuario
  postToken(){
    // loguear al usuario y conseguir sus datos
    this._userService.login(this.user, 'true').subscribe(
      response => {
        this.token = response.token;
        if(this.token.length <= 0){
          this.status = 'error';
        }else{
          this.status='succes';
          // `persistir el token del usuario
          localStorage.setItem('token',this.token);
          // Conseguir los contadores o estadisticas del usuario
          this.getTheCounters();
          this._router.navigate(['/']);
        }
          },
        error => {
          let errorMessage = <any>error;
          console.log(errorMessage);
          if(errorMessage){
          this.status = 'error';
          }
        }
      );
    }
    getTheCounters(){
      this._userService.getCounters().subscribe(
        response => {
          localStorage.setItem('stats', JSON.stringify(response));
          this.status = 'sucess';
          console.log(response);
        
        },
        error => {
        console.log(<any>error);
        }
      )
    }

}
