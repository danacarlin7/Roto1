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
    DataTableModule,
    ModalModule.forRoot(),
    DropzoneModule.forChild(),
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    SharedMaterialComponents,
    DataTableModule,
    ModalModule,
    DropzoneModule,
    TabViewComponent
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
