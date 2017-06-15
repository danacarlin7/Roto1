import {Injectable} from "@angular/core";
import {CanActivate, Route, Router} from "@angular/router";
import {AuthService} from "./auth.service";
/**
 * Created by Hiren on 15-06-2017.
 */

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService:AuthService, private router:Router) {
  }

  canActivate() {
    if (this.authService.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
