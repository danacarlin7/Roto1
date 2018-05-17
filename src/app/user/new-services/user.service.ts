/* core */
import { Injectable } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

/* libs */
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import * as moment from 'moment';

/* env */
import { environment } from "../../../environments/environment";

/* filters */
import { FilterCriteria } from "../models/filter-criteria.model";
import { FilterSettingsConstants, FilterKeyConstants } from '../constants/filter.constant';


/* services */
import { AuthService } from "../../shared/new-services/auth.service";
import { FilterService } from "./filter.service";

/* models */
import { ContestHistory } from "../models/contest";
import { DashboardFilter } from "../models/dashboard-filter.model";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const httpOptionsCustom = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl;
  private appUrl;

  constructor(private http: HttpClient, private authService: AuthService, private filterService: FilterService) {
    this.apiUrl = environment.api_end_point + 'api/';
    this.appUrl = environment.api_end_point;
  }

  /* User Uploads */

  uploadContests(fileList): Observable<any> {
    let file: File = fileList[0];
    let formData: FormData = new FormData();
    formData.append('uploadFile', file, file.name);

    return this.http.post<any>(this.apiUrl + 'uploadContest', formData, {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.authService.getToken()
      })
    }).pipe(
      tap((file: any) => console.log(`user upload = ${file}`)),
      catchError(this.handleError<any>('uploadContests'))
      );
  }

  downloadFile(contestHistory: ContestHistory): Observable<any> {
    return this.http.get<any>(this.appUrl + "uploads/" + contestHistory.generated_name, httpOptions).pipe(
      tap((files: any) => { }),
      catchError(this.handleError<any>('downloadFile'))
    );
  }

  getUploads(): Observable<any> {
    httpOptionsCustom.headers = httpOptionsCustom.headers.set('Authorization', 'Bearer ' + this.authService.getToken());
    return this.http.get<any>(this.apiUrl + "contest/history", httpOptionsCustom).pipe(
      tap((files: any) => { }),
      catchError(this.handleError<any>('getUploads'))
    );
  }

  deleteUpload(contestHistory: ContestHistory): Observable<any> {
    httpOptionsCustom.headers = httpOptionsCustom.headers.set('Authorization', 'Bearer ' + this.authService.getToken());
    return this.http.delete<any>(this.apiUrl + "contest/history/" + contestHistory._id, httpOptionsCustom).pipe(
      tap((files: any) => { }),
      catchError(this.handleError<any>('deleteUpload'))
    );
  }

  /* User dashboard */

  retrieveOverviewData(filters: FilterCriteria[] = null): Observable<any> {
    let queryParams: string = 'report/date';
    if (filters && filters.length) {
      queryParams = queryParams + "?" + this.filterService.getQueryParamStringFromFilters(filters)
    }

    httpOptionsCustom.headers = httpOptionsCustom.headers.set('Authorization', 'Bearer ' + this.authService.getToken());
    return this.http.get<any>(this.apiUrl + queryParams, httpOptionsCustom).pipe(
      tap((datas: any) => { }),
      catchError(this.handleError<any>('retrieveOverviewData'))
    );
  }

  retrieveCohortData(tabName: string, filters: FilterCriteria[] = null): Observable<any> {
    let queryParams: string = tabName;
    if (filters && filters.length) {
      queryParams = queryParams + "?" + this.filterService.getQueryParamStringFromFilters(filters)
    }
    httpOptionsCustom.headers = httpOptionsCustom.headers.set('Authorization', 'Bearer ' + this.authService.getToken());
    return this.http.get<any>(this.apiUrl + 'report/' + queryParams, httpOptionsCustom).pipe(
      tap((datas: any) => { }),
      catchError(this.handleError<any>('retrieveOpponentsData'))
    );
  }

  retrieveOpponentsData(filters: FilterCriteria[] = null): Observable<any> {
    let queryParams: string = '';
    if (filters && filters.length) {
      queryParams = queryParams + "?" + this.filterService.getQueryParamStringFromFilters(filters)
    }
    console.log("opponent data in service");
    httpOptionsCustom.headers = httpOptionsCustom.headers.set('Authorization', 'Bearer ' + this.authService.getToken());
    return this.http.get<any>(this.apiUrl + 'opponents/profit' + queryParams, httpOptionsCustom).pipe(
      tap((datas: any) => { }),
      catchError(this.handleError<any>('retrieveOpponentsData'))
    );
  }

  retrieveContestData(tabName: string, filters: FilterCriteria[] = null): Observable<any> {
    let queryParams: string = tabName;
    if (filters && filters.length) {
      queryParams = queryParams + "?" + this.filterService.getQueryParamStringFromFilters(filters)
    }
    httpOptionsCustom.headers = httpOptionsCustom.headers.set('Authorization', 'Bearer ' + this.authService.getToken());
    return this.http.get<any>(this.apiUrl + queryParams, httpOptionsCustom).pipe(
      tap((datas: any) => { }),
      catchError(this.handleError<any>('retrieveContestData'))
    );
  }

  retrieveGraphData(tabName: string, filters: FilterCriteria[] = null): Observable<any> {
    let queryParams: string = tabName;
    if (filters && filters.length) {
      queryParams = queryParams + "?" + this.filterService.getQueryParamStringFromFilters(filters)
    }

    httpOptionsCustom.headers = httpOptionsCustom.headers.set('Authorization', 'Bearer ' + this.authService.getToken());
    return this.http.get<any>(this.apiUrl + "graph/" + queryParams, httpOptionsCustom).pipe(
      tap((datas: any) => { }),
      catchError(this.handleError<any>('retrieveGraphData'))
    );
  }

  getBreakdownChartData(data): Observable<any> {
    let queryStr = '';
    if (data) {
      queryStr = this.prepareApiUrl(data);
    }
    httpOptionsCustom.headers = httpOptionsCustom.headers.set('Authorization', 'Bearer ' + this.authService.getToken());
    return this.http.get<any>(this.apiUrl + "chart/activity" + queryStr, httpOptionsCustom).pipe(
      tap((datas: any) => { }),
      catchError(this.handleError<any>('getBreakdownChartData'))
    );
  }

  prepareApiUrl(data: DashboardFilter): string {
    let apiCustomUrl = "";

    if (data.startDate) {
      apiCustomUrl = apiCustomUrl + 'date_from=' + data.startDate;
    }
    if (data.endDate) {
      apiCustomUrl = apiCustomUrl + '&date_to=' + data.endDate;
    }
    if (data.site) {
      apiCustomUrl = apiCustomUrl + '&site=' + data.site;
    }
    if (data.sport) {
      apiCustomUrl = apiCustomUrl + '&sport=' + data.sport;
    }
    if (data.category) {
      apiCustomUrl = apiCustomUrl + '&category=' + data.category;
    }
    if (data.time_period) {
      apiCustomUrl = apiCustomUrl + '&time_period=' + data.time_period;
    }
    return '?' + apiCustomUrl;
  }

  getContestTopWinData(data): Observable<any> {
    let queryStr = '';
    if (data) {
      queryStr = this.prepareApiUrl(data);
    }
    httpOptionsCustom.headers = httpOptionsCustom.headers.set('Authorization', 'Bearer ' + this.authService.getToken());
    return this.http.get<any>(this.apiUrl + "entry/top" + queryStr, httpOptionsCustom).pipe(
      tap((datas: any) => { }),
      catchError(this.handleError<any>('getContestTopWinData'))
    );
  }

  getContestReport(data: DashboardFilter): Observable<any> {
    let queryStr = '';
    if (data) {
      queryStr = this.prepareApiUrl(data);
    }
    httpOptionsCustom.headers = httpOptionsCustom.headers.set('Authorization', 'Bearer ' + this.authService.getToken());
    return this.http.get<any>(this.apiUrl + "report/keyStates" + queryStr, httpOptionsCustom).pipe(
      tap((datas: any) => { }),
      catchError(this.handleError<any>('getContestReport'))
    );
  }

  getProfitByDayOfWeek(data): Observable<any> {
    let queryStr = '';
    if (data) {
      queryStr = this.prepareApiUrl(data);
    }
    httpOptionsCustom.headers = httpOptionsCustom.headers.set('Authorization', 'Bearer ' + this.authService.getToken());
    return this.http.post<any>(this.apiUrl + "chart/profit" + queryStr, httpOptionsCustom).pipe(
      tap((datas: any) => { }),
      catchError(this.handleError<any>('getProfitByDayOfWeek'))
    );
  }

  subscribePlan(token, plan_id): Observable<any> {
    httpOptionsCustom.headers = httpOptionsCustom.headers.set('Authorization', 'Bearer ' + this.authService.getToken());
    return this.http.post<any>(this.apiUrl + "subscribe", { token, plan_id }, httpOptionsCustom).pipe(
      tap((datas: any) => { }),
      catchError(this.handleError<any>('subscribePlan'))
    );
  }

  unsubscribePlan(subscribe_id, at_period_end): Observable<any> {
    httpOptionsCustom.headers = httpOptionsCustom.headers.set('Authorization', 'Bearer ' + this.authService.getToken());
    return this.http.post<any>(this.apiUrl + "unsubscribe/" + subscribe_id, { at_period_end: at_period_end }, httpOptionsCustom).pipe(
      tap((datas: any) => { }),
      catchError(this.handleError<any>('unsubscribePlan'))
    );
  }

  checkUserName(username): Observable<any> {
    return this.http.post<any>(this.appUrl + "checkUsername", { user_name: username }, httpOptions).pipe(
      tap((datas: any) => { }),
      catchError(this.handleError<any>('checkUserName'))
    );
  }

  getSavedCards(): Observable<any> {
    httpOptionsCustom.headers = httpOptionsCustom.headers.set('Authorization', 'Bearer ' + this.authService.getToken());
    return this.http.get<any>(this.apiUrl + "member/cards", httpOptionsCustom).pipe(
      tap((datas: any) => { }),
      catchError(this.handleError<any>('getSavedCards'))
    );
  }

  updateDefaultPaymentCard(cardId: string): Observable<any> {
    httpOptionsCustom.headers = httpOptionsCustom.headers.set('Authorization', 'Bearer ' + this.authService.getToken());
    return this.http.put<any>(this.apiUrl + "member/cards", {
      default_source: cardId
    }, httpOptionsCustom).pipe(
      tap((datas: any) => { }),
      catchError(this.handleError<any>('updateDefaultPaymentCard'))
      );
  }

  addPaymentCard(token: string): Observable<any> {
    httpOptionsCustom.headers = httpOptionsCustom.headers.set('Authorization', 'Bearer ' + this.authService.getToken());
    return this.http.post<any>(this.apiUrl + "member/cards", {
      source: token
    }, httpOptionsCustom).pipe(
      tap((datas: any) => { }),
      catchError(this.handleError<any>('addPaymentCard'))
      );
  }


  removePaymentCard(cardId: string): Observable<any> {
    httpOptionsCustom.headers = httpOptionsCustom.headers.set('Authorization', 'Bearer ' + this.authService.getToken());

    return this.http.post<any>(this.apiUrl + "member/removeCard", {card_id: cardId}, httpOptionsCustom).pipe(
      tap((datas: any) => { }),
      catchError(this.handleError<any>('subscribePlan'))
      );
  }


  private handleError<T>(operation = 'operation', RootObject?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      if (error.error.statusCode == 401) {
        this.authService.logout();
      } else if (error.error instanceof ErrorEvent) {
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
