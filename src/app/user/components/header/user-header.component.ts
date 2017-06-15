import {Component} from "@angular/core";
import {AuthService} from "../../../shared/services/auth.service";
/**
 * Created by Hiren on 11-06-2017.
 */


@Component({
  selector: 'rp-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent {

  constructor(private authService:AuthService) {

  }

  logoutUser() {
    this.authService.logout();
  }

}
