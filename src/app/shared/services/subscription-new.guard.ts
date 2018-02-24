/**
 * Created by Hiren on 30-08-2017.
 */
import {Injectable} from "@angular/core";
import {
  CanActivate, Route, Router, ActivatedRouteSnapshot, ActivatedRoute, RouterStateSnapshot,
  CanActivateChild
} from "@angular/router";
import {AuthService} from "./auth.service";

@Injectable()
export class SubscriptionNewGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
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
      this.router.navigate(['/login'], {queryParams: {redirect: state.url}});
      return false;
    }

  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivate(route, state);
  }

}