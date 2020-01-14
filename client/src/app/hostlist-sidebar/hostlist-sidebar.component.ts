import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { HotlistService } from '../services/hotlist.service';
import { identity } from 'rxjs';
import { Hotlist } from '../models/hotlist';
import { Publication } from '../models/publication';

@Component({
  selector: 'app-hostlist-sidebar',
  templateUrl: './hostlist-sidebar.component.html',
  styleUrls: ['./hostlist-sidebar.component.css']
})
export class HostlistSidebarComponent implements OnInit {
public identity: any;
public token : string;
public hotslists: Hotlist[];
public publications: Publication[];

  constructor(
    private _userService: UserService,
    private _hotlistService: HotlistService,

  ) { 
    this.identity  = _userService.getIdentity();
    this.token = _userService.getToken();
  }
updateHotlists(token) {
  this._hotlistService.getHotlists(token)
}
  ngOnInit() {
    this.updateHotlists(this.token);
  }

}
