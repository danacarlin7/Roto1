/* core */
import { EventEmitter,Injectable } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

/* libs */
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import * as moment from 'moment';

/* env */
import { environment } from "../../../environments/environment";

/* services */
import { AuthService } from "../../shared/new-services/auth.service";

/* filter */
import { FilterKeyConstants } from "../constants/filter.constant";
import { FilterCriteria } from "../models/filter-criteria.model";
import { CohortTabConstants, ContestTabConstants, GraphTabConstants } from "../constants/menu.constants";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const httpOptionsCustom = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  activeCohortTab: string = CohortTabConstants.SITE;
  activeContestTab: string = ContestTabConstants.CONTESTS;
  activeGraphTab: string = GraphTabConstants.PROFIT;
  filterSettings: any;
  filters: FilterCriteria[];

  filtersChangedEvent: EventEmitter<FilterCriteria[]> = new EventEmitter<FilterCriteria[]>();

  private apiUrl;
  private appUrl;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.apiUrl = environment.api_end_point + 'api/';
    this.appUrl = environment.api_end_point;
  }

  getFilterSettings(): Observable<any> {
    return new Observable(observer => {
      if (this.filterSettings) {
        observer.next(this.filterSettings);
      }
      else {

        this.http.get<any>(this.apiUrl + "settings" , httpOptions).pipe(
          tap((response: any) => {
              this.filterSettings = response.data;
              console.log(this.filterSettings);
              observer.next(this.filterSettings);
            }
          ),
          catchError(this.handleError<any>('getFilterSettings'))
        );
      }
    });
  }

  addFilter(filter: FilterCriteria) {
    this.filters = this.addValueToFilterArray(filter, this.filters);
    this.filtersChangedEvent.emit(this.filters);
  }

  removeFilter(filter: FilterCriteria) {
    this.filters = this.removeValueFromFilterArray(filter, this.filters);
    this.filtersChangedEvent.emit(this.filters);
  }

  clearFilter() {
    this.filters = null;
    this.filtersChangedEvent.emit(this.filters);
  }


  removeValueFromFilterArray(deleteFilter: FilterCriteria, filterArray: FilterCriteria[]): FilterCriteria[] {
    let searchedFilter: FilterCriteria[] = filterArray.filter(currFilter => {
      if (currFilter.key == deleteFilter.key) {
        return currFilter;
      }
    });
    if (searchedFilter) {
      filterArray.splice(filterArray.indexOf(searchedFilter[0]), 1);
    }
    return filterArray;
  }

  addValueToFilterArray(newFilter: FilterCriteria, filterArray: FilterCriteria[]): FilterCriteria[] {
    if (!filterArray) {
      filterArray = [];
    }
    if (newFilter.key == FilterKeyConstants.FEE) {
      let searchedFilter: FilterCriteria[] = filterArray.filter(currFilter => {
        if (currFilter.key == FilterKeyConstants.FREE_ROLL) {
          return currFilter;
        }
      });
      if (searchedFilter) {
        filterArray.splice(filterArray.indexOf(searchedFilter[0]), 1);
      }
    }
    else if (newFilter.key == FilterKeyConstants.FREE_ROLL) {
      let searchedFilter: FilterCriteria[] = filterArray.filter(currFilter => {
        if (currFilter.key == FilterKeyConstants.FEE) {
          return currFilter;
        }
      });
      if (searchedFilter) {
        filterArray.splice(filterArray.indexOf(searchedFilter[0]), 1);
      }
    }
    let searchedFilter: FilterCriteria[] = filterArray.filter(currFilter => {
      if (currFilter.key == newFilter.key) {
        return currFilter;
      }
    });
    if (searchedFilter && searchedFilter.length) {
      filterArray.splice(filterArray.indexOf(searchedFilter[0]), 1, newFilter);
    }
    else {
      filterArray.push(newFilter);
    }
    return filterArray;
  }

  getQueryParamStringFromFilters(filters: FilterCriteria[]): string {
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

  getFilterKey(filter: FilterCriteria): string {
    let key: string;
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

  getFilterValue(filter: FilterCriteria): string {
    let value: string;
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

  private handleError<T>(operation = 'operation', RootObject?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      if (error.error.statusCode == 401) {
        this.authService.logout();
      }else if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(`Backend returned code ${error.status}`);
        // `body was: ${error.error.message}`);
        this.log(error.error);
      }
      // return an observable with a user-facing error message
      return throwError(error.error);
    };
  };
  /** Log a HeroService message with the MessageService */
  private log(message: any) {
    console.table(message);
    // this.messageService.add('api service: ' + message);
  }

}
