import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {AdminMainComponent} from "./admin-main.component";
import {AdminRoutingModule} from "./admin-routing.module";
/**
 * Created by Hiren on 04-06-2017.
 */

@NgModule({
  imports: [
    AdminRoutingModule,
    SharedModule
  ],
  declarations: [
    AdminMainComponent
  ],
  exports: [
    AdminMainComponent
  ]
})
export class AdminModule {

}
