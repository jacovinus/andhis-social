import { Component, OnInit, DoCheck } from '@angular/core';
import { GLOBAL } from 'src/app/services/global';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Router,ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  providers: [UserService]
  
})
export class SidebarComponent implements OnInit, DoCheck {
public title;
public identity;
public user: User;
public token;
public stats;
public status;
public url;
public page;

  constructor(
    private _userService: UserService,
    private _router : Router,
    private _route: ActivatedRoute,
  
  ) { 
    this.title = 'Sidebar content';
    this.identity = _userService.getIdentity();
    this.stats = _userService.getStats();
    this.token = _userService.getToken();
    this.url = GLOBAL.url;
    this.user = _userService.getIdentity();
    
  }

  ngOnInit() {
  this._userService.getStats();
  }
  ngDoCheck(){
    this.stats = this._userService.getStats();
  }

}
