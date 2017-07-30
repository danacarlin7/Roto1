import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import {Observable} from "rxjs/Rx";
import {AuthService} from "../../shared/services/auth.service";
import {environment} from "../../../environments/environment";
import {Analyst} from "../models/provider.model";
/**
 * Created by Hiren on 09-06-2017.
 */


@Injectable()
export class AdminDashboardService {
  endpoint:string = "https://api.dfsportgod.com/";

  selectedProvider:Analyst;

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

  retrieveDashboardDetails():Observable<any> {
    return this.http.get(this.endpoint + 'api/getDashboard', {headers: this.getHeaders()})
      .map(response => response.json())
      .catch(error => {
        this.hendleError(error.json());
        return Observable.throw(error.json())
      });
  }

  retrieveLatestMembers():Observable<any> {
    return this.http.get(this.endpoint + 'api/getLatestMembers', {headers: this.getHeaders()})
      .map(response => response.json())
      .catch(error => {
        this.hendleError(error.json());
        return Observable.throw(error.json())
      });
  }

  getMembers() {
    return this.http.get(environment.api_end_point + 'api/getMembers', {headers: this.getHeaders()})
      .map(response => response.json())
      .catch(error => {
        this.hendleError(error.json());
        return Observable.throw(error.json())
      });
  }

  getProviders() {
    return this.http.get(environment.api_end_point + 'api/getProviders', {headers: this.getHeaders()})
      .map(response => response.json())
      .catch(error => {
        this.hendleError(error.json());
        return Observable.throw(error.json())
      });
  }


  deleteMember(id) {
    return this.http.delete(environment.api_end_point + 'api/member/' + id, {headers: this.getHeaders()})
      .map(response => response.json())
      .catch(error => {
        this.hendleError(error.json());
        return Observable.throw(error.json())
      });
  }

  deleteProvider(id) {
    return this.http.delete(environment.api_end_point + 'api/provider/' + id, {headers: this.getHeaders()})
      .map(response => response.json())
      .catch(error => {
        this.hendleError(error.json());
        return Observable.throw(error.json())
      });
  }

  editMember(member) {
    return this.http.post(environment.api_end_point + 'api/editMember', member, {headers: this.getHeaders()})
      .map(response => response.json())
      .catch(error => {
        this.hendleError(error.json());
        return Observable.throw(error.json())
      });
  }

  editProvider(member:Analyst):Observable<any> {
    return this.http.post(environment.api_end_point + 'api/provider/' + member._id, member, {headers: this.getHeaders()})
      .map(response => response.json())
      .catch(error => {
        this.hendleError(error.json());
        return Observable.throw(error.json())
      });
  }

  saveMember(member) {
    return this.http.post(environment.api_end_point + 'api/member', JSON.stringify(member), {headers: this.getHeaders()})
      .map(response => response.json())
      .catch(error => {
        this.hendleError(error.json());
        return Observable.throw(error.json())
      });
  }

  saveProvider(member) {
    return this.http.post(environment.api_end_point + 'api/provider', JSON.stringify(member), {headers: this.getHeaders()})
      .map(response => response.json())
      .catch(error => {
        this.hendleError(error.json());
        return Observable.throw(error.json())
      });
  }


  verifyEmail(email) {
    return this.http.post(environment.api_end_point + 'getToken', {email: email})
      .map(res => res.json())
      .catch(error => Observable.throw(error.json()));
  }

  changePassword(data) {
    return this.http.post(environment.api_end_point + 'verifyToken', {
      token: data.token,
      password: data.password,
      is_tool: true
    })
      .map((response:Response) => {
        return response.json()
      })
      .catch(error => Observable.throw(error.json()));
  }

  changeMemberStatus(id) {
    return this.http.put(environment.api_end_point + 'api/member/' + id, '', {headers: this.getHeaders()})
      .map(response => response.json())
      .catch(error => {
        this.hendleError(error.json());
        return Observable.throw(error.json())
      });
  }

  changeProviderStatus(id) {
    return this.http.put(environment.api_end_point + 'api/provider/' + id, '', {headers: this.getHeaders()})
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
