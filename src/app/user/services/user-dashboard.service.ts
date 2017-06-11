import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {FilterCriteria} from "../models/filter-criteria.model";
import {FilterSettingsConstants, FilterKeyConstants} from '../constants/filter.constant';
import {Observable} from "rxjs/Rx";
import {FilterService} from "./filter.service";
import {environment} from "../../../environments/environment";
import * as moment from 'moment';
/**
 * Created by Hiren on 11-06-2017.
 */

@Injectable()
export class UserDashboardServices {
  constructor(private http:Http, private filterService:FilterService) {

  }

  getHeaders():Headers {
    let headers = new Headers();
    headers.append('content-type', 'application/json');
    if (localStorage.getItem('token')) {
      headers.append('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('token')).token);
    }
    return headers;
  }

  retrieveOverviewData(filters:FilterCriteria[] = null):Observable<any> {
    let queryParams:string = 'report/date';
    if (filters && filters.length) {
      queryParams = queryParams + "?" + this.filterService.getQueryParamStringFromFilters(filters)
    }
    return this.http.get(environment.api_end_point + 'api/' + queryParams, {headers: this.getHeaders()})
      .map(response => response.json())
      .catch(error => {
        this.handelError(error.json());
        return Observable.throw(error.json())
      });
  }

  retrieveCohortData(tabName: string, filters:FilterCriteria[] = null):Observable<any> {
    let queryParams:string = tabName;
    if (filters && filters.length){
      queryParams = queryParams + "?" + this.filterService.getQueryParamStringFromFilters(filters)
    }
    return this.http.get(environment.api_end_point + 'api/report/' + queryParams, {headers: this.getHeaders()})
      .map(response => response.json())
      .catch(error => {
        this.handelError(error.json());
        return Observable.throw(error.json())
      });
  }


  handelError(error:any) {
    if (error.statusCode == 401) {

    }
  }

}


