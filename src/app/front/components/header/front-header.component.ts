import {Component} from "@angular/core";
import {AuthService} from "../../../shared/services/auth.service";
import {LoggedUser} from "../../../shared/models/logged-user.model";
/**
 * Created by Hiren on 05-06-2017.
 */

@Component({
  selector: 'rp-front-header',
  templateUrl: './front-header.component.html',
  styleUrls: ['./front-header.component.css']
})
export class FrontHeaderComponent {

  isLoggedIn:boolean;
  role:string;

  constructor(private authService:AuthService) {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.role = this.authService.getUserRole();
    this.authService.isLoggedInEvent.subscribe(
      data => {
        this.isLoggedIn = data;
        this.role = this.authService.getUserRole();
      }
    );
  }

  btnLogoutClicked() {
    this.authService.logout();
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.authService.retrieveLoggedUserInfo()
        .subscribe(
          response => {
            if (response.statusCode == 200) {
              this.authService.loggedUser = response.data;
            }
            else {

            }
          },
          error => {
            console.log("http error => ", error);
          }
        )
    }
  }

}
