import {Injectable} from "@angular/core";
import {CanActivate, Route, Router, ActivatedRouteSnapshot, ActivatedRoute} from "@angular/router";
import {AuthService} from "./auth.service";
/**
 * Created by Hiren on 15-06-2017.
 */

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService:AuthService, private router:Router, private activatedRoute:ActivatedRoute) {
  }

  canActivate() {
    if (this.authService.isLoggedIn()) {
      return true;
    }
    // console.log('activatedRoute Router => ', this.activatedRoute);
    // console.log('activatedRoute Router => ', this.activatedRoute.snapshot.url);
    // this.router.navigate(['/login'], {queryParams: {redirect: location.pathname}});
    this.router.navigate(['/login']);
    return false;
  }
}
