import { Component, OnInit, DoCheck } from '@angular/core';
import { Hotlist } from 'src/app/models/hotlist';
import { UserService } from 'src/app/services/user.service';
import { HotlistService } from 'src/app/services/hotlist.service';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Route} from '@angular/router';


@Component({
  selector: 'app-hotlist',
  templateUrl: './hotlist.component.html',
  styleUrls: ['./hotlist.component.css'],
  providers: [UserService, HotlistService]
})
export class HotlistComponent implements OnInit, DoCheck {
public identity;
public token;
public hotlist:Hotlist;
public status;
public hotlists:Hotlist[];
public form:FormGroup;
public title:string;

  constructor(
    private _userService:UserService,
    private _hotlistService:HotlistService,
    private _route : ActivatedRoute,
    private _router : Router
  ) { 
    this.title = 'Hotlist';
    this.identity = _userService.getIdentity();
    this.token = _userService.getToken();
    this.hotlist = new Hotlist('','','','',this.identity._id);
  }
  ngOnInit() {
    this.getHotlists(this.token);
  }
getHotlists(adding = false){
  this._hotlistService.getHotlists(this.token).subscribe(
    response => {
          this.hotlists = response.hotlists;
          this.status = "success"
    },
    error => {
      let errorMessage = <any>error;
      console.log(errorMessage);
      if(errorMessage != null) {
        this.status = 'error';
      }
    }
  )
}


onSubmit(form){
  this._hotlistService.addHotList(this._userService.getToken(),this.hotlist)
  .subscribe(
    response => {
      if(response.hotlist){
        this.hotlist = response.hotlist;
        this.status = 'success';
        form.reset();
      }
      else {
        console.log('Error al crear el Hotlist');
        this.status = 'error';
      }
    },
    error =>{
      let errorMessage = <any>error;
      console.log(errorMessage);
      if(errorMessage != null) {
        this.status = 'error';
      }
    }
  )
}
//@TODO delete hotlist
deleteHotlist(){
 this._hotlistService.deleteHotlist(this._userService.getToken(),this.hotlist._id)
  .subscribe(
    response => {
      let search = this.hotlists.indexOf(this.hotlist);
      if(search != -1){
        this.hotlists.splice(search, 1); 
    }
},
error => {
let errorMessage = <any>error;
console.log(errorMessage);
if(errorMessage != null){
  this.status = 'error';
    }
  }
  )
  
} 

ngDoCheck(){}

}
