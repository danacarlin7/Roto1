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

  getQueryParamStringFromFilters(filters:FilterCriteria[] = null):string {
    let queryStr = '';
    filters.forEach((currFilter, index) => {
      if (index == 0) {
        queryStr = queryStr + this.getFilterKey(currFilter) + "=" + this.getFilterValue(currFilter);
      } else {
        queryStr = queryStr + "&" + this.getFilterKey(currFilter) + "=" + this.getFilterValue(currFilter);
      }

    });
    console.log("queryStr => ", queryStr);
    return queryStr;
  }

  getFilterKey(filter:FilterCriteria):string {
    let key:string;
    switch (filter.key) {
      case FilterKeyConstants.FREE_ROLL:
        key = FilterKeyConstants.FEE;
        break;
      default:
        key = filter.key;
        break;
    }
    return key;
  }

  getFilterValue(filter:FilterCriteria):string {
    let value:string;
    switch (filter.key) {
      case FilterKeyConstants.DATE_FROM:
      case FilterKeyConstants.DATE_TO:
      case FilterKeyConstants.DATE_EXACT:
        value = moment(filter.value).format('YYYY-MM-DD');
        break;
      case FilterKeyConstants.FEE:
        let minValue = filter.value.min ? filter.value.min : '';
        let maxValue = filter.value.max ? filter.value.max : '';
        value = minValue + "-" + maxValue;
        break;
      case FilterKeyConstants.NO_OF_CONTEST_ENTRIES:
        let minContestValue = filter.value.min_contest ? filter.value.min_contest : '';
        let maxContestValue = filter.value.max_contest ? filter.value.max_contest : '';
        value = minContestValue + "-" + maxContestValue;
        break;
      default:
        value = filter.value;
        break;
    }
    return value;
  }

  retrieveCohortData(filters: FilterCriteria[] = null): Observable<any> {
    let queryParams: string = 'site';
    // if (filters && filters.length) {
      queryParams = queryParams ;
    // }
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


