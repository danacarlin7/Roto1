import {Component} from "@angular/core";
import {AuthService} from "../../../shared/services/auth.service";
import {LoggedUser} from "../../../shared/models/logged-user.model";
/**
 * Created by Hiren on 11-06-2017.
 */


@Component({
  selector: 'rp-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent {
  loggedUser: LoggedUser;

  constructor(private authService: AuthService) {
    this.loggedUser = this.authService.loggedUser;
    this.authService.loggedUserChangeEvent.subscribe(
      user => this.loggedUser = user
    )
  }

  logoutUser() {
    this.authService.logout();
  }

}
