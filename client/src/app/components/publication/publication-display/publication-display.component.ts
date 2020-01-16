import { Component, OnInit, Input } from '@angular/core';
import { PublicationService } from 'src/app/services/publication.service';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-publication-display',
  templateUrl: './publication-display.component.html',
  styleUrls: ['./publication-display.component.css'],
  providers: [PublicationService,UserService]
})
export class PublicationDisplayComponent implements OnInit {
public identity: string;
public token: string;
public status: string
@Input()publication:string;
  constructor(
    private _userService:UserService,
    private _publicationService:PublicationService,
    private _route:ActivatedRoute
  ) { 
this.identity = this._userService.getIdentity();
this.token = this._userService.getToken();


  }
actualPublication(){
  this._route.params.subscribe(
    params=> {
     let id:string = params["id"]
        return this.getPublication(id);
    },
    error => {
      let errorMessage = <any>error
        console.log(errorMessage);
  
    }
  )
}
getPublication(id){
  this._publicationService.getPublication(this.token,id).subscribe(
    response => {
      if(response.publication)
      this.publication = response.publication;
      console.log(response.publication);
      this.status = "success"
    },
    error => {
      let errorMessage = <any>error;
        console.log(errorMessage);
    }
  )

}


  ngOnInit() {
this.actualPublication();
  }

}
