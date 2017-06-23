import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {Observable} from "rxjs/Rx";
import {AuthService} from "../../shared/services/auth.service";
import {environment} from "../../../environments/environment";
/**
 * Created by Hiren on 04-06-2017.
 */
@Injectable()
export class CouponsService {
  endpoint:string = "https://api.dfsportgod.com/";

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

  retrieveCoupons():Observable<any> {
    return this.http.get('', {headers: this.getHeaders()})
      .map(response => response.json())
      .catch(error => {
        this.handleError(error.json());
        return Observable.throw(error.json())
      });
  }

  handleError(error:any) {
    if (error.statusCode == 401) {
      this.authService.logout();
    }
  }
}
