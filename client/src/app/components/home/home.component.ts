import { Component, OnInit, DoCheck } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { GLOBAL } from 'src/app/services/global';
import { PublicationService } from 'src/app/services/publication.service';
import { FollowService } from 'src/app/services/follow.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UserService]
})
export class HomeComponent implements OnInit, DoCheck {
public title:string;
public identity;
public url;
public stats;
public user:User;
public publications;
  constructor(
    private _userService:UserService,
  ) { 
    this.title = 'Bienveido a Andhis'
    this.identity = this._userService.getIdentity();
   this.url = GLOBAL.url;
   this.user = _userService.getIdentity();
  
  }
  ngOnInit() {
  }
  // Check if logged user is active
  ngDoCheck(){
    this.identity = this._userService.getIdentity();
    this.stats = this._userService.getStats();

    
  }

}
