import { Component, OnInit, Input, NgModule } from "@angular/core";
import { Router } from '@angular/router';
import { Hotlist } from 'src/app/models/hotlist';
import { Hotlistitem } from 'src/app/models/hotlistitem';
import { HotlistService } from 'src/app/services/hotlist.service';
import { UserService } from 'src/app/services/user.service';
import { PublicationService } from 'src/app/services/publication.service';

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
    private _hotlistService: HotlistService,
    private _router: Router
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
          this._router.navigate(['/publications']);
        }
      },
      error => {
        let errorMessage = error;
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
        let errorMessage = error;
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
