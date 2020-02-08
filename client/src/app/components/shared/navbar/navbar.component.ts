import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { GLOBAL } from 'src/app/services/global';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})

export class NavbarComponent implements OnInit {
  @Input()identity:any;
  url:string;
  constructor(private _router:Router) { 
    this.url = GLOBAL.url;
  }
  ngOnInit() {
  }

  logout() {
    localStorage.clear();
    this.identity = null;
    this._router.navigate(["/"]);
  }
}

