import {Injectable} from "@angular/core";
import {Http,Headers,Response} from "@angular/http";
import {AuthService} from "../../shared/services/auth.service";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs/Rx";
/**
 * Created by Hiren on 28-06-2017.
 */

@Injectable()
export class FrontService {
  constructor(private http:Http, private authService:AuthService) {

  }

  getToken():string {
    console.log(environment.token);
    return environment.token;
  }

  getHeaders():Headers {
    let headers = new Headers();
    headers.append('content-type', 'application/json');
    if (this.getToken()) {
      headers.append('Authorization', 'Bearer ' + this.getToken());
    }
    return headers;
  }

  retrieveNews(sportType:string, timePeriod:string = 'cyear'):Observable<any> {
    return this.http.get(environment.api_end_point + 'fetchNews?sport=' + sportType + '&since=' + timePeriod, {headers: this.getHeaders()})
      .map((reponse:Response) => reponse.json())
      .catch(error => {
        this.handelError(error.json());
        return Observable.throw(error.json())
      });
  }


  retrieveDailyLineups(sportType:string, timePeriod:string = 'cyear'):Observable<any> {
    return this.http.get(environment.api_end_point + 'fetchLineup?sport=' + sportType + '&since=' + timePeriod, {headers: this.getHeaders()})
      .map((reponse:Response) => reponse.json())
      .catch(error => {
        this.handelError(error.json());
        return Observable.throw(error.json())
      });
  }

  handelError(error:any) {
    if (error.statusCode == 401) {
      this.authService.logout();
    }
  }
}
