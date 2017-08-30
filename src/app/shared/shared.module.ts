import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AuthService} from "./services/auth.service";
import {CommonModule} from "@angular/common";
import {SharedMaterialComponents} from "./material-components";
import {AuthGuard} from "./services/auth.guard";
import {DataTableModule} from "angular2-datatable";
import {DropzoneModule} from "ngx-dropzone-wrapper/dist/index";
import {ModalModule} from "angular2-modal/esm/index";
import {TabViewComponent} from "./components/tab-view/tab-view.component";
import {NgxPaginationModule} from "ngx-pagination";
import {SharedPrimeNGComponents} from "./prime-ng-components";
import {SubscriptionGuard} from "./services/subscription.guard";
/**
 * Created by Hiren on 04-06-2017.
 */

@NgModule({
  declarations: [
    TabViewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    SharedMaterialComponents,
    SharedPrimeNGComponents,
    DataTableModule,
    ModalModule.forRoot(),
    DropzoneModule.forChild(),
    NgxPaginationModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    SharedMaterialComponents,
    SharedPrimeNGComponents,
    DataTableModule,
    ModalModule,
    DropzoneModule,
    TabViewComponent,
    NgxPaginationModule
  ]
})
export class SharedModule {
  static forRoot() {
    return {
      ngModule: SharedModule,
      providers: [AuthService, AuthGuard,SubscriptionGuard]
    };
  }
}
