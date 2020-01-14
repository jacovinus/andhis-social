import { Component, OnInit, DoCheck, EventEmitter, Input, Output } from '@angular/core';
import { Publication } from 'src/app/models/publication';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { PublicationService } from 'src/app/services/publication.service';
import { FormGroup, FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UploadService } from 'src/app/services/upload.service';
import { GLOBAL } from 'src/app/services/global';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css'],
  providers: [UserService, PublicationService,UploadService]
})
export class PublicationComponent implements OnInit, DoCheck {
public identity;
public token;
public publication:Publication;
public status;
public stats;
public form:FormGroup;
public url;


@Output() sended = new EventEmitter();

  constructor(
    private _userService:UserService,
    private _publicationService:PublicationService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _uploadService : UploadService
    
  ) { 
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    this.stats = this._userService.getStats();
    this.url = GLOBAL.url;
    this.publication = new Publication('',this.identity._id,'','','','','','','');
  }

  ngOnInit() {
  }
  ngDoCheck(){
    
  }
  onSubmit(form){
    this._publicationService.addPublication(this.token, this.publication)
        .subscribe(
        response => {
          if(response.publication){
          this.publication = response.publication;
          if(this.filesToUplad && this.filesToUplad.length) {
            this._uploadService.makeFileRequest(this.url + 'publication/upload-image-pub/'+response.publication._id,[],this.filesToUplad,this.token,'image')
            .then((result:any) => {
              this.publication.file = result.image;
              
            });
          }
   
          this.status = 'success';
          form.reset();
          this._router.navigate(['/publications/1'])
          }
          else {
            console.log('Error al crear la publicacion');
            this.status='error';
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
  sendPublication(event) {
    this.sended.emit({send:'true'});
  
  }
  public filesToUplad: Array<File>;
  fileChangeEvent(fileInput:any){
  this.filesToUplad = <Array<File>>fileInput.target.files;
}

}
