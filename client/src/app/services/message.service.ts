import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { GLOBAL } from "./global";
import { Message } from "../models/message";

@Injectable({
  providedIn: "root"
})
export class MessageService {
  public url: string;
  public token: string;
  public message: Message;
  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
    this.token = this.getToken();
  }
  getToken = () => {
    let token = localStorage.getItem("token");
    this.token = token !== undefined ? token : null;
    return this.token;
  };
  addMessage(token, message): Observable<any> {
    let params = JSON.stringify(message);
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", token);

    return this._http.post(this.url + "message", params, { headers });
  }
  getMessagesReceived = (token, page = 1):Observable<any> => {
      let headers = new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Authorization', token)
      return this._http.get(this.url + "messages/received/"+page,{headers});
  };
  getMessagesSent(token, page = 1):Observable<any>{
    let headers = new HttpHeaders()
    .set('Content-Type','application/json')
    .set('Authorization', token);
    return this._http.get(this.url + "messages/sent/"+page,{headers});
}
 
}
