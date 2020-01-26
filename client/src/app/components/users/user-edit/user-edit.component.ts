import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { UploadService } from 'src/app/services/upload.service';
import { GLOBAL } from 'src/app/services/global';
import { NgxImageCompressService } from 'ngx-image-compress';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService, UploadService]
})
export class UserEditComponent implements OnInit {

  public title:string;
  public user:User;
  public identity;
  public token;
  public status:string;
  public url:string;

  constructor(
      private _route:ActivatedRoute,
      private _router:Router,
      private _userService:UserService,
      private _uploadService:UploadService,
      private _imageCompress: NgxImageCompressService
    ) { 
      this.title = 'Actualizar mis datos';
      this.user = _userService.getIdentity();
      this.token = _userService.getToken();
      this.identity = this.user;
     
      this.url = GLOBAL.url;
    }

    ngOnInit() {      
      this.status = 'success';
    }

    onSubmit(){
      // ACTUALIZAR IMAGEN DE USUARIO
      this._userService.updateUser(this.user).subscribe(
        response => {
        this.status = this.user ? 'success' : 'error';
        localStorage.setItem('identity',JSON.stringify(this.user));
        this.identity = this.user;

        // SUBIDA DE IMAGEN DE USUARIO
        this._uploadService.makeFileRequest(this.url+'upload-image-user/'+this.user._id,[],this.filesToUpload, this.token,'image')
        .then((result:any)=> {
          this.user.image = result.image;
          this.user = result.user;
          localStorage.setItem('identity',JSON.stringify(this.user));
        });
        },
        error => {
          let errorMessage = <any>error;
          console.log(error);
          this.status = 'error';
        }
      )
    }

    public filesToUpload:Array<File>;
    fileChangeEvent(fileInput:any){
      this.filesToUpload = <Array<File>>fileInput.target.files;
      console.log(this.filesToUpload);
    }
  }
