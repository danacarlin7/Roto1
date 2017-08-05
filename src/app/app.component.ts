import {Component} from '@angular/core';
import {CustomAuthService} from "./shared/services/auth.service";
import {Router} from "@angular/router";
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private authService:CustomAuthService, private router:Router) {
  }
}
