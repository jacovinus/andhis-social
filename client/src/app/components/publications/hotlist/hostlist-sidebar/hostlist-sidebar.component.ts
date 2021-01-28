import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { UserService } from 'src/app/services/user.service';
import { HotlistService } from 'src/app/services/hotlist.service';
import { Hotlist } from 'src/app/models/hotlist';
import { Publication } from 'src/app/models/publication';
import { GLOBAL } from 'src/app/services/global';
@Component({
  selector: "app-hostlist-sidebar",
  templateUrl: "./hostlist-sidebar.component.html",
  styleUrls: ["./hostlist-sidebar.component.css"]
})

export class HostlistSidebarComponent implements OnInit {
  public identity: any;
  public token: string;
  public status: string;
  public hotlistCount: number;
  public hotlists: Hotlist[];
  public publications: Publication[];
  public url:string;
@ViewChild('htcount')htcount;
  constructor(
    private _userService: UserService,
    private _hotlistService: HotlistService
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
   

  }

  getHotlists(adding = false) {
    this._hotlistService.getHotlists(this.token).subscribe(
      response => {
        this.hotlists = response.hotlists;
        this.hotlistCount = this.hotlists.length;
        
        this.status = "success";
      },
      error => {
        let errorMessage = error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = "error"
        }
      }
    );
  }
  ngOnInit() {
    this.getHotlists();
    return this.hotlists;
  }
}
