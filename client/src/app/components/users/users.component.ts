import { Component, OnInit } from '@angular/core';
import { GLOBAL } from 'src/app/services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { FollowService } from 'src/app/services/follow.service';
import { Follow } from 'src/app/models/follow';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UserService, FollowService]
})
export class UsersComponent implements OnInit {
public title:string;
public identity;
public token;
public page;
public next_page;
public prev_page;
public status:string;
public total;
public pages;
public users:User[];
public url:string;
public follows;


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _followService: FollowService
    

  ) { 
    this.title = "Usuarios";
    this.identity = this._userService.getIdentity();
    this.url = GLOBAL.url;

  }

  ngOnInit() {
   this.actualPage();
  }
  actualPage(){
    this._route.params.subscribe(params => {
      let page = +params.page;
      this.page = page;
      if(!this.page || params.page ==="undefined"){
        this.next_page = 2;
      } else {
        if(params.page ==="undefined") this.page = 1;
        this.next_page = page +1;
        this.prev_page = page -1;
        if(this.prev_page <= 0){
          this.prev_page = 1;
        }
      }
      // devolver listado de usuarios
      return this.getUsers(page);
          });
  }

  // devolver listado de usuarios
  getUsers(page){
    this._userService.getUsers(page).subscribe(
      response=>{
      if(!response.users) {
      
        this.status = 'error';
      }else {
        this.total = response.total;
        this.users = response.users;
        this.pages = response.pages;
        this.follows = response.users_following;
        if(page > this.pages) {
          this._router.navigate(['/users',1]);
        }
      }
       },
      error => {
        let errorMessage = <any>error;
        console.log(errorMessage);
        if(errorMessage != null) {
          this.status = 'error';
        }
      }
    )
  }

  followUser(followed) {
    let follow = new Follow('',this.identity._id,followed);
    let token = this._followService.getToken();
    this._followService.addFollow(token,follow).subscribe(
      response => {
        if(!response.follow){
            this.status = 'error';
          }else {
            this.status ='success';
            this.follows.push(followed);
          }
      },
      error =>{
        let errorMessage = <any>error;
       console.log(errorMessage);
        if(errorMessage != null) {
          this.status = 'error';
        }
      }
    );

  }
  unFollowUser(followed) {
  this._followService.deleteFollow(this.token, followed).subscribe(
  response => {
    let search = this.follows.indexOf(followed);
    if(search != -1){
      this.follows.splice(search, 1);
    }


  },
  error =>{
    let errorMessage = <any>error;
   console.log(errorMessage);
    if(errorMessage != null) {
      this.status = 'error';
    }
  }

)
  }
}
