import { Injectable } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { GLOBAL } from "./global";
import { Publication } from "../models/publication";
/**
 * Metodos:
 * - addPublication
 * - getPublications
 * - deletePublication
 */

@Injectable({
  providedIn: "root"
})
export class PublicationService {
  public url;
  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }
  addPublication(token, publication): Observable<any> {
    let params = JSON.stringify(publication);
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", token);
    return this._http.post(this.url + "publication", params, { headers });
  }
  // @TODO agregar 'user a link de publicaciones'
  getPublications(token, page): Observable<any> {
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", token);
    return this._http.get(this.url + "publications/" + page, { headers });
  }
  getUserPublications(token, userId, page): Observable<any> {
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", token);
    return this._http.get(this.url + "publications/" + userId + "/" + page, {
      headers
    });
  }

  getPublication(token:string,id:string):Observable<any>{
let headers =  new HttpHeaders()
.set("Content-Type", "application/json")
.set("Authorization",token);
return this._http.get(this.url+"publication/"+id,{headers});
  }
  deletePublication(token, id): Observable<any> {
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", token);
    return this._http.delete(this.url + "publication/" + id, { headers });
  }
}
