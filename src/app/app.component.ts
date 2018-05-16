/* core */
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from "@angular/router";

/* env */
import { environment } from "../environments/environment";

/* services */
import { AuthService } from "./shared/new-services/auth.service";

/* variables */
declare var jQuery: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('subscriptionAlert') subscriptionAlert: ElementRef;

  isLoggedIn: boolean;

  constructor(private authService: AuthService, private router: Router) {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.authService.subscriptionAlertEvent.subscribe(
      data => {
        console.log("alert!");
        jQuery(this.subscriptionAlert.nativeElement).modal();
      }
    );
    this.authService.isLoggedInEvent.subscribe(
      data => {
        this.isLoggedIn = data;
      }
    );
  }
}
