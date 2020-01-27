import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { GLOBAL } from "./global";
import { User } from "../models/user";
import { Follow } from "../models/follow";
import { catchError, map, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class FollowService {
  public url: string;
  public token: string;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  // obtener el token del localstorage
  getToken() {
    let token = localStorage.getItem("token");
    this.token = token != "undefined" ? token : null;
    return this.token;
  }
  addFollow(token, follow): Observable<any> {
    let params = JSON.stringify(follow);
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", token);
    return this._http.post(this.url + "follow", params, { headers: headers });
  }
  deleteFollow(token, id): Observable<any> {
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", this.getToken());
    return this._http.delete(this.url + "follow/" + id, { headers: headers });
  }
  getFollowing(token, userId = null, page = 1): Observable<any> {
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", this.getToken());
    let url =
      userId != null
        ? this.url + "following/" + userId + "/" + page
        : this.url + "following";
    return this._http.get(url, { headers: headers });
  }
  getFollowed(token, userId = null, page = 1): Observable<any> {
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", this.getToken());
    let url =
      userId != null
        ? this.url + "followed/" + userId + "/" + page
        : this.url + "followed";
    return this._http.get(url, { headers: headers });
  }
  
  getMyFollows(token): Observable<any> {
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", token);
    return this._http.get(this.url + "get-my-follows/true", { headers });
  }
}
