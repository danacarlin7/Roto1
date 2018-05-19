import { Injectable, EventEmitter, Output, PLATFORM_ID, Inject } from '@angular/core';
import { APP_BASE_HREF, isPlatformBrowser, isPlatformServer } from '@angular/common';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LoggedUser } from "../models/logged-user.model";
import { environment } from "../../../environments/environment";

import { Login } from "../models/login";
import { User } from "../models/user";

import { ArticleService } from "../../front/new-services/article.service";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _loggedUser: LoggedUser;
  private apiUrl;
  private appUrl;
  private wpUrl;


  get loggedUser(): LoggedUser {
    return this._loggedUser;
  }

  set loggedUser(value: LoggedUser) {
    this._loggedUser = value;
    if (this._loggedUser) {
      this.loggedUserChangeEvent.emit(this._loggedUser);
    }
  }

  isLoggedInEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  loggedUserChangeEvent: EventEmitter<LoggedUser> = new EventEmitter<LoggedUser>();

  partialUser: any;

  constructor(private http: HttpClient, private articleService: ArticleService,
    @Inject(PLATFORM_ID) private platformId: any) {
    this.apiUrl = environment.api_end_point + 'api/';
    this.appUrl = environment.api_end_point;
    this.wpUrl = 'http://13.56.129.231/dfsauth';
  }


  getToken(): string {

     if (isPlatformBrowser(this.platformId)) {
         // Client-only code: use localStorage
        return localStorage.getItem('token') ? localStorage.getItem('token') : environment.token;
     }
     if (isPlatformServer(this.platformId)) {
         // Server-only code: do nothing
     }
  }

  // getHeaders(): Observable<any> {
  //   if(this.getToken()){
  //     httpOptions.headers = httpOptions.headers.set('Authorization', 'Bearer ' + (this.getToken()));
  //   }
  //   return httpOptions;
  // }

  // getHeaders(): HttpHeaders {
  //   const headers = new HttpHeaders();
  //   headers.append('content-type', 'application/json');
  //   if (this.getToken()) {
  //     headers.append('Authorization', 'Bearer ' + (this.getToken()));
  //   }
  //   return headers;
  // }

  checkArticle(id, callback) {
   this.articleService.fetchPost(id).subscribe(
     response => {
       // this.article = response;
       // console.log(response.categories[0]);
       this.articleService.fetchFreeCategory().subscribe(
         responses => {
           let cat_cnt = 0;
           let isFree = false;

           for (let value of response.categories) {
             console.log(value, responses);
             cat_cnt++;

             if (value === responses[0].id) {
               isFree = true;
             }

             if (response.categories.length == cat_cnt)
               callback(isFree);
           }

         }
       );

     }
   );
 }

 checkArticleVisibility(id, callback){
   if (this.isLoggedIn()) {
     callback(this.isSubscriber(true) ? true : false);
   } else {
     console.log("else here", id);
     let status;
     this.checkArticle(id, function(resp) {
       console.log("check article", resp);
       if (resp) {
         status = true;
       } else {
         status = false;
       }
       callback(status);
     });
   }
 }


  isSubscriber(calledByGuard = false): boolean | Observable<any> {
    if (this.loggedUser) {
      return this.loggedUser.is_subscribe;
    } else if (calledByGuard && environment.token) {
      return this.http.get<any>(this.apiUrl + 'memberinfo', httpOptions).pipe(
        tap(member => console.log('fetched member',member)),
        catchError(this.handleError('memberinfo'))
      );
    } else {
      console.log("not a subscriber");
    }
  }

  isSubscribers(): boolean {
    let isSubscribe = false;
    if (this.loggedUser) {
      if (this.loggedUser.is_subscribe) {
        isSubscribe = true;
      }
    }
    return isSubscribe;
  }

  subscriptionAlertEvent: EventEmitter<any> = new EventEmitter<any>();

  showSubscriptionAlert() {
    this.subscriptionAlertEvent.emit(true);
  }

  isLoggedIn(): boolean {
    let login: boolean;
    if (environment.token && environment.token.length) {
      login = true;
    } else if (isPlatformBrowser(this.platformId)) {
        // Client-only code: use localStorage
        if(localStorage.getItem('token') && localStorage.getItem('token').length) {
          login = true;
        }
    } else if (isPlatformServer(this.platformId)) {
        // Server-only code: do nothing
    }
    console.log("isLogin", login);
    return login;
  }

  getUserRole(): string {
    let role: string;
    if (environment.role) {
        role = environment.role;
    } else if (isPlatformBrowser(this.platformId)) {
        // localStorage will be available: we can use it.
        if (localStorage.getItem('data') && JSON.parse(localStorage.getItem('data')).role.length) {
          role = JSON.parse(localStorage.getItem('data')).role;
        }
    } else if (isPlatformServer(this.platformId)) {
        // localStorage will be null.
    }
    return role;
  }

  login(data: string): Observable<Login> {
    httpOptions.headers = httpOptions.headers.delete('Authorization');
    return this.http.post<Login>(this.appUrl + 'authenticate', data, httpOptions).pipe(
      tap((user: any) => console.log(`user login = ${user.message}`)),
      catchError(this.handleError<Login>('login'))
    );
  }

  @Output() userLoggedInEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  loginWP(data: string): Observable<any> {
    return this.http.post<any>(this.wpUrl, data).pipe(
      tap((user: any) => console.log('user wp login',user.message)),
      catchError(this.handleError<any>('loginWP'))
    );
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
        // localStorage will be available: we can use it.
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = '';
    }
    if (isPlatformServer(this.platformId)) {
        // localStorage will be null.
    }

    //this.userLoggedInEvent.emit(false);
  }

  retrieveLoggedUserInfo(): Observable<User> {
    httpOptions.headers = httpOptions.headers.set('Authorization', 'Bearer ' + (this.getToken()));
    return this.http.get<User>(this.apiUrl + 'memberinfo', httpOptions).pipe(
      tap((member: User) =>  console.log(`fetched member = ${member.message}`)),
      catchError(this.handleError<User>('retrieveLoggedUserInfo'))
    );
  }

  registerNewUser(data: any): Observable<any> {
    httpOptions.headers = httpOptions.headers.delete('Authorization');
    return this.http.post<any>(this.appUrl + 'signup', data, httpOptions).pipe(
      tap((user: any) =>  console.log(`user signup = ${user.message}`)),
      catchError(this.handleError<any>('registerNewUser'))
    );
  }

  signUPStepOne(data: any): Observable<any> {
    httpOptions.headers = httpOptions.headers.delete('Authorization');
    return this.http.post<any>(this.appUrl + 'signupOne', data, httpOptions).pipe(
      tap((user: any) => console.log(`user signup one = ${user}`)),
      catchError(this.handleError<any>('signUPStepOne'))
    );
  }

  verifyEmail(data: any) {
    httpOptions.headers = httpOptions.headers.delete('Authorization');
    return this.http.post<any>(this.appUrl + 'getToken', data, httpOptions).pipe(
      tap((token: any) => console.log(`getToken = ${token}`)),
      catchError(this.handleError<any>('getToken'))
    );
  }

  verifyToken(token): Observable<any> {
    httpOptions.headers = httpOptions.headers.delete('Authorization');
    return this.http.post<any>(this.appUrl + 'verifyToken', { token: token }, httpOptions).pipe(
      tap((token: any) => console.log(`verifyToken = ${token}`)),
      catchError(this.handleError<any>('verifyToken'))
    );
  }

  changePassword(data): Observable<any> {
    httpOptions.headers = httpOptions.headers.delete('Authorization');
    return this.http.post<any>(this.appUrl + 'verifyToken', data, httpOptions).pipe(
      tap((pwd: any) => console.log(`user changePassword = ${pwd}`)),
      catchError(this.handleError<any>('changePassword'))
    );
  }

  updatePasswordFromSettings(data): Observable<any> {
    httpOptions.headers = httpOptions.headers.set('Authorization', 'Bearer ' + (this.getToken()));
    return this.http.post<any>(this.apiUrl + 'changePassword', data, httpOptions).pipe(
      tap((user: any) => console.log(`user changePassword = ${user}`)),
      catchError(this.handleError<any>('updatePasswordFromSettings'))
    );
  }

  // userInfo() {
  //   return this.http.get(environment.api_end_point + 'api/memberinfo', { headers: this.getHeaders() })
  //     .map(response => response.json())
  //     .catch(error => Observable.throw(error.json()));
  // }
  //   //
  //   // registerWP(data: string): Observable<any> {
  //   //   return this.http.post('http://13.56.129.231/dfsauth/register/', data)
  //   //     .map(response => response.json())
  //   //     .catch(error => Observable.throw(error.json()));
  //   // }
  //   //
  uploadProfile(fileList) {
    let file: File = fileList[0];
    let formData: FormData = new FormData();
    formData.append('uploadFile', file, file.name);

    return this.http.post<any>(this.apiUrl + 'uploadImage', formData, {
        headers: new HttpHeaders({
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + this.getToken()
        })
      }).pipe(
      tap((res: any) => console.log(`image upload = ${res}`)),
      catchError(this.handleError<any>('uploadProfile'))
    );
  }

  //   /** products from the server */
  //   retrieveProducts(): Observable<any> {
  //     return this.http.get(this.apiUrl + 'getCustomerProducts')
  //      .pipe(
  //        tap(prod => this.log(`fetched prod`)),
  //        catchError(this.handleError('getProducts', []))
  //      );
  //   }
  //
  //   /** GET products from the server */
  //   // getProducts (): Observable<RootObject> {
  //   //   return this.http.get<RootObject>(this.apiUrl)
  //   //     .pipe(
  //   //       tap(prod => this.log(`fetched products`)),
  //   //       catchError(this.handleError('getproducts', []))
  //   //     );
  //   // }
  //
  //   /** GET products by id. Return `undefined` when id not found */
  //   // getProducts404<Data>(id: number): Observable<RootObject> {
  //   //   const url = `${this.apiUrl}/?id= ${id}`;
  //   //   return this.http.get<RootObject>(url)
  //   //     .pipe(
  //   //       map(products => products[0]), // returns a {0|1} element array
  //   //       tap(h => {
  //   //         const outcome = h ? `fetched` : `did not find`;
  //   //         this.log(`${outcome} products id= ${id}`);
  //   //       }),
  //   //       catchError(this.handleError<RootObject>(`getProducts id= ${id}`))
  //   //     );
  //   // }
  //
  //   /** GET product by id. Will 404 if id not found */
  //   // getProduct(id: number): Observable<RootObject> {
  //   //   const url = `${this.apiUrl}/${id}`;
  //   //   return this.http.get<RootObject>(url).pipe(
  //   //     tap(_ => this.log(`fetched product id= ${id}`)),
  //   //     catchError(this.handleError<RootObject>(`getProduct id= ${id}`))
  //   //   );
  //   // }
  //
  //   /* GET product whose name contains search term */
  //   // searchProducts(term: string): Observable<RootObject[]> {
  //   //   if (!term.trim()) {
  //   //     // if not search term, return empty hero array.
  //   //     return of([]);
  //   //   }
  //   //   return this.http.get<RootObject[]>(`api/heroes/?name= ${term}`).pipe(
  //   //     tap(_ => this.log(`found product matching "${term}"`)),
  //   //     catchError(this.handleError<Hero[]>('searchProduct', []))
  //   //   );
  //   // }
  //
  //
  //   //////// Save methods //////////
  //
  //   /** POST: add a new enquiry to the server */
  //   saveEnquiry (enquiry: string): Observable<any> {
  //     return this.http.post<any>(this.apiUrl + 'saveEnquiry', enquiry, httpOptions).pipe(
  //       tap((enquiry: any) => this.log(`added enquiry  id= ${enquiry.id}`)),
  //       catchError(this.handleError<any>('addEnquiry'))
  //     );
  //   }
  //
  //   /** DELETE: delete the hero from the server */
  //   // deleteHero (hero: Hero | number): Observable<Hero> {
  //   //   const id = typeof hero === 'number' ? hero : hero.id;
  //   //   const url = `${this.heroesUrl}/${id}`;
  //   //
  //   //   return this.http.delete<Hero>(url, httpOptions).pipe(
  //   //     tap(_ => this.log(`deleted hero id= ${id}`)),
  //   //     catchError(this.handleError<Hero>('deleteHero'))
  //   //   );
  //   // }
  //
  //   /** PUT: update the hero on the server */
  //   // updateHero (hero: Hero): Observable<any> {
  //   //   return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
  //   //     tap(_ => this.log(`updated hero id= ${hero.id}`)),
  //   //     catchError(this.handleError<any>('updateHero'))
  //   //   );
  //   // }

  private handleError<T>(operation = 'operation', RootObject?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      if (error.error instanceof ErrorEvent) {
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
