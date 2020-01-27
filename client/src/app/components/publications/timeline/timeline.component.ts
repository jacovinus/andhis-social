import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/models/user';
import { Publication } from 'src/app/models/publication';
import { PublicationService } from 'src/app/services/publication.service';
import { UserService } from 'src/app/services/user.service';
import { GLOBAL } from 'src/app/services/global';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css'],
  providers: [UserService, PublicationService]
})

export class TimelineComponent implements OnInit {

  public identity;
  public token;
  public url;
  public title;
  public stats;
  public status;
  public total;
  public pages;
  public page;
  public next_page;
  public prev_page;
  public itemsPerPage;
  public showImage;
  public likes;
  public following;
  public followed;
  public user:User;
  public publications:Publication[];

  constructor(
    private _route : ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _publicationService: PublicationService
  ) { 
    this.url = GLOBAL.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.stats = this._userService.getStats();
    
    
    this.title = 'Timeline';
  }
  ngOnInit() {
    if(this.identity){
      this.actualPage();
      this.getTimeline(this.page);
    }
 
  }
  getTimeline(page, adding = false){
    this._publicationService.getPublications(this.token, page).subscribe(
      response => {
        if(!response.publications) {
          this.status = 'error';
        }else{
          this.total = response.total_pages;
          this.status = 'succes';
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
            this._router.navigate(['/publications/',1]);
          }
        }
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
  actualPage(){
    this._route.params.subscribe(params =>{
      let page = +params.page;
      this.page = page;
      if(!this.page || params.page === undefined){
        this.next_page = 2;
        this.page = 1;
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
      // devolver listado de publicaciones()
      return this.getTimeline(this.page);
    });
  }
  deletePublication(id){
    this._publicationService.deletePublication(this.token,id).subscribe(
      response => {
        this.getTimeline(1);
      },
      error =>{
        console.log(<any>error)
      }
    )
  }
  likePublication(id){
    console.log('i like this publication')
  }
  public noMore = false;
  viewMore(){
    this.page +=1;
    if(this.page == this.total) {
      this.noMore = true;
    } else {
      this.page +=1
    }
    this.getTimeline(this.page,true)
  }

  refreshTimeline(event){
    this.getTimeline(1);
  }

}
