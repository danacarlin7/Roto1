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

  getHeaders():Headers {
    let headers = new Headers();
    headers.append('content-type', 'application/json');
    if (localStorage.getItem('token')) {
      headers.append('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('token')).token);
    }
    return headers;
  }

  login(data:string):Observable<any> {
    return this.http.post(environment.api_end_point + 'authenticate', data, {headers: this.getHeaders()})
      .map(response => response.json())
      .catch(error => Observable.throw(error.json()))
  }

  logout() {
    localStorage.clear();
    window.location.href = '';
    //this.userLoggedInEvent.emit(false);
  }

}
