import { Component, OnInit, Input } from '@angular/core';
import { Publication } from 'src/app/models/publication';
import { PublicationService } from 'src/app/services/publication.service';
import { UserService } from 'src/app/services/user.service';
import { GLOBAL } from 'src/app/services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/models/user';
import { Like } from 'src/app/models/like';
import { Follow } from 'src/app/models/follow';
import { FollowService } from 'src/app/services/follow.service';
import { LikeService } from 'src/app/services/like.service';
import { Observable } from 'rxjs';

// @ TODO revisar bug de getImageUser (ERROR 500)
 //@TODO : volver a listar publicaciones en pagina de timeline
@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css'],
  providers: [UserService,PublicationService, LikeService]
})
export class PublicationsComponent implements OnInit {

  public identity;
  public token;
  public url;
  public stats;
  public status;
  public publications: Publication[];
  public title;
  public total;
  public pages;
  public page;
  public next_page;
  public prev_page;
  public likes;
  public itemsPerPage;
  public showImage;
  @Input() user:string;


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _publicationService: PublicationService,
    private _likeService: LikeService
  ) { 
    this.url = GLOBAL.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.title = 'publications';
  }


  ngOnInit() {
    this.actualPage();
    this.getPublications(this.user, this.page);
  }

  getPublications(user, page, adding = false){
   
    this._publicationService.getUserPublications(this.token,user,page).subscribe(
      response => {
        if(!response.publications) {
         this.status = 'error';
        }else{
          this.total = response.total_pages;
          this.status = 'success';
          this.pages = response.pages;
          this.likes = response.users_liking;
          this.itemsPerPage = response.items_per_page;
          if(!adding){
            this.publications = response.publications;
          }else{
          let arrayA = this.publications;
          let arrayB = response.publications;
          this.publications = arrayA.concat(arrayB);
          $('html, body').animate({scrollTop:$('html').prop('scrollHeight')},500);
                  }
                  this.total = response.total_items;
                  if(page > this.pages){
                    this._router.navigate(['/publications',this.user,'/',1]);
                  }
        }
    },
    error => {
    let errorMessage = error;
    console.log(errorMessage);
    if(errorMessage != null){
      this.status = 'error';
    }
    
    }
  )
}

actualPage(){
  this._route.params.subscribe(params => {
    let page = +params.page;
    this.page = page;
  
    if(!this.page || params.page ===undefined){
      this.next_page = 2;
      this.page=1;
      page = 1;
    } else {
      if(params.page ==="undefined") 
      this.page = 1;
      this.next_page = page +1;
      this.prev_page = page -1;
      if(this.prev_page <= 0){
        this.prev_page = 1;
      }
    }
    // devolver listado de publicaciones
    return this.getPublications(this.user,this.page);
        })
}

public noMore = false;
viewMore(){
  this.page +=1
if(this.page == this.total){
this.noMore = true;

}else{
  this.page += 1;
}
this.getPublications(this.user,this.page,true);
}

refreshPublications(event){
  this.getPublications(this.user,1);
  //console.log(event);
   }

likePublication(liked) {
  let like = new Like('',this.identity._id,liked,'');
  let token = this.token;
  this._likeService.addLike(token,like).subscribe(
    response => {
      if(!response.like){
        this.status = 'error';
      }else{
        this.status = 'success';
        this.likes.push(liked);
      }
    },
    error => {
      let errorMessage = error;
      console.log(errorMessage);
      if(errorMessage != null) {
        this.status = 'error';
      }
    }
  );

}
unLikePublication(liked) {
  this._likeService.deleteLike(this.token, liked).subscribe(
    response =>{
      let search = this.likes.indexOf(liked);
      if(search != -1){
        this.likes.splice(search, 1);
      }
    },
    error => {
      let errorMessage = error;
      console.log(errorMessage);
      if(errorMessage!= null) {
        this.status = 'error';
      }
    }
  )
}
showThisImage(id){
this.showImage = id;
}
hideThisImage(id){
  this.showImage = 0;
}

}
