import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {UserMainComponent} from "./user-main.component";
import {UserRoutingModule} from "./user-routing.module";
/**
 * Created by Hiren on 04-06-2017.
 */

@NgModule({
  imports: [
    UserRoutingModule,
    SharedModule
  ],
  declarations: [
    UserMainComponent
  ],
  exports: [
    UserMainComponent
  ]
})
export class UserModule {

}
