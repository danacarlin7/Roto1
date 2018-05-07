import {Component} from "@angular/core";
import {AuthService} from "../shared/new-services/auth.service";
import {Router, NavigationEnd} from "@angular/router";



/**
 * Created by Hiren on 04-06-2017.
 */

@Component({
  selector: 'rp-user-main',
  templateUrl: './user-main.component.html',
  styleUrls: ['./user-main.component.css']
})
export class UserMainComponent {

  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit() {
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
