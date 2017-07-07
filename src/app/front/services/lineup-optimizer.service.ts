import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import {AuthService} from "../../shared/services/auth.service";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs/Rx";
/**
 * Created by Hiren on 05-07-2017.
 */

@Injectable()
export class LineupOptimizerService {

  constructor(private http:Http, private authService:AuthService) {

  }

  getToken():string {
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

  retrieveSlates(operator:string, sport:string):Observable<any> {
    return this.http.get(environment.api_end_point + 'api/slates?operator=' + operator + '&sport=' + sport, {headers: this.getHeaders()})
      .map((reponse:Response) => reponse.json())
      .catch(error => {
        this.handelError(error.json());
        return Observable.throw(error.json())
      });
  }

  retrievePlayers(operator:string , sport:string, slateId:number):Observable<any> {
    return this.http.get(environment.api_end_point + 'api/optimizer/playersBySlate?sport=' + sport + '&slate_id=' + slateId + '&operator=' + operator, {headers: this.getHeaders()})
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
