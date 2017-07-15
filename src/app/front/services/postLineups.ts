import { Injectable } from '@angular/core';
import {CanActivate} from '@angular/router';
import {AuthService} from "../../shared/services/auth.service";
import {Router} from '@angular/router';
import {Http, Headers, Response, RequestOptions } from '@angular/http';
import {environment} from "../../../environments/environment";

@Injectable()
export class LineupPostService {
  constructor(private auth:AuthService, private http:Http, private router:Router) {
  }

  getHeaders():Headers {
    let headers = new Headers();
    headers.append('content-type', 'application/json');
    if (localStorage.getItem('token')) {
      headers.append('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('token')).token);
    }
    return headers;
  }

  getToken():string {
    return environment.token;
  }

  canActivate() {
    if (this.auth.isLoggedIn()) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
    }
  }

   createLineup(lineup) {
      return this.http.post(environment.api_end_point + 'api/uploadLineup', JSON.stringify(lineup), {headers: this.getHeaders()});
    }

    getProviders(operator, sport, slate) {
      return this.http.get(environment.api_end_point + 'api/providers?operator=' + operator + '&sport=' + sport + '&slate_id=' + slate, {headers: this.getHeaders()});
    }

    getLineups(operator, sport, slate, provider) {
      return this.http.get(environment.api_end_point + 'api/lineups?operator=' + operator + '&sport=' + sport + '&date_exact=2017-07-09&slate_id=' + slate + '&provider=' + provider, {headers: this.getHeaders()});
    }
    deleteLineup(operator, sport, slate, provider, id) {
      return this.http.delete(environment.api_end_point + 'api/lineups/' + id, {headers: this.getHeaders()});
    }
    updateLineup(operator, sport, slate, provider, id, lineup) {
      return this.http.post(environment.api_end_point + 'api/updateLineup/' + operator + '/' + sport + '/' + slate + '/' + provider + '/' + id, JSON.stringify(lineup), {headers: this.getHeaders()});
    }
};
