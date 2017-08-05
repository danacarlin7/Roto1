import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {Observable} from "rxjs/Rx";
import {CustomAuthService} from "../../shared/services/auth.service";
import {MembershipPlan} from "../models/plan.model";
import {environment} from "../../../environments/environment";
/**
 * Created by Hiren on 24-05-2017.
 */

@Injectable()
export class MembershipPlanService {
  endpoint:string = "https://api.dfsportgod.com/";

  editPlan:MembershipPlan;

  constructor(private http:Http, private authService:CustomAuthService) {

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

  retrieveMembershipPlans():Observable<any> {
    return this.http.get(this.endpoint + 'api/plans', {headers: this.getHeaders()})
      .map(response => response.json())
      .catch(error => {
        this.hendleError(error.json());
        return Observable.throw(error.json())
      });
  }

  addMembershipPlan(plan:any):Observable<any> {
    return this.http.post(this.endpoint + 'api/plans', JSON.stringify(plan), {headers: this.getHeaders()})
      .map(response => response.json())
      .catch(error => {
        this.hendleError(error.json());
        return Observable.throw(error.json())
      });
  }

  removePlanHandler(id:string):Observable<any> {
    return this.http.delete(this.endpoint + 'api/plans/' + id, {headers: this.getHeaders()})
      .map(response => response.json())
      .catch(error => {
        this.hendleError(error.json());
        return Observable.throw(error.json())
      });
  }

  updatePlan(plan:any, id:string):Observable<any> {
    return this.http.put(this.endpoint + 'api/plans/' + id, JSON.stringify(plan), {headers: this.getHeaders()})
      .map(response => response.json())
      .catch(error => {
        this.hendleError(error.json());
        return Observable.throw(error.json())
      });
  }

  retrieveCoupons():Observable<any> {
    return this.http.get(this.endpoint + 'api/plans', {headers: this.getHeaders()})
      .map(response => response.json())
      .catch(error => {
        this.hendleError(error.json());
        return Observable.throw(error.json())
      });
  }

  hendleError(error:any) {
    if (error.statusCode == 401) {
      this.authService.logout();
    }
  }
}
