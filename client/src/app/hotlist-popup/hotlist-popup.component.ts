import { Component, OnInit, Input, NgModule } from "@angular/core";
import { PublicationService } from "../services/publication.service";
import { UserService } from "../services/user.service";
import { HotlistService } from "../services/hotlist.service";
import { Hotlistitem } from "../models/hotlistitem";
import { Hotlist } from "../models/hotlist";
import { NgModel } from "@angular/forms";
@Component({
  selector: "app-hotlist-popup",
  templateUrl: "./hotlist-popup.component.html",
  styleUrls: ["./hotlist-popup.component.css"],
  providers: [PublicationService, UserService, HotlistService]
})
export class HotlistPopupComponent implements OnInit {
  public token;
  public identity: string;
  @Input() publication;
  public hotlistitem;
  public list: Hotlist[];
  public listItem: string;
  public status;
  public user;

  constructor(
    private _userService: UserService,
    private _publicationService: PublicationService,
    private _hotlistService: HotlistService
  ) {
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    this.hotlistitem = new Hotlistitem("", "", "", "", "");
  }
  addHotlistItem(list, publication) {
    this.hotlistitem = {
      list: this.listItem,
      user: this.identity,
      publication: this.publication
    };
    this._hotlistService.addHotlistItem(this.token, this.hotlistitem).subscribe(
      response => {
        if (response.hotlistitem) {
          this.hotlistitem = response.hotlistitem;
          this.status = "success";
        }
      },
      error => {
        let errorMessage = <any>error;
        console.log(errorMessage);
        this.status = "error";
      }
    );
  }

  getList() {
    this._hotlistService.getHotlists(this.token).subscribe(
      response => {
        if (response) {
          this.list = response.hotlists;
        }
      },
      error => {
        let errorMessage = <any>error;
        console.log(errorMessage);
        this.status = "error";
      }
    );
  }

  hotlistSelector(event: any) {
    this.listItem = event.target.value;
  }

  ngOnInit() {
    this.getList();
  }
}
