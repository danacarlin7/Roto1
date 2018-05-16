/* core */
import { Injectable } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

/* libs */
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

/* env */
import { environment } from "../../../environments/environment";

/* services */
import { AuthService } from "../../shared/new-services/auth.service";

// import { CategoryData } from "../models/category-data";
// import { PostData } from "../models/post-data";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const httpOptionsCustom = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class FrontService {

  private apiUrl;
  private appUrl;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.apiUrl = environment.api_end_point + 'api/';
    this.appUrl = environment.api_end_point;
  }

  retrieveNews(args: Object): Observable<any> {

    // sport
    // since = 30days

    let query = [];
    for (let key in args)
      query.push(`${key}=${args[key]}`);
    let queryStr = query.join('&');

    return this.http.get<any>(this.appUrl + "fetchNews?" + queryStr, httpOptions).pipe(
      tap((news: any) => console.log(`news = ${news.length}`)),
      catchError(this.handleError<any>('retrieveNews'))
    );
  }

  retrieveHomepageNews(): Observable<any> {
    return this.http.get<any>(this.appUrl + "fetchLatestNews?count=10", httpOptions).pipe(
      tap((news: any) => {}),
      catchError(this.handleError<any>('retrieveHomepageNews'))
    );
  }

  retrieveInjuries(sportType: string): Observable<any> {
    return this.http.get<any>(this.appUrl + "injuries?sport="+ sportType, httpOptions).pipe(
      tap((injuries: any) => {}),
      catchError(this.handleError<any>('retrieveHomepageNews'))
    );
  }

  retrieveDailyLineups(args: Object): Observable<any> {
    // sport : MLB
    // since : today

    let query = [];
    for (let key in args)
      query.push(`${key}=${args[key]}`);
    let queryStr = query.join('&');

    return this.http.get<any>(this.appUrl + "fetchLineup"+ httpOptions, httpOptions).pipe(
      tap((injuries: any) => {}),
      catchError(this.handleError<any>('retrieveHomepageNews'))
    );
  }

  retrieveTwitterFeeds(): Observable<any> {
    return this.http.get<any>(this.appUrl + "getTwitterFeeds", httpOptions).pipe(
      tap((feeds: any) => {}),
      catchError(this.handleError<any>('retrieveTwitterFeeds'))
    );
  }

  retrieveFBFeeds(): Observable<any> {
    return this.http.get<any>(this.appUrl + "getFBPost", httpOptions).pipe(
      tap((feeds: any) => {}),
      catchError(this.handleError<any>('retrieveFBFeeds'))
    );
  }

  retrieveInstaFeeds(): Observable<any> {
    return this.http.get<any>(this.appUrl + "getInstaPosts", httpOptions).pipe(
      tap((feeds: any) => {}),
      catchError(this.handleError<any>('retrieveInstaFeeds'))
    );
  }

  getDummyPlans():any[]{
    return [
      {
        name: "All Access Monthly Rate",
        trial_period_days: null,
        plan_id: "RotoPros_All_Access_Analyst_Lineups_Yearly",
        plan_type: "Subscription",
        amount: 2999,
        currency: "usd",
        interval: "month",
        interval_count: 1
      },
      {
        name: "All Access Yearly Rate",
        trial_period_days: null,
        plan_id: "RotoPros_All_Access_Analyst_Lineups_Month",
        plan_type: "Subscription",
        amount: 24999,
        currency: "usd",
        interval: "year",
        interval_count: 1
      }
    ];
  }

  getSubscribePlans(): Observable<any> {
    return this.http.get<any>(this.appUrl + "plans", httpOptions).pipe(
      tap((datas: any) => {}),
      catchError(this.handleError<any>('getSubscribePlans'))
    );
  }

  subscribePlan(token, plan_id, coupon = ""): Observable<any> {
    console.log(coupon);
    httpOptionsCustom.headers = httpOptionsCustom.headers.set('Authorization', 'Bearer ' + (this.authService.getToken()));
    return this.http.post<any>(this.apiUrl + "subscribe", {token, plan_id, coupon}, httpOptionsCustom).pipe(
      tap((datas: any) => {}),
      catchError(this.handleError<any>('subscribePlan'))
    );
  }

  validateCoupon(coupon, amount) {
    // validateCoupon(coupon): Observable<any> {
    console.log(coupon);
    return this.http.post<any>(this.appUrl + "validateCoupon", {coupon, amount}, httpOptions).pipe(
      tap((datas: any) => {}),
      catchError(this.handleError<any>('subscribePlan'))
    );
  }


  validateCouponAdvance(coupon, amount) {
    console.log(coupon);
    httpOptionsCustom.headers = httpOptionsCustom.headers.set('Authorization', 'Bearer ' + (this.authService.getToken()));
    return this.http.post<any>(this.apiUrl + "validateCouponAdvance", {coupon, amount}, httpOptionsCustom).pipe(
      tap((datas: any) => {}),
      catchError(this.handleError<any>('subscribePlan'))
    );
  }


  signUpStepTwo(token, plan_id, coupon = ""): Observable<any> {
    httpOptionsCustom.headers = httpOptionsCustom.headers.set('Authorization', 'Bearer ' + this.authService.partialUser.token);
    return this.http.post<any>(this.apiUrl + "signupTwo", {token, plan_id, coupon}, httpOptionsCustom).pipe(
      tap((datas: any) => {}),
      catchError(this.handleError<any>('signUpStepTwo'))
    );
  }

  unsubscribePlan(subscribe_id, at_period_end): Observable<any> {
    httpOptionsCustom.headers = httpOptionsCustom.headers.set('Authorization', 'Bearer ' + (this.authService.getToken()));
    return this.http.post<any>(this.apiUrl + "unsubscribe/"+ subscribe_id, {at_period_end: at_period_end}, httpOptionsCustom).pipe(
      tap((datas: any) => {}),
      catchError(this.handleError<any>('unsubscribePlan'))
    );
  }

  retrieveProvider() {
    return this.http.get<any>(this.appUrl + "providers", httpOptions).pipe(
      tap((providers: any) => {}),
      catchError(this.handleError<any>('retrieveProvider'))
    );
  }

  retrieveVideos(status = false): Observable<any> {
    let link = "getVideos";
    if(status)
      link = "getVideos?live=true";

    return this.http.get<any>(this.appUrl + link, httpOptions).pipe(
      tap((videos: any) => {}),
      catchError(this.handleError<any>('retrieveVideos'))
    );
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
