import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {Observable} from "rxjs/Observable";
import {Http, Headers} from "@angular/http";
import {DashboardFilter} from "../models/dashboard-filter.model";

@Injectable()
export class UserService implements CanActivate {

  endpoint:string = "https://api.dfsportgod.com/";

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

  canActivate() {
    if (this.auth.userLoggedIn()) {
      console.log("contest true");
      return true;
    } else {
      console.log("contest false");
      this.router.navigateByUrl('/login');
    }
  }

  prepareApiUrl(data:DashboardFilter):string {
    let apiUrl = "";

    if (data.startDate) {
      apiUrl = apiUrl + 'date_from=' + data.startDate;
    }
    if (data.endDate) {
      apiUrl = apiUrl + '&date_to=' + data.endDate;
    }
    if (data.site) {
      apiUrl = apiUrl + '&site=' + data.site;
    }
    if (data.sport) {
      apiUrl = apiUrl + '&sport=' + data.sport;
    }
    if (data.category) {
      apiUrl = apiUrl + '&category=' + data.category;
    }
    if (data.time_period) {
      apiUrl = apiUrl + '&time_period=' + data.time_period;
    }
    return '?' + apiUrl;
  }

  getContestReport(data:DashboardFilter):Observable<any> {
    let queryStr = '';
    if (data) {
      queryStr = this.prepareApiUrl(data);
    }
    return this.http.get(this.endpoint + "api/report/keyStates" + queryStr, {headers: this.getHeaders()})
      .map(response => response.json())
      .catch(error => Observable.throw(error.json()));
  }

  getContestTopWinData(data):Observable<any> {
    let queryStr = '';
    if (data) {
      queryStr = this.prepareApiUrl(data);
    }
    return this.http.get(this.endpoint + "api/entry/top" + queryStr, {headers: this.getHeaders()})
      .map(response => response.json())
      .catch(error => {
        this.hendleError(error.json());
        return Observable.throw(error.json())
      });
  }

  getProfitByDayOfWeek(data):Observable<any>{
    let queryStr = '';
    if (data) {
      queryStr = this.prepareApiUrl(data);
    }
    return this.http.get(this.endpoint + "api/chart/profit" + queryStr, {headers: this.getHeaders()})
      .map(response => response.json())
      .catch(error => {
        this.hendleError(error.json());
        return Observable.throw(error.json())
      });
  }

  getBreakdownChartData(data):Observable<any>{
    let queryStr = '';
    if (data) {
      queryStr = this.prepareApiUrl(data);
    }
    return this.http.get(this.endpoint + "api/chart/activity" + queryStr, {headers: this.getHeaders()})
      .map(response => response.json())
      .catch(error => {
        this.hendleError(error.json());
        return Observable.throw(error.json())
      });
  }

  getSubscribePlans():Observable<any> {
    return this.http.get(this.endpoint + "api/plans", {headers: this.getHeaders() })
      .map(response => response.json())
      .catch(error => {
        this.hendleError(error.json());
        return Observable.throw(error.json())
      });
  }

  hendleError(error:any) {
    if (error.statusCode == 401) {
      this.auth.logout();
    }
  }

  getUserEmail() {
    return JSON.parse(localStorage.getItem('user')).email;
  }

  getUserData() {
    return JSON.parse(localStorage.getItem('user'));
  }
}
