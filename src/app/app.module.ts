/* core */
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

/* modules */
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from "./shared/shared.module";
import { FrontModule } from "./front/front.module";
import { UserModule } from "./user/user.module";
import { AdminModule } from "./new-admin/admin.module";

/* env */
import { environment } from "../environments/environment";

/* component */
import { RPErrorHandler } from "./error-handler";
import { AppComponent } from './app.component';

/* services */
import { AuthService } from "./shared/new-services/auth.service";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'roto-pros-web' }),
    BrowserAnimationsModule,
    FrontModule,
    UserModule,
    AdminModule,
    HttpClientModule,
    SharedModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [{ provide: ErrorHandler, useClass: RPErrorHandler }],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private authService: AuthService) {
    if (this.authService.isLoggedIn()) {
      environment.token = localStorage.getItem('token') ? localStorage.getItem('token') : '';
      environment.role = localStorage.getItem('role') ? localStorage.getItem('role') : '';
    }
  }
}
