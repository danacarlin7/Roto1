import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
// import { HttpModule } from "@angular/http";
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
// import { AuthService } from "./services/auth.service";
import { CommonModule } from "@angular/common";
import { SharedMaterialComponents } from "./material-components";
import { AuthGuard } from "./new-services/auth.guard";
// import { DataTableModule } from "angular2-datatable";
import { DropzoneModule } from "ngx-dropzone-wrapper/dist/index";
// import { ModalModule } from "angular2-modal/esm/index";
import { ModalModule } from 'ngx-modialog';
import { BootstrapModalModule } from 'ngx-modialog/plugins/bootstrap';
import { TabViewComponent } from "./components/tab-view/tab-view.component";
import { NgxPaginationModule } from "ngx-pagination";
import { SharedPrimeNGComponents } from "./prime-ng-components";
import { SubscriptionGuard } from "./new-services/subscription.guard";
import { SubscriptionNewGuard } from "./new-services/subscription-new.guard";
import { MobileHiddenDirective } from "./components/mobile-hidden/mobile-hidden.directive";
/**
 * Created by Hiren on 04-06-2017.
 */

@NgModule({
  declarations: [
    TabViewComponent,
    MobileHiddenDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedMaterialComponents,
    SharedPrimeNGComponents,
    // DataTableModule,
    ModalModule.forRoot(),
    BootstrapModalModule,
    DropzoneModule,
    NgxPaginationModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedMaterialComponents,
    SharedPrimeNGComponents,
    // DataTableModule,
    ModalModule,
    DropzoneModule,
    TabViewComponent,
    NgxPaginationModule,
    MobileHiddenDirective
  ]
})
export class SharedModule {
  static forRoot() {
    return {
      ngModule: SharedModule,
      providers: [
        // AuthService,
        AuthGuard,
        SubscriptionGuard,
        SubscriptionNewGuard
      ]
    };
  }
}
