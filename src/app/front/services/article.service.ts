import {Injectable, EventEmitter, Output} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import {Observable} from "rxjs";
import "rxjs/Rx";
import {Router} from "@angular/router";

@Injectable()
export class ArticleService {

  provider = "https://wordpress.rotopros.com/wp-json/wp/v2/";
  customProvider = "https://wordpress.rotopros.com/dfspostmeta/get/";

  constructor(private http: Http, private router: Router) {
  }

  getHeaders(): Headers {
    const headers = new Headers();
    headers.append("content-type", "application/json");

    return headers;
  }
  /*fetchSport(): Observable<Array<any>>{
    const endpoint = this.provider + "categories?hide_empty=true";
    return this.http.get("https://wordpress.rotopros.com/wp-json/wp/v2/posts?tags=37")
      .map(response => response.json());
      .catch(error => Observable.throw(error.json()));
  }*/
  fetchCategories(): Observable<Array<any>> {
    const endpoint = this.provider + "categories?hide_empty=true";
  	return this.http.get(endpoint)
      .map(response => response.json())
      .catch(error => Observable.throw(error.json()));
  }

  fetchPosts(args: Object): Observable<Array<any>> {
    const query = [] ;
    for (const key in args)
      query.push(`${key}=${args[key]}`);
    const queryStr = query.join("&");
    const endpoint = this.provider + "posts?" + queryStr;
    return this.http.get(endpoint)
      .map(response => response.json())
      .catch(error => Observable.throw(error.json()));
  }

  fetchPost(id: number): Observable<any> {
    const endpoint = this.provider + "posts?tags=" + id;
    return this.http.get(endpoint)
      .map(response => response.json())
      .catch(error => Observable.throw(error.json()));
  }

  fetchMedia(args: Object): Observable<Array<any>> {
    const query = [] ;
    for (const key in args)
      query.push(`${key}=${args[key]}`);
    const queryStr = query.join("&");
    const endpoint = this.provider + "media?" + queryStr;
    return this.http.get(endpoint)
      .map(response => response.json())
      .catch(error => Observable.throw(error.json()));
  }

  fetchRelated(): Observable<any> {
    const endpoint = this.customProvider;
    return this.http.get(endpoint)
      .map(response => response.json())
      .catch(error => Observable.throw(error.json()));
  }
}
