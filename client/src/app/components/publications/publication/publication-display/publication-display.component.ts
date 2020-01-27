import { Component, OnInit, Input } from "@angular/core";
import { PublicationService } from "src/app/services/publication.service";
import { UserService } from "src/app/services/user.service";
import { Router, ActivatedRoute } from "@angular/router";
import { GLOBAL } from "src/app/services/global";
import { TextPreviewPipe } from './text-preview.pipe';
import { User } from 'src/app/models/user';

@Component({
  selector: "app-publication-display",
  templateUrl: "./publication-display.component.html",
  styleUrls: ["./publication-display.component.css"],
  providers: [PublicationService, UserService, TextPreviewPipe]
})
export class PublicationDisplayComponent implements OnInit {
  public identity;
  public token: string;
  public status: string;
  public user;
  public url: string;
  public publication;
  public publicationuser;
  constructor(
    private _userService: UserService,
    private _publicationService: PublicationService,
    private _route: ActivatedRoute
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.publication = {}
    this.user= {};
  }
  actualPublication() {
    this._route.params.subscribe(
      params => {
        let id: string = params["id"];
        return this.getPublication(id);
      },
      error => {
        let errorMessage = <any>error;
        console.log(errorMessage);
      }
    );
  }
  getPublication(id) {
    this._publicationService.getPublication(this.token, id).subscribe(
      response => {
        if (response.publication) {
          this.publication = response.publication
         return this.getPublicationUser(this.publication.user);
        
        }
        this.status = "success";
      },
      error => {
        let errorMessage = <any>error;
        console.log(errorMessage);
      }
    );
  }

  getPublicationUser(id){
    return this._userService.getUser(id).subscribe(
      response=> {
        if(response){
         this.user = response.user;
        }
      }
    )
  }
  ngOnInit() {
    this.actualPublication();
  }
}
