import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { HotlistService } from "src/app/services/hotlist.service";
import { UserService } from "src/app/services/user.service";
import { Hotlistitem } from "src/app/models/hotlistitem";
import { Router } from "@angular/router";

@Component({
  selector: "app-hotlistitem",
  templateUrl: "./hotlistitem.component.html",
  styleUrls: ["./hotlistitem.component.css"],
  providers: [HotlistService, UserService]
})
export class HotlistitemComponent implements OnInit {
  public identity: string;
  public token: string;
  public publication;
  @Input() hotlist;
  public htcount: number;
  public hotlistitem;
  public hotlistitems: Hotlistitem[];

  constructor(
    private _hotlistService: HotlistService,
    private _userService: UserService,
    private _router: Router
    
  ) {
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    
  }
  getHotlistItems(hotlist) {
    this._hotlistService.getHotlistItems(this.token, hotlist).subscribe(
      response => {
        if (response.hotlistitems) {
  
          this.hotlistitems = response.hotlistitems;
          this.htcount = this.hotlistitems.length;
          console.log(this.htcount);
        }
      },
      error => {
        let errorMessage = <any>error;
        console.log(errorMessage);
      }
    );
  }

  ngOnInit() {
    this.getHotlistItems(this.hotlist);
  }
}
