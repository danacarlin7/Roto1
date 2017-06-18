import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SharedModule} from "./shared/shared.module";
import {FrontModule} from "./front/front.module";
import {UserModule} from "./user/user.module";
import {AdminModule} from "./admin/admin.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AuthService} from "./shared/services/auth.service";
import {environment} from "../environments/environment";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FrontModule,
    UserModule,
    AdminModule,
    SharedModule.forRoot(),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private authService:AuthService) {
    if (this.authService.isLoggedIn()) {
      environment.token = localStorage.getItem('token') ? localStorage.getItem('token') : sessionStorage.getItem('token');
      environment.role = localStorage.getItem('role') ? localStorage.getItem('role') : sessionStorage.getItem('role');
    }
  }
}
