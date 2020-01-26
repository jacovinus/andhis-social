import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FollowService } from 'src/app/services/follow.service';
import { GLOBAL } from 'src/app/services/global';
import { UserService } from 'src/app/services/user.service';
import { Follow } from 'src/app/models/follow';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [FollowService, UserService]
})
export class ProfileComponent implements OnInit {
public token;
public identity;
public stats;
public status;
public url;
public follow;
public following;
public followed;
public user;
public id;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _followService: FollowService,
    private _userService: UserService,
  ) { 
    this.url = GLOBAL.url;
    this.identity = _userService.getIdentity();
    this.token = _userService.getToken();
    this.stats = _userService.getStats(); 
  }



  loadPage(){
    this._route.params.subscribe(params=>{
      let id = params['id'];
      this.getUser(id);
      this.getCounters(id);

    })
  }
  getUser(id){
    this._userService.getUser(id).subscribe(
          response => {
    if(response.user){
    this.user = response.user;
    this.id = response.user._id;
    if(response.following && response.following._id){
      this.following = true;
    }else{
      this.following = false;
    }
  if(response.followed && response.followed._id){
    this.followed = true;
  }else{
    this.followed = false;
  }

    }else{
      this.stats = 'error';
    }
      },
      error => {
        console.log(<any>error);
        this._router.navigate(['/profile',this.identity._id]);
      }
    )
  }
  getCounters(id){
    this._userService.getCounters(id).subscribe(
      response => {
      this.stats = response;
      },
      error => {
        console.log(<any> error);
      }
    )
  }
  followUser(followed){
    let follow = new Follow('',this.identity._id,followed);
    this._followService.addFollow(this.token, follow).subscribe(
      response => {
      this.following = true;
      },
      error => {
        let ErrorMessage = <any>error;
      console.log(<any>error);
      }
    );
  }
  unfollowUser(followed){
    this._followService.deleteFollow(this.token, followed).subscribe(
      response => {
      this.following = false;
      },
      error => {
      console.log(<any>error);
      }
    );
    
  }
  public followUserOver;
  mouseEnter(user_id){
    this.followUserOver = user_id;
  }
  mouseLeave(user_id){
    this.followUserOver = 0;
  }

  ngOnInit() {
    this.loadPage();
  }
  }
