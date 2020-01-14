import { Component, OnInit } from "@angular/core";
import { Message } from "src/app/models/message";
import { GLOBAL } from "src/app/services/global";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { User } from "src/app/models/user";
import { UserService } from "src/app/services/user.service";
import { FollowService } from "src/app/services/follow.service";
import { Follow } from "src/app/models/follow";
import { FormGroup, FormsModule } from "@angular/forms";
import { MessageService } from "src/app/services/message.service";
//@TODO scrollspy conversations system
@Component({
  selector: "app-sent",
  templateUrl: "./sent.component.html",
  providers: [UserService, MessageService, FollowService]
})

export class SentComponent implements OnInit {
  public title;
  public identity;
  public url: string;
  public messages: Message[];
  public token;
  public status;
  public follows;
  public emitter;
  public receiver;
  public page;
  public next_page;
  public prev_page;
  public pages;
  public total;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _followService: FollowService,
    private _userService: UserService,
    private _messageService: MessageService
  ) {
    this.url = GLOBAL.url;
    this.title = "Mensajes enviados";
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
  }
  ngOnInit() {
    console.log("main.component cargado...");
    this.actualPage();
  }
  actualPage(){
    this._route.params.subscribe(params => {
      let page = +params.page;
      this.page = page;
      if(!this.page || params.page ==="undefined"){
        this.next_page = 2;
      } else {
        if(params.page ==="undefined") this.page = 1;
        this.next_page = page +1;
        this.prev_page = page -1;
        if(this.prev_page <= 0){
          this.prev_page = 1;
        }
      }
      // devolver listado de usuarios
      return this.getMessages(this.token,this.page);
          });
  }
  getMessages(token,page) {
    this._messageService.getMessagesSent(token, page).subscribe(
      response => {
        if (response.messages) {
          console.log(response.messages);
          this.messages = response.messages;
          this.pages = response.pages;
          this.total = response.total;
         
        }
      },
      error => {
        this.status = "error";
        console.log(<any>error);
      }
    );
  }
}
