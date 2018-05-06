import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
}


// 
// import { Injectable, Inject, Optional } from '@angular/core';
// import { APP_BASE_HREF } from '@angular/common';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
//
// import { Observable, of } from 'rxjs';
// import { catchError, map, tap } from 'rxjs/operators';
//
// import { MessageService } from './message.service';
// import { environment } from "../../../environments/environment";
//
// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
// };
//
// @Injectable({
//   providedIn: 'root'
// })
// export class ApiService {
//   private apiUrl = environment.api;
//
//   constructor(
//     private http: HttpClient,
//     private messageService: MessageService,
//     @Optional() @Inject(APP_BASE_HREF) origin: string) {
//     this.apiUrl = environment.api;
//   }
//
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
//   //   const url = `${this.apiUrl}/?id=${id}`;
//   //   return this.http.get<RootObject>(url)
//   //     .pipe(
//   //       map(products => products[0]), // returns a {0|1} element array
//   //       tap(h => {
//   //         const outcome = h ? `fetched` : `did not find`;
//   //         this.log(`${outcome} products id=${id}`);
//   //       }),
//   //       catchError(this.handleError<RootObject>(`getProducts id=${id}`))
//   //     );
//   // }
//
//   /** GET product by id. Will 404 if id not found */
//   // getProduct(id: number): Observable<RootObject> {
//   //   const url = `${this.apiUrl}/${id}`;
//   //   return this.http.get<RootObject>(url).pipe(
//   //     tap(_ => this.log(`fetched product id=${id}`)),
//   //     catchError(this.handleError<RootObject>(`getProduct id=${id}`))
//   //   );
//   // }
//
//   /* GET product whose name contains search term */
//   // searchProducts(term: string): Observable<RootObject[]> {
//   //   if (!term.trim()) {
//   //     // if not search term, return empty hero array.
//   //     return of([]);
//   //   }
//   //   return this.http.get<RootObject[]>(`api/heroes/?name=${term}`).pipe(
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
//       tap((enquiry: any) => this.log(`added enquiry  id=${enquiry.id}`)),
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
//   //     tap(_ => this.log(`deleted hero id=${id}`)),
//   //     catchError(this.handleError<Hero>('deleteHero'))
//   //   );
//   // }
//
//   /** PUT: update the hero on the server */
//   // updateHero (hero: Hero): Observable<any> {
//   //   return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
//   //     tap(_ => this.log(`updated hero id=${hero.id}`)),
//   //     catchError(this.handleError<any>('updateHero'))
//   //   );
//   // }
//
//   /**
//    * Handle Http operation that failed.
//    * Let the app continue.
//    * @param operation - name of the operation that failed
//    * @param RootObject - optional value to return as the observable RootObject
//    */
//   private handleError<T>(operation = 'operation', RootObject?: T) {
//     return (error: any): Observable<T> => {
//
//       // TODO: send the error to remote logging infrastructure
//       console.error(error); // log to console instead
//
//       // TODO: better job of transforming error for user consumption
//       this.log(`${operation} failed: ${error.message}`);
//
//       // Let the app keep running by returning an empty RootObject.
//       return of(RootObject as T);
//     };
//   }
//
//   /** Log a HeroService message with the MessageService */
//   private log(message: string) {
//     this.messageService.add('api service: ' + message);
//   }
// }
