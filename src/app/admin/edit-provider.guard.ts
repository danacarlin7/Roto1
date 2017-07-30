import {Injectable} from "@angular/core";
import {CanActivate, Route, Router, ActivatedRouteSnapshot, ActivatedRoute} from "@angular/router";
import {AdminDashboardService} from "./services/admin-dashboard.service";
/**
 * Created by Hiren on 15-06-2017.
 */

@Injectable()
export class EditProviderGuard implements CanActivate {

  constructor(private providerService:AdminDashboardService, private router:Router, private activatedRoute:ActivatedRoute) {
  }

  canActivate() {
    if (this.providerService.selectedProvider) {
      return true;
    }
    this.router.navigate(['/admin/providers']);
    return false;
  }
}
