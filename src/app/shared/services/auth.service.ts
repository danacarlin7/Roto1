import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {Observable} from "rxjs/Rx";
import {environment} from "../../../environments/environment";
/**
 * Created by Hiren on 05-06-2017.
 */

@Injectable()
export class AuthService {

  constructor(private http:Http) {

  }

  getToken():string {
    return environment.token;
  }

  getHeaders():Headers {
    let headers = new Headers();
    headers.append('content-type', 'application/json');
    if (this.getToken()) {
      headers.append('Authorization', 'Bearer ' + (this.getToken()));
    }
    return headers;
  }

  isLoggedIn():boolean {
    let login:boolean;
    if (environment.token && environment.token.length) {
      login = true;
    } else if (sessionStorage.getItem('token') && sessionStorage.getItem('token').length) {
      login = true;
    } else if (localStorage.getItem('token') && localStorage.getItem('token').length) {
      login = true;
    }
    console.log("isLogin", login);
    return login;
  }

  login(data:string):Observable<any> {
    return this.http.post(environment.api_end_point + 'authenticate', data, {headers: this.getHeaders()})
      .map(response => response.json())
      .catch(error => Observable.throw(error.json()))
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = '';
    //this.userLoggedInEvent.emit(false);
  }

}
