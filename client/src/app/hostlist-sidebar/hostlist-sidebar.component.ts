import { Component, OnInit, Input } from "@angular/core";
import { UserService } from "../services/user.service";
import { HotlistService } from "../services/hotlist.service";
import { Hotlist } from "../models/hotlist";
import { Publication } from "../models/publication";

@Component({
  selector: "app-hostlist-sidebar",
  templateUrl: "./hostlist-sidebar.component.html",
  styleUrls: ["./hostlist-sidebar.component.css"]
})
export class HostlistSidebarComponent implements OnInit {
  public identity: any;
  public token: string;
  public status: string;
  public hotlists: Hotlist[];
  public publications: Publication[];

  constructor(
    private _userService: UserService,
    private _hotlistService: HotlistService
  ) {
    this.identity = _userService.getIdentity();
    this.token = _userService.getToken();
  }
  getHotlists(adding = false) {
    this._hotlistService.getHotlists(this.token).subscribe(
      response => {
        this.hotlists = response.hotlists;
        console.log(this.hotlists);
        this.status = "success";
      },
      error => {
        let errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = "error";
        }
      }
    );
  }
  ngOnInit() {
    this.getHotlists();
    return this.hotlists;
  }
}
