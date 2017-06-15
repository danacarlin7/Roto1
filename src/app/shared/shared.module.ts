import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AuthService} from "./services/auth.service";
import {CommonModule} from "@angular/common";
import {SharedMaterialComponents} from "./material-components";
import {AuthGuard} from "./services/auth.guard";
/**
 * Created by Hiren on 04-06-2017.
 */

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    SharedMaterialComponents
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    SharedMaterialComponents
  ]
})
export class SharedModule {
  static forRoot() {
    return {
      ngModule: SharedModule,
      providers: [AuthService, AuthGuard]
    }
  }
}
