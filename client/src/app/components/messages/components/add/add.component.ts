import { Component, OnInit } from "@angular/core";
import { GLOBAL } from "src/app/services/global";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { User } from "src/app/models/user";
import { UserService } from "src/app/services/user.service";
import { FollowService } from "src/app/services/follow.service";
import { Follow } from "src/app/models/follow";
import { Message } from "src/app/models/message";
import { FormGroup, FormsModule } from "@angular/forms";
import { MessageService } from "src/app/services/message.service";

@Component({
  selector: "app-add",
  templateUrl: "./add.component.html",
  providers: [FollowService, MessageService, UserService]
})
export class AddComponent implements OnInit {
  public title: string;
  public message: Message;
  public identity;
  public url: string;
  public token;
  public status;
  public follows;
  public form:FormGroup;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _followService: FollowService,
    private _userService: UserService,
    private _messageService: MessageService
  ) {
    this.title = "Enviar mensajes";
    this.url = GLOBAL.url;
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    this.follows = 0;
    this.message = new Message("", this.identity._id, "", "", "", "");
  }
  ngOnInit() {
    console.log("add.component cargado...");
    this.getMyFollows();
  }
  getMyFollows() {
    this._followService.getMyFollows(this.token).subscribe(
      response => {
        if(response.follows < 0){
          this.follows = response.follows;
        }
        
         else{
           console.log('nobody is following you')
         }
      },
      error => {
        console.log(error);
      }
    );
  }
  onSubmit(form){
      this._messageService.addMessage(this.token,this.message).subscribe(
          response=>{
if(response.message){
    this.status="success";
    form.reset();
}
          },
          error=>{
            this.status='error';
            console.log(<any>error);
          }
      )
  }
}
