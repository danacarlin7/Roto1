import { Injectable } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from "../../../environments/environment";

import { CategoryData } from "../models/category-data";
import { PostData } from "../models/post-data";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private apiUrl;
  private appUrl;
  private wpUrl;
  private wpUrlCustom;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.api_end_point + 'api/';
    this.appUrl = environment.api_end_point;
    this.wpUrl = "https://wordpress.rotopros.com/wp-json/wp/v2/";
    this.wpUrlCustom = "https://wordpress.rotopros.com/dfspostmeta/get/";
  }


  fetchCategories(): Observable<CategoryData[]> {
    return this.http.get<CategoryData[]>(this.wpUrl + 'categories?hide_empty=true').pipe(
      tap((category: CategoryData[]) =>  console.log(`fetched category = ${typeof category === "object" && category !== null}`)),
      catchError(this.handleError<CategoryData[]>('fetchCategories'))
    );
  }


  fetchPosts(args: Object): Observable<PostData[]> {
    var query = [];
    for(var key in args)
    query.push(`${key}=${args[key]}`);
    var queryStr = query.join('&');

    return this.http.get<PostData[]>(this.wpUrl + 'posts?' + queryStr).pipe(
      tap((post: PostData[]) =>  console.log(`fetched post = ${ typeof post === "object" && post !== null}`)),
      catchError(this.handleError<PostData[]>('fetchPosts'))
    );
  }

  fetchPost(id: number): Observable < any > {
    return this.http.get<any>(this.wpUrl + 'posts/' + id).pipe(
      tap((post: any) =>  console.log(`posts = ${typeof post === "object" && post !== null}`)),
      catchError(this.handleError<any>('fetchPost'))
    );
  }

  fetchCategory(id: number): Observable <any> {
    return this.http.get<any>(this.wpUrl + 'categories/' + id).pipe(
      tap((category: any) =>  console.log(`fetch Category = ${typeof category === "object" && category !== null}`)),
      catchError(this.handleError<any>('fetchCategory'))
    );
  }

  fetchFreeCategory(): Observable <any> {
    return this.http.get<any>(this.wpUrl + 'categories?slug=free-article').pipe(
      tap((category: any) =>  console.log(`fetch free Category = ${typeof category === "object" && category !== null}`)),
      catchError(this.handleError<any>('fetchFreeCategory'))
    );
  }

  fetchMedia(args: Object): Observable<Array<any>> {
    var query = [];
    for(var key in args)
    query.push(`${key}=${args[key]}`);
    var queryStr = query.join('&');

    return this.http.get<any>(this.wpUrl + 'media?' + queryStr).pipe(
      tap((media: any) =>  console.log(`fetch Media = ${typeof media === "object" && media !== null}`)),
      catchError(this.handleError<any>('fetchMedia'))
    );
  }

  fetchRelated(): Observable <any> {
    return this.http.get<any>(this.wpUrlCustom).pipe(
      tap((related: any) =>  console.log(`fetch related = ${typeof related === "object" && related !== null}`)),
      catchError(this.handleError<any>('fetchRelated'))
    );
  }

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
