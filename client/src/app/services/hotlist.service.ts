import { Injectable } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { GLOBAL } from "./global";
import { Hotlist } from "../models/hotlist";
import { Hotlistitem } from "../models/hotlistitem";

/**
 * Metodos:
 * - addHotlist
 * - getHotlist
 * - deleteHotlist
 * - getToken
 */
@Injectable({
  providedIn: "root"
})
export class HotlistService {
  public url: string;
  public token: string;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  addHotList(token, hotlist): Observable<any> {
    let params = JSON.stringify(hotlist);
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", token);
    return this._http.post(this.url + "hotlist", params, { headers });
  }
  // @TODO -> terminar de enlazar hotlistitem con categoria
  addToHotlist(token, hotlistitem): Observable<any> {
    let params = JSON.stringify(hotlistitem);
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", token);
    return this._http.post(this.url + "hotlistitem", params, { headers });
  }

  getHotlist(token, id): Observable<any> {
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", token);
    return this._http.get(this.url + "hotlist/" + id, { headers });
  }

  deleteHotlist(token, id): Observable<any> {
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", token);
    return this._http.delete(this.url + "hotlist/" + id, { headers: headers });
  }

  getHotlists(token): Observable<any> {
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", token);
    return this._http.get(this.url + "hotlists", { headers });
  }
  getHotlistItems(token,hotlist):Observable<any> {
    let headers = new HttpHeaders()
    .set('Content-Type','application/json')
    .set('Authorization',token);
    return this._http.get(this.url+'hotlistitems/'+hotlist,{headers});
  }
  addHotlistItem(token, hotlistitem: Hotlistitem): Observable<any> {
    let params = JSON.stringify(hotlistitem);
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", token);
    return this._http.post(this.url + "hotlistitem", params, { headers });
  }
  
}
