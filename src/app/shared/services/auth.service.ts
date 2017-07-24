import {Injectable, EventEmitter, Output} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {Observable} from "rxjs/Rx";
import {environment} from "../../../environments/environment";
import {LoggedUser} from "../models/logged-user.model";
/**
 * Created by Hiren on 05-06-2017.
 */

@Injectable()
export class AuthService {

  private _loggedUser:LoggedUser;

  get loggedUser():LoggedUser {
    return this._loggedUser;
  }

  set loggedUser(value:LoggedUser) {
    this._loggedUser = value;
    if (this._loggedUser) {
      this.loggedUserChangeEvent.emit(this._loggedUser);
    }
  }

  loggedUserChangeEvent:EventEmitter<LoggedUser> = new EventEmitter<LoggedUser>();

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

  getUserRole():string {
    let role:string;
    if (environment.role) {
      role = environment.role;
    } else if (sessionStorage.getItem('data') && JSON.parse(sessionStorage.getItem('data')).role.length) {
      role = JSON.parse(sessionStorage.getItem('data')).role;
    } else if (localStorage.getItem('data') && JSON.parse(localStorage.getItem('token')).role.length) {
      role = JSON.parse(localStorage.getItem('token')).role;
    }
    return role;
  }

  login(data:string):Observable<any> {
    return this.http.post(environment.api_end_point + 'authenticate', data, {headers: this.getHeaders()})
      .map(response => response.json())
      .catch(error => Observable.throw(error.json()));
  }

  @Output() userLoggedInEvent:EventEmitter<boolean> = new EventEmitter<boolean>();

  loginWP(data:string):Observable<any> {
    console.log(data);
    return this.http.post('http://forum.dfsportgod.com/dfsauth/nglogin/', data)
      .map(response => response.json())
      .catch(error => Observable.throw(error.json()));
  }


  logout() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = '';
    //this.userLoggedInEvent.emit(false);
  }

  retrieveLoggedUserInfo():Observable<any> {
    return this.http.get(environment.api_end_point + 'api/memberinfo', {headers: this.getHeaders()})
      .map(response => response.json())
      .catch(error => Observable.throw(error.json()));
  }

  registerNewUser(data:any):Observable<any> {
    return this.http.post(environment.api_end_point + 'signup', data)
      .map(response => response.json())
      .catch(error => Observable.throw(error.json()))
  }

  verifyEmail(data:any) {
    return this.http.post(environment.api_end_point + 'getToken', data)
      .map(res => res.json())
      .catch(error => Observable.throw(error.json()));
  }

  verifyToken(token):Observable<any> {
    return this.http.post(environment.api_end_point + 'verifyToken', {token: token})
      .map(response => response.json())
      .catch(error => Observable.throw(error.json()));
  }

  changePassword(data) {
    return this.http.post(environment.api_end_point + 'verifyToken', data)
      .map(response => response.json())
      .catch(error => Observable.throw(error.json()));
  }

  userInfo() {
    return this.http.get(environment.api_end_point + 'api/memberinfo', {headers: this.getHeaders()})
      .map(response => response.json())
      .catch(error => Observable.throw(error.json()));
  }

  registerWP(data:string):Observable<any> {
    return this.http.post('http://forum.dfsportgod.com/dfsauth/register/', data)
      .map(response => response.json())
      .catch(error => Observable.throw(error.json()));
  }


}
