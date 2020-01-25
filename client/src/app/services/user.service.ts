import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/user";
import { GLOBAL } from "./global";
@Injectable({
  providedIn: "root"
})
export class UserService {
  public url: string;
  public identity;
  public token;
  public user;
  public status;
  public stats;

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  register(user: User): Observable<any> {
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this._http.post(this.url + "register", params, { headers });
  }

  login(user: User, gettoken = null): Observable<any> {
    if (gettoken != null) {
      user.gettoken = gettoken;
    }
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this._http.post(this.url + "login", params, { headers: headers });
  }
  // obtener los datos del usuario del localstorage
  getIdentity() {
    let identity = JSON.parse(localStorage.getItem("identity"));
    this.identity = identity != "undefined" ? identity : null;
    return this.identity;
  }
  // obtener el token del localstorage
  getToken() {
    let token = localStorage.getItem("token");
    this.token = token != "undefined" ? token : null;
    return this.token;
  }
  getStats() {
    let stats = JSON.parse(localStorage.getItem("stats"));
    this.stats = stats != "undefined" ? stats : null;
    return this.stats;
  }
  getCounters(userId = null) {
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", this.getToken());
    if (userId != null) {
      return this._http.get(this.url + "get-user-counters/" + userId, {
        headers: headers
      });
    } else {
      return this._http.get(this.url + "get-user-counters", {
        headers: headers
      });
    }
  }
  updateUser(user: User) {
    let params = JSON.stringify(user);
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", this.getToken());
    return this._http.put(this.url + "update-user/" + user._id, params, {
      headers: headers
    });
  }
  getUsers(page = null): Observable<any> {
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", this.getToken());
    return this._http.get(this.url + "users/" + page, { headers: headers });
  }
  getUser(id):Observable<any>{
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", this.getToken());
    return this._http.get(this.url + "user/" + id, { headers: headers });
  }
}


