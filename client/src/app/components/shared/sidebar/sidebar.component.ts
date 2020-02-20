import { Component, OnInit, DoCheck } from '@angular/core';
import { GLOBAL } from 'src/app/services/global';
import { User } from 'src/app/models/user';
import { Router,ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [UserService]
  
})
export class SidebarComponent implements OnInit, DoCheck {
public title;
public identity;
public token;
public stats;
public status;
public url;
public page;
public followed;
public following;
public publications;
public user;

  constructor(
    private _userService: UserService,
    private _router : Router,
    private _route: ActivatedRoute,
  
  ) { 
    this.title = 'Sidebar content';
    this.identity = _userService.getIdentity();
    this.token = _userService.getToken();
    this.user = _userService.getUser(this.identity._id)
    this.url = GLOBAL.url;
    
  }

  ngOnInit() {
  this.loadPage();
  }
  ngDoCheck(){
  
  }

  loadPage(){
this.getCounters(this.identity._id)

  }


  getCounters(id){
    this._userService.getCounters(id).subscribe(
      response => {
      this.stats = response;
      this.followed = this.stats.followed;
      this.following = this.stats.following;
      this.publications = this.stats.publications;
      },
      error => {
        console.log(<any> error);
      }
    )
  }


}
