import { Component } from "@angular/core";
import { AuthService } from "../shared/new-services/auth.service";
import { Router, NavigationEnd } from "@angular/router";
import { User } from "../shared/models/user";


/**
 * Created by Hiren on 04-06-2017.
 */

@Component({
  selector: 'rp-user-main',
  templateUrl: './user-main.component.html',
  styleUrls: ['./user-main.component.css']
})
export class UserMainComponent {
  userResp: User;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.retrieveLoggedUserInfo()
      .subscribe(
      response => {
        this.userResp = response;
        console.log(this.userResp);
        // if (response.statusCode == 200) {
        //   this.authService.loggedUser = response.data;
        // }
      }, error => {
        console.log("http error => ", error);
      }
      )
  }

}
