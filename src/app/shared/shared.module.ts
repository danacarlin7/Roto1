/* core */
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommonModule } from "@angular/common";

/* components */
import { SharedMaterialComponents } from "./material-components";
import { SharedPrimeNGComponents } from "./prime-ng-components";
import { TabViewComponent } from "./components/tab-view/tab-view.component";
import { MobileHiddenDirective } from "./components/mobile-hidden/mobile-hidden.directive";


/* services */
import { AuthGuard } from "./new-services/auth.guard";
import { SubscriptionNewGuard } from "./new-services/subscription-new.guard";
import { SubscriptionGuard } from "./new-services/subscription.guard";


/* libs */
// import { DropzoneModule } from "ngx-dropzone-wrapper/dist/index";
import { ModalModule } from 'ngx-modialog';
import { BootstrapModalModule } from 'ngx-modialog/plugins/bootstrap';
import { NgxPaginationModule } from "ngx-pagination";

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
    ModalModule.forRoot(),
    BootstrapModalModule,
    // DropzoneModule,
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
    // DropzoneModule,
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
