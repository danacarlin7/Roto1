/**
 * Created by Hiren on 30-08-2017.
 */
import {Injectable} from "@angular/core";
import {
  CanActivate, Route, Router, ActivatedRouteSnapshot, ActivatedRoute, RouterStateSnapshot,
  CanActivateChild
} from "@angular/router";
import {AuthService} from "./auth.service";
import { ArticleService } from "../../front/services/article.service";

@Injectable()
export class SubscriptionNewGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute, private articleService: ArticleService) {
  }

  checkArticle(id, callback){
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

              if(value === responses[0].id){
                isFree = true;
              }

              if(response.categories.length == cat_cnt)
                callback(isFree);
            }

          }
        );

      }
    );
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // console.log(route.params.id);
    let that = this;
    console.log('local'+ localStorage.getItem('free'));
    if(localStorage.getItem('free') == "1"){
      return true;
    } else if (this.authService.isLoggedIn()) {
      if (this.authService.isSubscriber(true)) {
        return true;
      } else {
        this.router.navigate(['/subscribe'], {queryParams: {redirect: state.url}});
        return false;
      }
    } else {
      console.log("else here", route.params.id);
      this.checkArticle(route.params.id, function(resp){
        console.log("check article", resp);
        if(resp){
          localStorage.setItem('free', "1");
          that.router.navigate(['/articles/'+route.params.id]);
          return true;
        } else {
          localStorage.setItem('free', "0");
          that.router.navigate(['/login'], {queryParams: {redirect: state.url}});
          return false;
        }
      });
      // this.articleService.fetchPost(route.params.id).subscribe(
      //   response => {
      //     // this.article = response;
      //     console.log(response.categories[0]);
      //
      //     this.articleService.fetchCategory(response.categories[0]).subscribe(
      //       responses => {
      //         if (responses.slug == "free-article") {
      //           localStorage.setItem('free', "1");
      //           console.log("responses.slug",responses.slug);
      //           return true;
      //         } else {
      //           localStorage.setItem('free', "0");
      //           this.router.navigate(['/login'], {queryParams: {redirect: state.url}});
      //           return false;
      //         }
      //       }
      //     );
      //   }
      // );

      // return true;

    }

  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivate(route, state);
  }

}
