/* core */
import { Component } from "@angular/core";
import { Router } from "@angular/router";

/* variables */
declare var jQuery: any;

/* services */
import { AuthService } from "../shared/new-services/auth.service";

/* models */
import { User } from "../shared/models/user";


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
      }, error => {
        console.log("http error => ", error);
      })
  }
}
