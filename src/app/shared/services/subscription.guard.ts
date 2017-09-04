/**
 * Created by Hiren on 30-08-2017.
 */
import {Injectable} from "@angular/core";
import {CanActivate, Route, Router, ActivatedRouteSnapshot, ActivatedRoute, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "./auth.service";

@Injectable()
export class SubscriptionGuard implements CanActivate {

  constructor(private authService:AuthService, private router:Router, private activatedRoute:ActivatedRoute) {
  }

  canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot) {
    if (this.authService.isSubscriber()) {
      return true;
    }
    console.log("Show alert popup");
    this.authService.showSubscriptionAlert();
    return false;
  }
}
