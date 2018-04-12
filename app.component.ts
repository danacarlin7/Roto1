import {Component, ViewChild, ElementRef} from "@angular/core";
import {AuthService} from "./shared/services/auth.service";
import {Router} from "@angular/router";
import {environment} from "../environments/environment";
declare var jQuery: any;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],

})
export class AppComponent {

  @ViewChild("subscriptionAlert") subscriptionAlert: ElementRef;

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

  scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      document.getElementById("myBtn").style.display = "block";
    } else {
      document.getElementById("myBtn").style.display = "none";
    }

  }

// When the user clicks on the button, scroll to the top of the document
  topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
}

