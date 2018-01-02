import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import {AuthService} from "../../shared/services/auth.service";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs/Rx";
/**
 * Created by Hiren on 28-06-2017.
 */

@Injectable()
export class FrontService {
  constructor(private http: Http, private authService: AuthService) {

  }

  getToken():string {
    return environment.token;
  }

  getHeaders(): Headers {
    let headers = new Headers();
    headers.append('content-type', 'application/json');
    if (this.getToken()) {
      headers.append('Authorization', 'Bearer ' + this.getToken());
    }
    return headers;
  }

  retrieveNews(sportType:string, timePeriod:string = '30days'): Observable<any> {
    return this.http.get(environment.api_end_point + 'fetchNews?sport=' + sportType + '&since=' + timePeriod, {headers: this.getHeaders()})
      .map((reponse: Response) => reponse.json())
      .catch(error => {
        this.handelError(error.json());
        return Observable.throw(error.json())
      });
  }

  retrieveHomepageNews(): Observable<any> {
    return this.http.get(environment.api_end_point + 'fetchLatestNews?count=10', {headers: this.getHeaders()})
      .map((reponse: Response) => reponse.json())
      .catch(error => {
        this.handelError(error.json());
        return Observable.throw(error.json())
      });
  }

  retrieveInjuries(sportType:string): Observable<any> {
    return this.http.get(environment.api_end_point + 'injuries?sport=' + sportType, {headers: this.getHeaders()})
      .map((reponse: Response) => reponse.json())
      .catch(error => {
        this.handelError(error.json());
        return Observable.throw(error.json())
      });
  }

  retrieveDailyLineups(sportType:string, timePeriod:string = 'cyear'): Observable<any> {
    return this.http.get(environment.api_end_point + 'fetchLineup?sport=' + sportType + '&since=' + timePeriod, {headers: this.getHeaders()})
      .map((reponse: Response) => reponse.json())
      .catch(error => {
        this.handelError(error.json());
        return Observable.throw(error.json())
      });
  }

  retrieveTwitterFeeds(): Observable<any> {
    return this.http.get(environment.api_end_point + 'getTwitterFeeds', {headers: this.getHeaders()})
      .map((reponse: Response) => reponse.json())
      .catch(error => {
        this.handelError(error.json());
        return Observable.throw(error.json())
      });
  }

  retrieveFBFeeds(): Observable<any> {
    return this.http.get(environment.api_end_point + 'getFBPost', {headers: this.getHeaders()})
      .map((reponse: Response) => reponse.json())
      .catch(error => {
        this.handelError(error.json());
        return Observable.throw(error.json())
      });
  }

  retrieveInstaFeeds(): Observable<any> {
    return this.http.get(environment.api_end_point + 'getInstaPosts', {headers: this.getHeaders()})
      .map((reponse: Response) => reponse.json())
      .catch(error => {
        this.handelError(error.json());
        return Observable.throw(error.json())
      });
  }

  getSubscribePlans(): Observable<any> {
    return this.http.get(environment.api_end_point + "plans", {headers: this.getHeaders()})
      .map(response => response.json())
      .catch(error => {
        this.handelError(error.json());
        return Observable.throw(error.json())
      });
  }

  subscribePlan(token, plan_id, coupon = ""): Observable<any> {
    console.log(coupon);
    return this.http.post(environment.api_end_point + 'api/subscribe', {token, plan_id, coupon}, {headers: this.getHeaders()})
      .map((response: Response) => response.json());
  }

  unsubscribePlan(subscribe_id, at_period_end) {
    return this.http.put(environment.api_end_point + 'api/unsubscribe/' + subscribe_id, {at_period_end: at_period_end}, {headers: this.getHeaders()})
      .map((response: Response) => response.json());
  }

  retrieveProvider() {
    return this.http.get(environment.api_end_point + "providers", {headers: this.getHeaders()})
      .map(response => response.json())
      .catch(error => {
        this.handelError(error.json());
        return Observable.throw(error.json())
      });
  }

  handelError(error: any) {
    if (error.statusCode == 401) {
      this.authService.logout();
    }
  }
}
